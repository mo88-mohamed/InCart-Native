import { useThemeColor } from '@/hooks/use-theme-color';
import { User } from '@/types/auth';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
}

export default function ProfileView({ user, onLogout }: ProfileViewProps) {
  // Theme colors
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({}, 'icon');

  const menuItems = [
    { icon: 'shopping-bag', title: 'My Orders', onPress: () => console.log('My Orders') },
    { icon: 'heart', title: 'Favorites', onPress: () => console.log('Favorites') },
    { icon: 'gear', title: 'Settings', onPress: () => console.log('Settings') },
    { icon: 'question-circle', title: 'Help & Support', onPress: () => console.log('Help & Support') },
  ];

  return (
    <View style={styles.profileContainer}>
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: user?.avatar || 'https://placehold.co/150x150' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={[styles.editAvatarButton, { backgroundColor: tintColor }]}>
          <FontAwesome name="camera" size={16} color="white" />
        </TouchableOpacity>
      </View>

      <Text style={[styles.profileName, { color: textColor }]}>{user?.name}</Text>
      <Text style={[styles.profileEmail, { color: textColor }]}>{user?.email}</Text>

      <View style={styles.profileStats}>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: tintColor }]}>12</Text>
          <Text style={[styles.statLabel, { color: textColor }]}>Orders</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: tintColor }]}>3</Text>
          <Text style={[styles.statLabel, { color: textColor }]}>Favorites</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statNumber, { color: tintColor }]}>5</Text>
          <Text style={[styles.statLabel, { color: textColor }]}>Reviews</Text>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index}
            style={[styles.menuItem, { borderBottomColor: borderColor }]}
            onPress={item.onPress}
          >
            <FontAwesome name={item.icon as any} size={20} color={textColor} />
            <Text style={[styles.menuText, { color: textColor }]}>{item.title}</Text>
            <FontAwesome name="chevron-right" size={16} color={borderColor} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.logoutButton, { borderColor }]}
        onPress={onLogout}
      >
        <FontAwesome name="sign-out" size={20} color="#e74c3c" />
        <Text style={[styles.logoutText, { color: '#e74c3c' }]}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#fff',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 30,
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  menuContainer: {
    width: '100%',
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 12,
    width: '100%',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
