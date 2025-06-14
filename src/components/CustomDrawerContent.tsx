import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const handleLogout = () => {
    props.navigation.navigate('Login');
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Drawer Header */}
      <View style={styles.headerContainer}>
        <Icon name="cash" size={60} color="#e6a9b7" />
        <Text style={styles.headerText}>Welcome !</Text>
      </View>
      
      {/* Drawer Items */}
      <View style={styles.drawerContent}>
        <DrawerItemList {...props} />
      </View>

      {/* Logout Button at the Bottom */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="log-out-outline" size={20} color="#fff" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf3f5', // Much lighter pink, almost white
  },
  headerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#f9e4e9', // Very light, soft pink for header
  },
  headerText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight: 'bold',
    color: '#cc3366', // Darker pink for the text
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
  },
  bottomSection: {
    marginTop: 'auto',
    borderTopWidth: 1,
    borderTopColor: '#f2d0d9', // Light pink border
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#cc3366', // Slightly darker pink button
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;
