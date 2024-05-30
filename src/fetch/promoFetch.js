import firestore from "@react-native-firebase/firestore";

const refPromo = firestore().collection('Promo');

export const getPromo = async () => {

  return new Promise((resolve, reject) => {
    refPromo
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const {BackTheme, Description, Title} = doc.data();

          list.push({
            id: doc.id,
            theme: BackTheme,
            descMain: Description,
            descTitle: Title
          });
        });
        resolve(list);
      }, (error) => {
        reject(error);
      });
  });
}
