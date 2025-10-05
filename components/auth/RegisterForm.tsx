import { useThemeColor } from '@/hooks/use-theme-color';
import { RegisterData } from '@/types/auth';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface RegisterFormProps {
  onRegister: (data: RegisterData) => Promise<void>;
  onSwitchToLogin: () => void;
  isLoading: boolean;
}

export default function RegisterForm({ onRegister, onSwitchToLogin, isLoading }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // Theme colors
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({}, 'icon');

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      await onRegister(formData);
    } catch (error) {
      // Error handling is done in parent component
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={[styles.title, { color: textColor }]}>Create Account</Text>
      <Text style={[styles.subtitle, { color: textColor }]}>Join us today</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={20} color={tintColor} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: textColor, borderColor }]}
          placeholder="Full Name"
          placeholderTextColor={textColor + '80'}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          autoCapitalize="words"
          autoComplete="name"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color={tintColor} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: textColor, borderColor }]}
          placeholder="Email"
          placeholderTextColor={textColor + '80'}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color={tintColor} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: textColor, borderColor }]}
          placeholder="Password"
          placeholderTextColor={textColor + '80'}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
          autoComplete="new-password"
        />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name="lock" size={20} color={tintColor} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: textColor, borderColor }]}
          placeholder="Confirm Password"
          placeholderTextColor={textColor + '80'}
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          secureTextEntry
          autoComplete="new-password"
        />
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: tintColor }]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.primaryButtonText}>
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchButton}
        onPress={onSwitchToLogin}
      >
        <Text style={[styles.switchButtonText, { color: tintColor }]}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  switchButton: {
    alignItems: 'center',
  },
  switchButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
