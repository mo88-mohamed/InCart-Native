import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import ProfileView from '@/components/profile/ProfileView';
import { ThemedView } from '@/components/themed-view';
import { LoginCredentials, RegisterData, User } from '@/types/auth';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet } from 'react-native';

type AuthMode = 'login' | 'register';

export default function ProfileScreen() {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: 1,
        email: credentials.email,
        name: 'John Doe',
        avatar: 'https://placehold.co/150x150',
        role: 'customer',
      };
      
      setUser(mockUser);
      Alert.alert('Success', 'Logged in successfully!');
    } catch (error) {
      Alert.alert('Error', 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual registration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: 2,
        email: data.email,
        name: data.name,
        avatar: 'https://placehold.co/150x150',
        role: 'customer',
      };
      
      setUser(mockUser);
      Alert.alert('Success', 'Account created successfully!');
      setAuthMode('login');
    } catch (error) {
      Alert.alert('Error', 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setAuthMode('login');
  };


  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {user ? (
          <ProfileView user={user} onLogout={handleLogout} />
        ) : authMode === 'login' ? (
          <LoginForm 
            onLogin={handleLogin} 
            onSwitchToRegister={() => setAuthMode('register')} 
            isLoading={isLoading} 
          />
        ) : (
          <RegisterForm 
            onRegister={handleRegister} 
            onSwitchToLogin={() => setAuthMode('login')} 
            isLoading={isLoading} 
          />
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 20,
  },
});
