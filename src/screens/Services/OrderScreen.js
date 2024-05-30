import React from "react";
import {Image, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import {getServicesInfo, getShortServicesInfo} from "../../fetch/directionFetch";
import {getUserInfo, updateUserInfo} from "../../fetch/userFetch";
import {OrderSendModal} from "../../components/OrderSendModal/OrderSendModal";
import {createOrder} from "../../fetch/orderFetch";

export const OrderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [dataService, setDataServices] = React.useState([])
  const [dataUser, setUserData] = React.useState([])
  const [userFI, setUserFI] = React.useState('')
  const [error, setError] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(false)

  const getDataServicesOfDirection = () => {
    getServicesInfo(route?.params?.chooseService.name)
      .then(res => {
        setDataServices(res[0])
      })
    getUserInfo()
      .then(res => {
        setUserData(res[0])
      })
  }

  React.useEffect(() => {
    console.log(route?.params?.chooseService)
    getDataServicesOfDirection()
  }, [route?.params?.chooseService])

  return (
    <View
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <OrderSendModal navigation={navigation} isVisible={isVisible} setIsVisible={setIsVisible}  />
      <ScrollView
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
          >Запись к врачу</Text>
          <View></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            paddingTop: 20,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100
            }}
          >
            <Image
              style={{
                flex: 1,
                width: undefined,
                height: undefined
              }}
              resizeMode={"contain"}
              source={dataService.doctorAva
                ? {uri: dataService.doctorAva}
                : require('../../assets/profile-placeholder.png')
              }
            />
          </View>
          <Text
            style={{
              width: '40%',
              fontSize: 18,
              fontWeight: 'bold'
            }}
          >{dataService.doctorFIO}</Text>
        </View>
        <View
          style={{
            marginTop: 25,
            paddingBottom: 12,
            gap: 7,
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold'
            }}
          >{dataService.clinic}</Text>
          <Text
            style={{
              fontSize: 12
            }}
          >{dataService.address}</Text>
        </View>
        <View
          style={{
            marginTop: 12,
            paddingBottom: 12,
            gap: 7,
            borderBottomColor: '#D9D9D9',
            borderBottomWidth: 1
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold'
            }}
          >{dataService.name}</Text>
          <Text
            style={{
              fontSize: 12
            }}
          >{dataService.price} ₽</Text>
        </View>

        <View
          style={{
            width: '100%',
            marginTop: 60,
            backgroundColor: '#E0F2FF',
            paddingVertical: 20,
            borderRadius: 7,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text
            style={{
              color: '#1F6F61',
              fontWeight: 'bold',
              fontSize: 14
            }}
          >Предварительная запись - клиника перезвонит</Text>
        </View>

        <View
          style={{
            marginTop: 55,
            gap: 30
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold'
            }}
          >Данные пациента</Text>
          <TextInput
            value={userFI}
            onChangeText={(textValue) => {
              if (error) setError(false)
              setUserFI(textValue)
            }}
            placeholder='ФИО пациента полностью'
            style={[{
              marginTop: 5,
              fontSize: 16,
              paddingVertical: 10,
              paddingLeft: 20,
              borderColor: '#ADADAD',
              borderWidth: 1,
              borderRadius: 7
            }, error && {borderColor: '#FF0505'}]}
          />
          <Text
            style={{
              marginTop: 5,
              fontSize: 16,
              paddingVertical: 10,
              paddingLeft: 20,
              borderColor: '#ADADAD',
              borderWidth: 1,
              borderRadius: 7
            }}
          >{dataUser.phone}</Text>
        </View>
      </ScrollView>

      <Pressable
        style={{
          width: '90%',
          position: 'fixed',
          bottom: 15,
          left: 20,
          alignItems: 'center',
          backgroundColor: '#4EB5A3',
          borderRadius: 10
        }}
        onPress={() => {
          if (userFI.trim() !== '') {
            createOrder({phone: dataUser.phone, nameServices: dataService.name, pacient: userFI, price: dataService.price})
            setIsVisible(true)
          } else {
            setError(true)
          }
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
