import React from "react";
import {FlatList, Image, Pressable, Text, View} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {getShortServicesInfo} from "../../fetch/directionFetch";
import {log} from "expo/build/devtools/logger";

export const ChooseServicesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [dataService, setDataServices] = React.useState([])
  const [chooseService, setChooseServices] = React.useState(null)

  const getDataServicesOfDirection = () => {
    getShortServicesInfo(route?.params?.direction)
      .then(res => {
        setDataServices(res)
      })
  }

  React.useEffect(() => {
    getDataServicesOfDirection()
  }, [route?.params?.direction])

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          marginTop: 50,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Pressable
          onPress={() => navigation.goBack()}
        >
          <Image source={require('../../assets/icon/arrow-left-bg.png')}/>
        </Pressable>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold'
          }}
        >Выберите услугу</Text>
        <View></View>
      </View>
      <FlatList
        data={dataService}
        renderItem={(el) => {
          return(
            <Pressable
              style={[{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                borderColor: '#ADADAD',
                borderWidth: 1,
                paddingVertical: 15,
                paddingHorizontal: 12,
                borderRadius: 7,
                marginBottom: 30
              }, el.index === chooseService?.index && {backgroundColor: 'rgba(78, 181, 163, 0.3);'}]}
              onPress={() => {
                if (chooseService?.index === el.index) {
                  setChooseServices(null)
                } else {
                  setChooseServices(el)
                }
              }}
            >
              <Text
                style={{
                  fontSize: 15
                }}
              >{el.item.name}</Text>
              <Text
                style={{
                  fontSize: 17,
                  color: '#35AA96'
                }}
              >{el.item.price} ₽</Text>
            </Pressable>
          )
        }}
        keyExtractor={el => el.index}
        style={{
          marginTop: 85
        }}
      />
      <Pressable
        style={[{
          width: '100%',
          position: 'absolute',
          bottom: 15,
          left: 20,
          alignItems: 'center',
          backgroundColor: '#4EB5A3',
          borderRadius: 10,
          visible: false
        }, chooseService && {visible: true} ]}
        onPress={() => {
          navigation.navigate('OrderScreen', { chooseService: chooseService.item })
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: '#fff',
            marginVertical: 17
          }}
        >
          Записаться
        </Text>
      </Pressable>
    </View>
  )
}
