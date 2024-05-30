import React from "react";
import {FlatList, Image, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {OrderSendModal} from "../../components/OrderSendModal/OrderSendModal";
import {createOrder, getOrder} from "../../fetch/orderFetch";
import {useIsFocused, useNavigation, useRoute} from "@react-navigation/native";
import {getServicesInfo} from "../../fetch/directionFetch";
import {getUserInfo} from "../../fetch/userFetch";

export const OrderHistoryScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused()

  const [dataOrder, setDataOrder] = React.useState([])

  const getDataOrder = () => {
    getOrder()
      .then((res) => {
        setDataOrder(res)
      })
  }

  React.useEffect(() => {
    getDataOrder()
  }, [isFocused])

  return(
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
          justifyContent: 'space-between',
          marginBottom: 25
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
        >Мои записи</Text>
        <View></View>
      </View>
      <FlatList
        data={dataOrder}
        renderItem={(el) => {
          return(
            <View
              style={{
                width: '100%',
                borderRadius: 7,
                borderWidth: 1,
                borderColor: '#7E7E9A',
                marginBottom: 15
              }}
            >
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#7E7E9A',
                  paddingHorizontal: 25,
                  paddingTop: 20,
                  paddingBottom: 14
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold'
                    }}
                  >{el.item.nameServices}</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold'
                    }}
                  >{el.item.price} ₽</Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                    }}
                  ><Text style={{fontSize: 14, fontWeight: 'bold'}}>Пациент: </Text>{el.item.pacient}</Text>
                  <Text
                    style={{
                      fontSize: 14,
                    }}
                  ><Text style={{fontSize: 14, fontWeight: 'bold'}}>Дата: </Text>{el.item.date}</Text>
                </View>
              </View>
            </View>
          )
        }}
      />
    </View>
  )
}
