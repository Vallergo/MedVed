import firestore from "@react-native-firebase/firestore";

const refDirection = firestore().collection('Direction');
const refServices = firestore().collection('Services');

export const getDirection = async () => {

  return new Promise((resolve, reject) => {
    refDirection
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const {name} = doc.data();

          list.push({
            id: doc.id,
            name
          });
        });
        resolve(list);
      }, (error) => {
        reject(error);
      });
  });
}
export const getShortServicesInfo = async (direction) => {
  return new Promise((resolve, reject) => {
    refServices
      .where('direction', '==', direction)
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const {name, price} = doc.data();

          list.push({
            id: doc.id,
            name,
            price
          });
        });
        resolve(list);
      }, (error) => {
        reject(error);
      });
  });
}

export const getServicesInfo = async (servicesName) => {
  return new Promise((resolve, reject) => {
    refServices
      .where('name', '==', servicesName)
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const {name, price, doctorFIO, doctorAva, direction, clinic, address} = doc.data();

          list.push({
            id: doc.id,
            name, price, doctorFIO, doctorAva, direction, clinic, address
          });
        });
        resolve(list);
      }, (error) => {
        reject(error);
      });
  });
}
