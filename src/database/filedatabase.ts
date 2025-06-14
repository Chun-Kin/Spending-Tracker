import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import { Platform, Alert } from 'react-native';

// Database configurations
const database_name = "SpendingTracker.db";
const database_version = "1.0";
const database_displayname = "SQLite Spending Tracker";
const database_size = 200000;

// Open the database
const openDatabase = () => {
  return SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size,
    () => { console.log("Database opened"); },
    (err: any) => { console.log("SQL Error: " + err); }
  );
};

// Get the database path
const getDatabasePath = async () => {
  const db = openDatabase();
  return new Promise<string>((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('PRAGMA database_list;', [], (tx, results) => {
        if (results.rows.length > 0) {
          const dbPath = results.rows.item(0).file; // Adjust according to your SQLite version and implementation
          resolve(dbPath);
        } else {
          reject('Database path not found');
        }
      }, (error: any) => {
        reject('Error getting database path: ' + error.message);
      });
    });
  });
};

// Fetch and display data from the database
const displayDatabaseData = () => {
  const db = openDatabase();
  return new Promise<void>((resolve, reject) => {
    db.transaction((tx) => {
      // Query users
      tx.executeSql('SELECT * FROM Users;', [], (tx, results) => {
        console.log("Users Table Data:");
        for (let i = 0; i < results.rows.length; i++) {
          console.log(results.rows.item(i));
        }
      }, (error: any) => {
        console.log("Error fetching Users data: " + error.message);
      });

      // Query expenses
      tx.executeSql('SELECT * FROM Expenses;', [], (tx, results) => {
        console.log("Expenses Table Data:");
        for (let i = 0; i < results.rows.length; i++) {
          console.log(results.rows.item(i));
        }
      }, (error: any) => {
        console.log("Error fetching Expenses data: " + error.message);
      });

      resolve();
    });
  });
};

// Backup the database file
export const backupDatabase = async () => {
  try {
    // Display database data
    await displayDatabaseData();

    // Get the database path
    const dbPath = await getDatabasePath();
    const backupPath = Platform.OS === 'android'
      ? `${RNFS.ExternalDirectoryPath}/backup/SpendingTracker.db`
      : `${RNFS.DocumentDirectoryPath}/backup/SpendingTracker.db`;

    // Ensure backup directory exists
    await RNFS.mkdir(`${Platform.OS === 'android' ? RNFS.ExternalDirectoryPath : RNFS.DocumentDirectoryPath}/backup`);

    // Copy the database file to the backup location
    await RNFS.copyFile(dbPath, backupPath);

    Alert.alert('Success', `Database backup completed successfully.\nBackup Path: ${backupPath}`);
    console.log('Database backed up to:', backupPath);
  } catch (error) {
    console.error('Error backing up the database: ', error);
    Alert.alert('Error', 'Failed to back up the database.');
  }
};

// Restore the database file from backup
export const restoreDatabase = async () => {
  try {
    const backupPath = Platform.OS === 'android'
      ? `${RNFS.ExternalDirectoryPath}/backup/SpendingTracker.db`
      : `${RNFS.DocumentDirectoryPath}/backup/SpendingTracker.db`;
    const dbPath = await getDatabasePath();

    // Check if the backup file exists
    const backupExists = await RNFS.exists(backupPath);
    if (!backupExists) {
      throw new Error('Backup file does not exist.');
    }

    // Copy the backup file to the current database location
    await RNFS.copyFile(backupPath, dbPath);

    Alert.alert('Success', 'Database restored successfully.');
    console.log('Database restored from backup to:', dbPath);
  } catch (error) {
    console.error('Error restoring the database: ', error);
    Alert.alert('Error', 'Failed to restore the database.');
  }
};
