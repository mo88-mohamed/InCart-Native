import { useThemeColor } from '@/hooks/use-theme-color';
import { LoginCredentials } from '@/types/auth';
import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

interface LoginFormProps {
  onLogin: (credentials: LoginCredentials) => Promise<void>;
  onSwitchToRegister: () => void;
  isLoading: boolean;
}

export default function LoginForm({ onLogin, onSwitchToRegister, isLoading }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });

  // Theme colors
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({}, 'icon');
  const { t } = useTranslation();

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert(t('error'), t('pleaseFillAllFields'));
      return;
    }

    try {
      await onLogin(formData);
    } catch (error) {
      // Error handling is done in parent component
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={[styles.title, { color: textColor }]}>{t('welcomeBack')}</Text>
      <Text style={[styles.subtitle, { color: textColor }]}>{t('signInToAccount')}</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="envelope" size={20} color={tintColor} style={styles.inputIcon} />
        <TextInput
          style={[styles.input, { color: textColor, borderColor }]}
          placeholder={t('email')}
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
          placeholder={t('password')}
          placeholderTextColor={textColor + '80'}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
          autoComplete="password"
        />
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, { backgroundColor: tintColor }]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.primaryButtonText}>
          {isLoading ? t('signingIn') : t('signIn')}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.switchButton}
        onPress={onSwitchToRegister}
      >
        <Text style={[styles.switchButtonText, { color: tintColor }]}>
          {t('dontHaveAccount')} {t('signUp')}
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
