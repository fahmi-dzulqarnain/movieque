import React, { useEffect } from "react"
import { Dimensions, Pressable, TextStyle, TouchableOpacity, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Text, Screen, AutoImage as Image } from "../../components"
import { color, spacing } from "../../theme"
import { StyleSheet } from "react-native"
import { palette } from "../../theme/palette"
import { movieId, setTimeId, useStores } from "../../models"
import Icon from 'react-native-vector-icons/FontAwesome';

export const ChooseTimeScreen = observer(function ChooseTimeScreen(route) {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()
  //const dataObj = { title: 'Wiro Sableng', vote_average: '999' }
  
  const { moviesStore } = useStores()

  // useEffect(() => {
  //   async function fetchData() {
  //     await moviesStore.getMovies()
  //   }

  //   fetchData()
  // }, [])

  const { movies } = moviesStore
  const movie = movies[movieId - 1]

  const hour = parseInt((movie.duration / 60).toString())
  var minute = (movie.duration % 60).toString()
  if (minute != "0") minute += "m"
  else minute = "" 
  
  var [ isPress, setIsPress ] = React.useState(false);

  return (
    <View testID="DemoScreen" style={styles.full}>
      <Screen preset="fixed" backgroundColor={palette.orangeDarker}>
        <Header
          headerTx="chooseTime.title"
          leftIcon="back24"
          onLeftPress={goBack}
          style={styles.header}
          titleStyle={HEADER_TITLE} />
        <View style={styles.mainContainer}>

          <View style={styles.listContainer} >
              <View style={{flexDirection: 'column', marginRight: spacing[5], marginTop: spacing[3]}}>
                  <Image source={{uri: movie.imageUrl}} style={styles.image} />
                  <View style={{flexDirection: 'row', marginLeft: 12, marginTop: 24}}>
                    <Icon name="user" size={16} color={palette.orangeDarker} />
                    <Text text={movie.category} style={styles.text}/>
                  </View>
                  <View style={{flexDirection: 'row', marginLeft: 12, marginTop: 12}}>
                    <Icon name="history" size={16} color={palette.orangeDarker} />
                    <Text text={hour + "h" + minute} style={styles.text}/>
                  </View>
                  <View style={{flexDirection: 'row', marginLeft: 12, marginTop: 12}}>
                    <Icon name="star" size={16} color={palette.orangeDarker} />
                    <Text text={movie.rating + "/10"} style={styles.text}/>
                  </View>
              </View>

              <View>
                  <Text style={styles.listTitle}>
                    {movie.title}
                  </Text>
                  <Text style={styles.description}>{movie.description}</Text>    
              </View>
          </View>

          <View style={{margin: spacing[3]}}>
              <Text text="Studio" style={styles.menuTitle}/>
              <View style={styles.menuView}>
                <Text text={movie.studio} style={styles.text}/>
              </View>
          </View>

          <View style={{margin: spacing[3]}}>
              <Text text="Monday, 28 June 2021" style={styles.menuTitle}/>
              <View style={styles.container}>
                <Pressable
                  onPress={() => { setTimeId(3); setIsPress(true)  }}
                  style={({ pressed }) => [{ borderColor: pressed ? palette.orangeDarker : 'transparent' }, styles.btnNormal ]}>
                  <Text style={styles.btnPress}>
                    {"11:40"}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => { setTimeId(4); setIsPress(true) }}
                  style={({ pressed }) => [{ borderColor: pressed ? palette.orangeDarker : 'transparent' }, styles.btnNormal ]}>
                  <Text style={styles.btnPress}>
                    {"13:50"}
                  </Text>
                </Pressable>
              </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("confirmTicket")}}>
              <Text style={{fontSize:15,}}>BOOK TICKET</Text>
          </TouchableOpacity>

        </View>
      </Screen>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  btnNormal: {
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
    width: 100,
    marginLeft: 10,
    color: palette.black,
    backgroundColor: palette.white
  },
  btnPress: {
    borderColor: 'transparent',
    borderWidth: 1,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 4,
    width: 100,
    color: palette.black
  },

  full: {
    flex: 1
  },
  mainContainer: {
    backgroundColor: "#f3f3f3", 
    height: Dimensions.get('window').height - 100,
    padding: spacing[4],
    flexDirection: 'column',
    flex: 1
  },
  listContainer: {
    alignContent: 'center',
    flexDirection: "row",
    // height: Dimensions.get('window').height - 200
  },
  listTitle: {
    color: color.storybookTextColor,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: spacing[2]
  },
  menuTitle: {
    color: color.storybookTextColor,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: spacing[3]
  },
  description: {
    color: color.storybookTextColor,
    marginRight: 120,
    marginTop: spacing[1],
    opacity: .6
  },
  secondTitle: {
    color: color.storybookTextColor,
    marginStart: spacing[4],
    marginTop: spacing[3],
    backgroundColor: color.transparent,
    fontSize: 20
  },
  text: {
    color: color.storybookTextColor,
    marginLeft: 8
  },
  menuView: {
    color: color.storybookTextColor,
    paddingLeft: 8,
    paddingTop: 8,
    marginTop: 12,
    backgroundColor: palette.white,
    borderRadius: 10,
    height: 35
  },
  image: {
    height: 124,
    width: 90,
    borderRadius: 8
  },
  icon: {
    width: spacing[2]
  },
  button: { 
    height: 40, 
    borderRadius: 10,
    backgroundColor:palette.orangeDarker, 
    alignItems:'center', 
    justifyContent:'center',
    marginTop: Dimensions.get('window').height - 650
  },
  header: {
    paddingBottom: spacing[5] - 4,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    backgroundColor: palette.orangeDarker
  }
})
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER_TITLE: TextStyle = {
  ...BOLD,
  fontSize: 13,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}
