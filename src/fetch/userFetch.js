import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userPromo = firestore().collection('User');

export const getUserPhone = async () => {
  const uid = await AsyncStorage.getItem('uid')

  return new Promise((resolve, reject) => {
    userPromo
      .where('uid', '==', uid)
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const {phone} = doc.data();
          console.log(phone)
          resolve(phone)
        });
      }, (error) => {
        reject(error);
      });
  });
}

export const getUserInfo = async () => {
  const uid = await AsyncStorage.getItem('uid')

  return new Promise((resolve, reject) => {
    userPromo
      .where('uid', '==', uid)
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const {firstName, secondName, email, phone} = doc.data();

          list.push({
            id: doc.id,
            firstName: firstName,
            secondName: secondName,
            email,
            phone
          });
        });
        resolve(list);
      }, (error) => {
        reject(error);
      });
  });
}

export const updateUserInfo = async ({ firstName, phone, secondName}) => {
  const uid = await AsyncStorage.getItem('uid')

  return new Promise((resolve, reject) => {
    userPromo
      .where('uid', '==', uid)
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          userPromo
            .doc(doc.id)
            .update({
              Fname: firstName,
              Sname: secondName,
              phone: phone
            })
        });
        resolve(list);
      }, (error) => {
        reject(error);
      });
  });
}
