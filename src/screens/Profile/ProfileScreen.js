import React, {useState} from "react";
import {View, Text, Pressable, FlatList, Image, TextInput, KeyboardAvoidingView} from "react-native";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {getUserInfo, updateUserInfo} from "../../fetch/userFetch";
import {getCountOrder} from "../../fetch/orderFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ProfileScreen = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()
  const [isEdit, setIsEdit] = useState(false)

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [phone, setPhone] = useState('')
  const [count, setCount] = useState(null)
  const [error, setError] = useState(false)

  const checkField = () => {
    if (
        email.trim() === ''
        || firstName.trim() === ''
        || secondName.trim() === ''
        || phone.trim() === ''
    ) {
      setError(true)
      return true
    }
    setError(false)
    return false
  }

  const namingCountOrders = () => {
    switch (true) {
      case
      (count > 5 && count < 20)
      || count % 10 === 5
      || count % 10 === 6
      || count % 10 === 7
      || count % 10 === 8
      || count % 10 === 9
      || count % 10 === 0
      :
        return `${count} заявок`

      case
      count % 10 === 1 && count !== 11
      :
        return `${count} заявка`

      default
      :
        return `${count} заявки`
    }
  }

  const getUserData = async () => {
    getUserInfo()
      .then(el => {
        setEmail(el[0].email)
        setFirstName(el[0].firstName)
        setSecondName(el[0].secondName)
        setPhone(el[0].phone)
        getCountOrder(el[0].phone)
          .then(res => {
            setCount(res)
          })
      })
  }

  React.useEffect(() => {
    getUserData()
  }, [isFocused])

  return (
    <View
      style={{
        width: '100%',
        paddingHorizontal: 47.5
      }}
    >
      <View
        style={{
          marginTop: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Pressable
          style={{
            position: 'absolute',
            left: 0
          }}
          onPress={async () => {
            await AsyncStorage.removeItem('uid')
            navigation.navigate('AuthRegScreen')
          }}
        >
          <Text
            style={{
              color: '#35AA96',
              fontSize: 15,
              fontWeight: 'bold'
            }}
          >
            Выход
          </Text>
        </Pressable>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 'bold'
          }}
        >Профиль</Text>
        <Pressable
          style={{
            position: 'absolute',
            right: 0
          }}
          onPress={() => {
            if (checkField() && isEdit) return true;
            setIsEdit(!isEdit)
            updateUserInfo({firstName, phone, secondName})
          }}
        >
          <Text
            style={{
              color: '#35AA96',
              fontSize: 15,
              fontWeight: 'bold'
            }}
          >
            {
             isEdit
              ? 'Готово'
              : 'Редак.'
            }
          </Text>
        </Pressable>
      </View>
      <FlatList
        data={[
          {value: firstName, setter: setFirstName, text: 'Имя'},
          {value: secondName, setter: setSecondName, text: 'Фамилия'},
          {value: phone, setter: setPhone, text: 'Телефон'},
          {value: email, setter: setEmail, text: 'Email'},
        ]}
        renderItem={(el) => {
          return(
            <View
              style={[{
                marginBottom: 25,
                paddingVertical: 9.5,
                paddingHorizontal: 12.5,
                borderWidth: 1,
                borderColor: '#ADADAD',
                borderRadius: 7,
              }, error && { borderColor: '#FF0505' }]}
            >
              <Text
                style={{
                  fontSize: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ADADAD',
                }}
              >{el.item.text}</Text>
              {
                isEdit && el.item.text !== 'Email'
                  ? (
                    <TextInput
                      value={el.item.value}
                      onChangeText={(textValue) => el.item.setter(textValue)}
                      style={{
                        marginTop: 5,
                        fontSize: 16
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        marginTop: 5,
                        fontSize: 16
                      }}
                    >{el.item.value}</Text>
                  )
              }
            </View>
          )
        }}
        style={{
          marginTop: 76,
        }}
      />
      <View
        style={{
          paddingHorizontal: 22,
          paddingVertical: 15,
          borderWidth: 1,
          borderColor: '#35AA96',
          borderRadius: 7,
          backgroundColor: '#F5F5F9',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <View
          style={{
            gap: 10,
          }}
        >
          <View
            style={{
              width: 20,
              height: 20,
            }}
          >
            <Image
              style={{width: undefined, height: undefined, flex: 1}}
              source={require('../../assets/icon/calendare.png')}
            />
          </View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold'
            }}
          >Мои записи</Text>
          <Text
            style={{
              fontSize: 14,
              color: '#707070'
            }}
          >{namingCountOrders()}</Text>
        </View>
        <Pressable
          style={{
            width: 15,
            height: 15
          }}
          onPress={() => {
            navigation.navigate('OrderHistoryScreen')
          }}
        >
          <Image
            style={{width: undefined, height: undefined, flex: 1}}
            source={require('../../assets/icon/arrow-right.png')}
          />
        </Pressable>
      </View>
    </View>
  )
}
