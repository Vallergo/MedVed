import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";

const refUser = firestore().collection('User');
export const addUser = async ({ email, firstName, secondName, phone, uid }) => {
  refUser
    .add({
      uid,
      email,
      firstName,
      secondName,
      phone
    })
    .then(() => console.log('User added'))
}
