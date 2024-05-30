import React from 'react'
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView, ScrollView,
  StatusBar,
  Text,
  TextInput,
  View
} from "react-native";
import {useNavigation, useRoute} from "@react-navigation/native";
import {useState} from "react";
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {addUser} from "../../fetch/authFetch";

export const AuthRegScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [type, setType] = useState(route?.params?.type)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [secondName, setSecondName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState(false)

  React.useEffect(() => {
    setType(route?.params?.type ?? 'auth')
  }, [route?.params?.type])

  const checkField = () => {
    if (
      type === 'auth' && email.trim() === '' || password.trim() === ''
    ){
      setError(true)
      return true
    }
    if (
      type !== 'auth' && (
      email.trim() === ''
      || password.trim() === ''
      || firstName.trim() === ''
      || secondName.trim() === ''
      || phone.trim() === ''
    )) {
      setError(true)
      return true
    }
    setError(false)
    return false
  }

  const clearState = () => {
    setEmail('');
    setPassword('');
    setFirstName('')
    setSecondName('')
    setPhone('')
    setError(false)
  }
  const navigateToMain = () => {
    clearState();
    navigation.navigate('TabStack')
  }
  const authorizationUser = () => {
    if (checkField()) return true
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res) => {
        console.log('User authenticated!');
        const uid = res.user.uid

        await AsyncStorage.setItem('uid', uid, async () => {
          navigateToMain();
        })
      })
      .catch(error => {
        setError(true)
      });
  }

  const registrationUser = () => {
    if (checkField()) return true
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (res) => {
        const uid = res.user.uid

        addUser({ email, firstName, secondName, phone, uid })

        await AsyncStorage.setItem('uid', uid, async () => {
          navigateToMain()
        })
      })
      .catch(error => {
        setError(true)

        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        clearState()
      });
  }

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        alignItems: 'center',
      }}
    >
      {
        type === 'auth'
          ? (
            <View
              style={{
                width: 200,
                height: 200,
                marginTop: 57
              }}
            >
              <Image
                style={{flex: 1, height: undefined, width: undefined}}
                source={require('../../assets/logo.png')}
              />
            </View>
          ) : (
            <View
              style={{
                gap: 20,
                alignItems: 'center'
              }}
            >
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 24
                }}
              >
                Регистрация
              </Text>
              <Text
                style={{
                  fontSize: 14
                }}
              >
                Заполните поля для регистрации
              </Text>
            </View>
          )
      }
      <ScrollView
        style={{
          width: '100%',
          paddingTop: 27,
        }}
      >
        <FlatList
          data={
            type === 'auth'
              ? [
                {value: email, setter: setEmail, text: 'Email'},
                {value: password, setter: setPassword, text: 'Пароль'}
              ] : [
                {value: email, setter: setEmail, text: 'Email'},
                {value: password, setter: setPassword, text: 'Пароль'},
                {value: phone, setter: setPhone, text: 'Телефон'},
                {value: firstName, setter: setFirstName, text: 'Имя'},
                {value: secondName, setter: setSecondName, text: 'Фамилия'}
              ]
          }
          renderItem={(el) => {
            return (
              <View
                style={{
                  gap: 10,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 16
                  }}
                >{el.item.text}</Text>
                <TextInput
                  value={el.item.value}
                  onChangeText={(textValue) => el.item.setter(textValue)}
                  style={[{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    borderWidth: 1,
                    borderColor: '#ADADAD',
                    borderRadius: 7,
                  }, error && { borderColor: '#FF0505' }]}
                />
              </View>
            )
          }}
          style={{
            marginBottom: 30
          }}
        />
        <Pressable
          style={[{
            width: '100%',
            marginTop: 50,
            alignItems: 'center',
            backgroundColor: '#4EB5A3',
            borderRadius: 10
          }, (type !== 'auth') && {marginTop: 50} ]}
          onPress={() => {
            if (type === 'auth') {
              authorizationUser();
            } else {
              registrationUser();
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
            {
              type === 'auth'
                ? "Войти"
                : "Зарегистрироваться"
            }
          </Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
            marginTop: 15
          }}
        >
          <Pressable
            onPress={() => {
              clearState()
              setType(type === 'auth' ? 'reg' : 'auth')
            }}
          >
            <Text
              style={{
                color: '#000',
                fontSize: 16
              }}
            >
              {
                type === 'auth'
                  ? 'Регистрация аккаунта'
                  : 'Авторизация аккаунта'
              }
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
