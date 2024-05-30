import React from "react";
import {Image, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/native";

export const SplashScreen = () => {
  const navigation = useNavigation();
  const initParam = async () => {
    const uid = await AsyncStorage.getItem('uid')

    if (uid) navigation.navigate('TabStack');
    else navigation.navigate('AuthRegScreen');
  }

  React.useEffect(() => {
    initParam()
  })

  return(
    <View
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <Image
        style={{flex: 1, width: undefined, height: undefined}}
        source={require('../../assets/Splash.png')}
      />
    </View>
  )
}
