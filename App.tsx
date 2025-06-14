import React from 'react';
import { AuthProvider } from './src/context/AuthContext'; // Adjust the import path
import { ExpenseProvider } from './src/context/ExpenseContext'; // Adjust the import path
import { ProfilePicProvider } from './src/context/ProfilePicContext';
import StackNavigator from './src/navigation/StackNavigator';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ProfilePicProvider>
        <ExpenseProvider>
          <StackNavigator />
        </ExpenseProvider>
      </ProfilePicProvider>
    </AuthProvider>
  );
};

export default App;
