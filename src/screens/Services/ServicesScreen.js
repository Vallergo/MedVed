import React from "react";
import {FlatList, Pressable, Text, View, Image} from "react-native";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {getDirection} from "../../fetch/directionFetch";

export const ServicesScreen = () => {
  const isFocus = useIsFocused()
  const navigation = useNavigation()

  const [directionData, setDirectionData] = React.useState([])

  const getData = () => {
    getDirection()
      .then(res => {
        setDirectionData(res)
      })
  }

  React.useEffect(() => {
    getData()
  }, [isFocus])

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        alignItems: 'center'
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#4EB5A3',
          paddingTop: 50
        }}
      >Услуги</Text>
      <FlatList
        data={directionData}
        style={{
          paddingTop: 70,
        }}
        renderItem={(el) => {
          return(
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                marginBottom: 50
              }}
            >
              <Text
                style={{
                  fontSize: 24
                }}
              >{el.item.name}</Text>
              <Pressable
                style={{
                  width: 33,
                  height:33
                }}
                onPress={() => {
                  navigation.navigate('ChooseServicesScreen', {direction: el.item.name});
                }}
              >
                <Image source={require('../../assets/icon/arrow-right-bg.png')}/>
              </Pressable>
            </View>
          )
        }}
      />
    </View>
  )
}
