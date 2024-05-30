import firestore from "@react-native-firebase/firestore";
import {getUserPhone} from "./userFetch";

const refOrder = firestore().collection('Order');

export const createOrder = async ({ phone, nameServices, pacient, price }) => {
    console.log(phone, nameServices, pacient, price)
    refOrder
      .add({
        date: '',
        nameServices,
        pacient,
        phone,
        price
      })
      .then(() => console.log('Order added'))
}

export const getOrder = async () => {
  const phone = await getUserPhone();
  console.log(phone)
  return new Promise((resolve, reject) => {
      refOrder
        .where('phone', '==', phone)
        .onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach((doc) => {
                const {date, nameServices, pacient, phone, price} = doc.data();

                list.push({
                    id: doc.id, date, nameServices, pacient, phone, price
                });
            });
            resolve(list);
        }, (error) => {
            reject(error);
        });
  });
}

export const getCountOrder = async ( phone ) => {
  return new Promise((resolve, reject) => {
    refOrder
      .where('phone', '==', phone)
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const {date, nameServices, pacient, phone} = doc.data();

          list.push({
            id: doc.id, date, nameServices, pacient, phone
          });
        });
        resolve(list.length);
      }, (error) => {
        reject(error);
      });
  });
}
