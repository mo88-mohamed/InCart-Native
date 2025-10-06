import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useCart } from "@/context/CartContext";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabBarActiveTintColor = Colors[colorScheme ?? "light"].tint;
  const tabBarInactiveTintColor = Colors[colorScheme ?? "light"].tabIconDefault;
  const { getCartItemsCount } = useCart();
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor,
        tabBarInactiveTintColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: Platform.OS === "ios" ? 90 : 70,
          paddingBottom: Platform.OS === "ios" ? 25 : 10,
          paddingTop: 10,
          // backgroundColor: 'transparent',
          // position: "absolute",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          // elevation: 10,
        },
        // tabBarShowLabel: true,
        // tabBarLabelStyle: {
        //   fontSize: 12,
        //   fontWeight: "500",
        //   marginTop: 4,
        // },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('home'),
          tabBarIcon: ({ color, focused }) => (
            <View>
              <FontAwesome size={24} name="home" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: t('favorites'),
          href:null,
          tabBarIcon: ({ color, focused }) => (
            <View>
              <FontAwesome size={24} name="heart" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: t('cart'),
          tabBarIcon: ({ color, focused }) => (
            <View>
              <View style={styles.cartIconContainer}>
                <FontAwesome size={24} name="cart-arrow-down" color={color} />
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: tabBarActiveTintColor },
                  ]}
                >
                  <Text style={styles.badgeText}>{getCartItemsCount()}</Text>
                </View>
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ color, focused }) => (
            <View>
              <FontAwesome5 size={24} name="user" color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          href: null,
          title: t('search'),
        }}
      />
      <Tabs.Screen
        name="product/[id]"
        options={{
          href: null,
          title: "Product",
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarBackground: {
    ...StyleSheet.absoluteFillObject,
    borderTopWidth: 1,
  },
  activeTab: {
    // backgroundColor: 'rgba(10, 126, 164, 0.15)',
    // padding: 8,
    // borderRadius: 12,
  },
  cartIconContainer: {
    // position: "relative",
  },
  badge: {
    position: "absolute",
    right: -8,
    top: -5,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
