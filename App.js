import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import HomeScreen from './screens/HomeScreen';
import AddMovieScreen from './screens/AddMovieScreen';
import ExploreScreen from './screens/ExploreScreen';

const Tab = createBottomTabNavigator();

function TabIcon({ label, focused }) {
  const icons = {
    Home: focused ? '⬡' : '⬢',
    Add: focused ? '✚' : '╋',
    Explore: focused ? '◈' : '◇',
  };
  return (
    <View style={styles.iconWrapper}>
      <Text style={[styles.iconText, focused && styles.iconTextActive]}>
        {icons[label]}
      </Text>
    </View>
  );
}

function MainApp() {
  const { theme } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: [
            styles.tabBar,
            {
              backgroundColor: theme.headerBg,
              borderTopColor: theme.cardBorder,
            },
          ],
          tabBarActiveTintColor: theme.primary,
          tabBarInactiveTintColor: theme.textMuted,
          tabBarLabelStyle: styles.tabLabel,
          tabBarIcon: ({ focused }) => (
            <TabIcon label={route.name} focused={focused} />
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: 'Home' }}
        />
        <Tab.Screen
          name="Add"
          component={AddMovieScreen}
          options={{ tabBarLabel: 'Add Movie' }}
        />
        <Tab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{ tabBarLabel: 'Explore' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 64,
    paddingBottom: 10,
    paddingTop: 6,
    borderTopWidth: 1,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 28,
  },
  iconText: {
    fontSize: 20,
    color: '#475569',
  },
  iconTextActive: {
    color: '#818CF8',
  },
});
