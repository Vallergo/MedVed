import {FlatList, Image, ImageBackground, Text, View} from "react-native";

export const Card = ({analize = null, data}) => {
  return (
    <View
      style={{
        width: 270,
        borderRadius: 12,
        borderColor: '#D9D9D9',
        borderWidth: 1,
        paddingLeft: 13
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <Image width={270} height={85} source={{uri: data.theme}} />
      </View>
      {
        !analize && (
          <View
            style={{
              marginTop: 30,
              gap: 7
            }}
          >
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold'
              }}
            >{data.title}</Text>
            <FlatList
              horizontal={true}
              data={data.tags}
              renderItem={(item) => {
                return (
                  <View
                    style={{
                      paddingVertical: 3,
                      paddingHorizontal: 6,
                      backgroundColor: '#FFF8D6',
                      borderRadius: 6
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                      }}
                    >{item.item}</Text>
                  </View>
                )
              }}
              keyExtractor={(item) => item.index}
              style={{
                flexDirection: 'row',
                gap: 11
              }}
            />
          </View>
        )
      }
      <View
        style={[{
          gap: 5,
          marginLeft: 4,
          marginTop: 20,
          marginBottom: 12
        }, analize && {marginTop: 95}]}
      >
        <Text
          style={{
            fontSize: 14,
            fontWeight: 'bold'
          }}
        >{data.descTitle}</Text>
        <Text
          style={{
            fontSize: 10,
          }}
        >{data.descMain}</Text>
        {
          !analize && (
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                alignItems: 'flex-end'
              }}
            >
              <Text
                style={{
                  color: '#F75621',
                  fontSize: 14,
                  fontWeight: 'bold'
                }}
              >{data.discaunt} ₽</Text>
              <Text
                style={{
                  color: '#707070',
                  fontSize: 10,
                  textDecorationLine: 'line-through',
                }}
              >{data.price} ₽</Text>
            </View>
          )
        }
      </View>
    </View>
  )
}
