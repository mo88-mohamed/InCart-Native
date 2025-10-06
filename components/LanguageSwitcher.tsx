import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { checkIsRTL } from '../utils/i18n';

interface LanguageSwitcherProps {
  style?: any;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ style }) => {
  const { i18n } = useTranslation();

  const toggleLanguage = async () => {
    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    await i18n.changeLanguage(newLanguage);
  };

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={toggleLanguage}
      activeOpacity={0.7}
    >
      <View style={styles.languageContainer}>
        <Text style={[
          styles.languageText,
          i18n.language === 'en' ? styles.activeLanguage : styles.inactiveLanguage
        ]}>
          EN
        </Text>
        <Text style={styles.separator}>|</Text>
        <Text style={[
          styles.languageText,
          i18n.language === 'ar' ? styles.activeLanguage : styles.inactiveLanguage
        ]}>
          العربية
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageText: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  activeLanguage: {
    color: '#007AFF',
  },
  inactiveLanguage: {
    color: '#666',
  },
  separator: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 8,
  },
});
