import {DefaultTheme, getFocusedRouteNameFromRoute, NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SplashScreen} from "../screens/Auth/SplashScreen";
import {AuthRegScreen} from "../screens/Auth/AuthRegScreen";
import {MainScreen} from "../screens/Main/MainScreen";
import {AnalyzesScreen} from "../screens/Main/AnalyzesScreen";
import {OrderScreen} from "../screens/Services/OrderScreen";
import {ProfileScreen} from "../screens/Profile/ProfileScreen";
import {OrderHistoryScreen} from "../screens/Profile/OrderHistoryScreen";
import {ServicesScreen} from "../screens/Services/ServicesScreen";
import {ChooseServicesScreen} from "../screens/Services/ChooseServicesScreen";
import {Image, Text, View} from "react-native";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ProfileStack = () => {
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='ProfileScreen' component={ProfileScreen} />
      <Stack.Screen name='OrderHistoryScreen' component={OrderHistoryScreen} />
    </Stack.Navigator>
  )
}
const ServicesStack = () => {
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
      <Stack.Screen name="ChooseServicesScreen" component={ChooseServicesScreen} />
      <Stack.Screen name='OrderScreen' component={OrderScreen} />
    </Stack.Navigator>
  )
}
const MainStack = () => {
  return(
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="Analyzes" component={AnalyzesScreen} />
    </Stack.Navigator>
  )
}

const TabStack = () => {
  return(
    <Tab.Navigator
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? '';

        return {
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: 70,
            justifyContent: 'center',
            paddingBottom: 10,
            display: routeName === 'OrderScreen' ? 'none' : 'flex',
          },
        };
      }}
    >
      <Tab.Screen
        name='MainStack'
        component={MainStack}
        options={{
          tabBarLabel: ({ focused, color}) => (
            <Text style={[{color}, focused && {color: '#35AA96'}]}>
              Главная
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <View>
              <Image source={
                focused
                  ? require('../assets/icon/main-active.png')
                  : require('../assets/icon/main-inactive.png')
                }
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='ServicesStack'
        component={ServicesStack}
        options={{
          tabBarLabel: ({ focused, color}) => (
            <Text style={[{color}, focused && {color: '#35AA96'}]}>
              Услуги
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <View>
              <Image source={
                focused
                  ? require('../assets/icon/services-active.png')
                  : require('../assets/icon/services-inactive.png')
              }
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name='ProfileStack'
        component={ProfileStack}
        options={{
          tabBarLabel: ({ focused, color}) => (
            <Text style={[{color}, focused && {color: '#35AA96'}]}>
              Профиль
            </Text>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <View>
              <Image source={
                focused
                  ? require('../assets/icon/profile-active.png')
                  : require('../assets/icon/profile-inactive.png')
              }
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
      />
      <Stack.Screen
        name="AuthRegScreen"
        component={AuthRegScreen}
      />
    </Stack.Navigator>
  )
}

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFF'
  },
};

export const AppContainer = () => {
  return(
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName='AuthStack'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name='AuthStack'
          component={AuthStack}
        />
        <Stack.Screen
          name='TabStack'
          component={TabStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
