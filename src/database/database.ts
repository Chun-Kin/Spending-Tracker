import SQLite from 'react-native-sqlite-storage';

const database_name = "SpendingTracker.db";
const database_version = "1.0";
const database_displayname = "SQLite Spending Tracker";
const database_size = 200000;

const db = SQLite.openDatabase(
  database_name,
  database_version,
  database_displayname,
  database_size,
  () => { console.log("Database opened"); },
  (err: any) => { console.log("SQL Error: " + err); },
);



// Create an admin user
export const createAdminUser = () => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT OR IGNORE INTO Users (username, email, password) VALUES (?, ?, ?)",
      ['admin', 'admin@example.com', 'admin'],
      (tx, results) => {
        console.log("Admin user created successfully");
      },
      (error: any) => {
        console.log("Error creating admin user: " + error.message);
      }
    );
  });
};

// Register a new user
export const registerUser = (username: string, email: string, password: string, callback: (success: boolean) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Users (username, email, password, profilePic) VALUES (?, ?, ?, ?)",
      [username, email, password, '../../assets/images/default_profile.png'], // Default profile picture path
      (tx, results) => {
        console.log("User registered successfully");
        callback(true);
      },
      (error: any) => {
        console.log("Error registering user: " + error.message);
        callback(false);
      }
    );
  });
};

// Login a user
export const loginUser = (username: string, password: string, callback: (success: boolean, username?: string) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT username FROM Users WHERE username = ? AND password = ?",
      [username, password],
      (tx, results) => {
        if (results.rows.length > 0) {
          console.log("User logged in successfully");
          callback(true, username); // Return username
        } else {
          console.log("Login failed");
          callback(false);
        }
      },
      (error: any) => {
        console.log("Error logging in user: " + error.message);
        callback(false);
      }
    );
  });
};

// Fetch all users
export const fetchUsers = (callback: (users: any[]) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT * FROM Users",
      [],
      (tx, results) => {
        const users = [];
        for (let i = 0; i < results.rows.length; i++) {
          users.push(results.rows.item(i));
        }
        callback(users);
      },
      (error: any) => {
        console.log("Error fetching users: " + error.message);
        callback([]);
      }
    );
  });
};

// Add an expense
export const addExpense = (username: string, description: string, amount: number, type: 'earn' | 'used', callback: (success: boolean) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO Expenses (username, description, amount, type) VALUES (?, ?, ?, ?)",
      [username, description, amount, type],
      () => {
        console.log("Expense added successfully");
        callback(true);
      },
      (error: any) => {
        console.log("Error adding expense: " + error.message);
        callback(false);
      }
    );
  });
};

// Fetch all expenses
export const fetchExpenses = (username: string | null, callback: (expenses: any[]) => void) => {
  db.transaction((tx) => {
    let query = "SELECT * FROM Expenses";
    let params: any[] = [];

    if (username !== null) {
      query += " WHERE username = ?";
      params.push(username);
    }

    tx.executeSql(
      query,
      params,
      (tx, results) => {
        const expenses = [];
        for (let i = 0; i < results.rows.length; i++) {
          expenses.push(results.rows.item(i));
        }
        callback(expenses);
      },
      (error: any) => {
        console.log("Error fetching expenses: " + error.message);
        callback([]);
      }
    );
  });
};

// Delete an expense
export const deleteExpense = (id: string, callback: (success: boolean) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      "DELETE FROM Expenses WHERE id = ?",
      [id],
      () => {
        console.log("Expense deleted successfully");
        callback(true);
      },
      (error: any) => {
        console.log("Error deleting expense: " + error.message);
        callback(false);
      }
    );
  });
};

// Save profile picture
export const saveProfilePic = (username: string, profilePic: any, callback: (success: boolean) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      "UPDATE Users SET profilePic = ? WHERE username = ?",
      [profilePic.uri, username],  // Assume profilePic.uri is the URL or path to the image
      () => {
        console.log("Profile picture saved successfully");
        callback(true);
      },
      (error: any) => {
        console.log("Error saving profile picture: " + error.message);
        callback(false);
      }
    );
  });
};

// Fetch profile picture
export const fetchProfilePic = (username: string, callback: (profilePic: any) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT profilePic FROM Users WHERE username = ?",
      [username],
      (tx, results) => {
        if (results.rows.length > 0) {
          const profilePic = results.rows.item(0).profilePic;
          callback(profilePic ? { uri: profilePic } : null);
        } else {
          callback(null); // No profile picture found, return default or null
        }
      },
      (error: any) => {
        console.log("Error fetching profile picture: " + error.message);
        callback(null);
      }
    );
  });
};

// Fetch total earnings
export const fetchTotalEarnings = (username: string, callback: (totalEarnings: number) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT SUM(amount) as totalEarnings FROM Expenses WHERE username = ? AND type = 'earn'",
      [username],
      (tx, results) => {
        const totalEarnings = results.rows.item(0).totalEarnings || 0;
        callback(totalEarnings);
      },
      (error: any) => {
        console.log("Error fetching total earnings: " + error.message);
        callback(0);
      }
    );
  });
};

// Fetch total expenses
export const fetchTotalExpenses = (username: string, callback: (totalExpenses: number) => void) => {
  db.transaction((tx) => {
    tx.executeSql(
      "SELECT SUM(amount) as totalExpenses FROM Expenses WHERE username = ? AND type = 'used'",
      [username],
      (tx, results) => {
        const totalExpenses = results.rows.item(0).totalExpenses || 0;
        callback(totalExpenses);
      },
      (error: any) => {
        console.log("Error fetching total expenses: " + error.message);
        callback(0);
      }
    );
  });
};
