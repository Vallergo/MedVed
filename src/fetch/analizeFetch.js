import firestore from "@react-native-firebase/firestore";

const refAnalize = firestore().collection('Analizes');

export const getAnalize = async () => {

  return new Promise((resolve, reject) => {
    refAnalize
      .onSnapshot((querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const {Title, descMain, descTitle, discaunt, price, tags, theme} = doc.data();

          list.push({
            id: doc.id,
            title: Title,
            theme,
            descMain,
            descTitle,
            tags,
            price,
            discaunt
          });
        });
        resolve(list);
      }, (error) => {
        reject(error);
      });
  });
}
