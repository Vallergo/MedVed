import React from "react";
import {Image, Modal, Pressable, Text, View} from "react-native";
export const OrderSendModal = ({ isVisible, setIsVisible, navigation }) => {
  return (
    <Modal
      transparent={false}
      visible={isVisible}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          marginTop: 100
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            width: 270,
            textAlign: 'center'
          }}
        >
          Заявка отправлена в клинику
        </Text>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 50
          }}
        >
          <View
            style={{
              marginTop: 105,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 20
            }}
          >
            <View
              style={{width: 22, height: 22}}
            >
              <Image
                style={{width: undefined, height: undefined, flex: 1}}
                source={require('../../assets/icon/clock.png')}
              />
            </View>
            <Text
              style={{
                fontSize: 18
              }}
            >Клиника перезвонит вам {'\n'}в ближайшее время</Text>
          </View>
          <View
            style={{
              marginTop: 25,
              flexDirection: 'row',
              gap: 20
            }}
          >
            <View
              style={{width: 22, height: 22}}
            >
              <Image
                style={{width: undefined, height: undefined, flex: 1}}
                source={require('../../assets/icon/phone.png')}
              />
            </View>
            <Text
              style={{
                fontSize: 18,
              }}
            >С номера 303-44-27</Text>
          </View>
        </View>
        <Pressable
          style={{
            width: '90%',
            alignItems: 'center',
            backgroundColor: '#4EB5A3',
            borderRadius: 10,
            marginTop: 300
          }}
          onPress={() => {
            setIsVisible(false)
            navigation.navigate('MainScreen')
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: '#fff',
              marginVertical: 17,
              fontWeight: 'bold'
            }}
          >
            Хорошо
          </Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: 'row',
            gap: 8,
            marginTop: 15,
          }}
          onPress={() => {
            navigation.navigate('OrderHistoryScreen')
            setIsVisible(false)
          }}
        >
          <Text
            style={{
              color: '#1F6F61',
              fontSize: 18,
              fontWeight: 'bold'
            }}
          >
            Перейти в "Мои записи"
          </Text>
        </Pressable>
      </View>
    </Modal>
  )
}
