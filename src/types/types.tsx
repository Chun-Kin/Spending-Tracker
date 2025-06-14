export type Expense = {
  id: string;
  description: string;
  amount: number;
  type: 'earn' | 'used';
};

export type RootStackParamList = {
  Login: undefined;
  Drawer: undefined;
  Register: undefined;
  ViewFeedbackScreen: undefined;
  ProfilePictureSelection: { 
    selectedPic?: any; 
    onSelect?: (pic: any) => void;
  };
  Profile: undefined;
  AddExpense: undefined;
  ExpenseHistory: undefined;
  AdminHomeScreen: undefined;
  CheckDatabaseScreen: undefined;
};


export type RootDrawerParamList = {
  HomeDrawer: undefined;
  AddExpense: undefined;
  Profile: undefined;
  ExpenseHistory: undefined;
};
