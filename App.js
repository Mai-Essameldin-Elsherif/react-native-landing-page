import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
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

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarActiveTintColor: '#818CF8',
          tabBarInactiveTintColor: '#475569',
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

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0F1520',
    borderTopWidth: 1,
    borderTopColor: '#1F2937',
    height: 64,
    paddingBottom: 10,
    paddingTop: 6,
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
