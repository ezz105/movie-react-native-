import { View, Text } from 'react-native';
import Drawer from 'expo-router/drawer';
import { colorTokens } from '@tamagui/themes';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';

const Layout = () => {
  return (
    <Drawer
      screenOptions={{
        headerShown: true,
        drawerHideStatusBarOnOpen: true,
        drawerActiveBackgroundColor: colorTokens.dark.blue.blue7,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: { marginStart: -20, fontWeight: 'bold' },
      }}>
      <Drawer.Screen
        name="home"
        options={{
          title: 'MovieStars',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="favorites"
        options={{
          title: 'My Favorites',
          headerShown: false,
          drawerIcon: ({ color, size }) => <Ionicons name="star" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="movie/[id]"
        options={{
          title: '',
        }}
      />
    </Drawer>
  );
};

export default Layout;
