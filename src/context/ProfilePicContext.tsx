// context/ProfilePicContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type ProfilePicContextType = {
  selectedPic: any;
  setSelectedPic: (pic: any) => void;
};

const ProfilePicContext = createContext<ProfilePicContextType | undefined>(undefined);

export const ProfilePicProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [selectedPic, setSelectedPic] = useState<any>(null);

  return (
    <ProfilePicContext.Provider value={{ selectedPic, setSelectedPic }}>
      {children}
    </ProfilePicContext.Provider>
  );
};

export const useProfilePic = () => {
  const context = useContext(ProfilePicContext);
  if (context === undefined) {
    throw new Error('useProfilePic must be used within a ProfilePicProvider');
  }
  return context;
};
