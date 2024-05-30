import React from "react";
import {FlatList, Image, Pressable, Text, View} from "react-native";
import {Card} from "../../components/Card/Card";
import {useIsFocused} from "@react-navigation/native";
import {getPromo} from "../../fetch/promoFetch";
import {getAnalize} from "../../fetch/analizeFetch";

export const MainScreen = () => {
  const focused = useIsFocused()
  const [analizeData, setAnalizeData] = React.useState([])
  const [promoData, setPromoData] = React.useState([])

  const getData = async () => {
    getPromo()
      .then((res) => {
        setPromoData(res)
      })
      .catch(err => console.log('err', err))
    getAnalize()
      .then((res) => {
        setAnalizeData(res)
      })
      .catch(err => console.log('err',err))
  }

  React.useEffect(() => {
    getData()
  }, [focused])

  return (
    <View
      style={{
        width: '100%',
        paddingLeft: 16
      }}
    >
      <View
        style={{
          marginTop: 60,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >Популярные анализы</Text>
      </View>
      <FlatList
        horizontal
        data={analizeData}
        renderItem={(item) => {
          return <Card data={item.item} />
        }}
        style={{
          marginTop: 30,
          minHeight: 152
        }}
      />
      <View
        style={{
          marginTop: 50,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >Акции</Text>
      </View>
      <FlatList
        horizontal
        data={promoData}
        renderItem={(item) => {
          return <Card data={item.item} analize={true} />
        }}
        style={{
          marginTop: 30,
          minHeight: 152
        }}
      />
    </View>
  )
}
