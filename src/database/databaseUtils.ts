// src/database/databaseUtils.ts

import RNFS from 'react-native-fs';
import SQLite from 'react-native-sqlite-storage';

const database_name = 'SpendingTracker.db';
const database_path = `${RNFS.DocumentDirectoryPath}/${database_name}`;

// Function to delete the database file
export const deleteDatabase = async () => {
  try {
    await RNFS.unlink(database_path);
    console.log('Database deleted');
  } catch (error) {
    console.log('Error deleting database: ', error);
  }
};

// Function to reset the database by dropping and recreating tables
export const resetDatabase = () => {
  const db = SQLite.openDatabase(
    database_name,
    '1.0',
    'SQLite Spending Tracker',
    200000
  );

  db.transaction((tx) => {
    tx.executeSql(
      'DROP TABLE IF EXISTS Users',
      [],
      () => {
        console.log('Users table dropped');
      },
      (error: any) => {
        console.log('Error dropping table: ', error.message);
      }
    );

    tx.executeSql(
      'DROP TABLE IF EXISTS Expenses',
      [],
      () => {
        console.log('Expenses table dropped');
      },
      (error: any) => {
        console.log('Error dropping table: ', error.message);
      }
    );
  });
};
