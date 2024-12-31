import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native';

import { DrawerToggleButton } from '@react-navigation/drawer';
import { useTheme } from 'tamagui';

export const unstable_settings = {
  initialRouteName: 'index',
};

const Layout = () => {
  const theme = useTheme();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.blue1.get(),
          },
          headerTintColor: '#fff',
        }}>
        <Stack.Screen
          name="index"
          options={{
            title: 'MovieStars',
            headerLeft: () => <DrawerToggleButton tintColor="#fff" />,
          }}
        />
        <Stack.Screen
          name="movie/[id]"
          options={{
            title: 'Back',
            headerBackTitle: 'Back',
          }}
        />
        <Stack.Screen
          name="tv/[id]"
          options={{
            title: 'Back',
            headerBackTitle: 'Back',
          }}
        />
      </Stack>
    </SafeAreaView>
  );
};

export default Layout;
