import React from "react"
import { View, TextStyle, Dimensions, StyleSheet } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, AutoImage as Image } from "../../components"
import { color, spacing } from "../../theme"
import { palette } from "../../theme/palette"
import { movieId, useStores, timeId } from "../../models"
import { TouchableOpacity } from "react-native-gesture-handler"

export const ConfirmScreen = observer(function ConfirmScreen() {
  const navigation = useNavigation()
  const goBack = () => navigation.goBack()

  const { moviesStore } = useStores()
  const { movies } = moviesStore
  const movie = movies[movieId - 1]
  const objTime = [{ timeId: 3, time: "11.40"}, { timeId: 4, time: "13.50"}]
  const timeFix = objTime.find(x => x.timeId == timeId).time

  return (
    <View testID="ConfirmScreen" style={styles.full}>
      <Screen preset="fixed" backgroundColor={palette.orangeDarker}>
        <Header 
          headerTx="confirmTicket.title" 
          leftIcon="back24"
          style={styles.header}
          onLeftPress={goBack} titleStyle={HEADER_TITLE} />
        <View style={styles.mainContainer}>
          <View style={{width: 100, height: Dimensions.get("screen").height - 350, backgroundColor: palette.white, 
                alignSelf: "center", flexDirection: 'column',
            flex: 1, margin: spacing[5], borderRadius: 12}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={styles.listTitle}>{movie.title}</Text>
                <Image style={styles.image} source={{uri: movie.imageUrl}}/>
                <Text style={styles.description}>Studio</Text>
                <Text style={styles.listTitle}>{movie.studio}</Text>
                <Text style={styles.dateText}>Monday, 28 June 2021</Text>
                <View style={styles.btnNormal}>
                  <Text style={styles.btnPress}>{timeFix}</Text>
                </View>
              </View>
              <View style={{alignContent: 'flex-end'}}>
                <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("myTicket")}}>
                  <Text>CONFIRM</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
      </Screen>
    </View>
  )
})

const styles = StyleSheet.create({
  btnNormal: {
    borderRadius: 10,
    height: 30,
    width: 100,
    marginTop: spacing[6],
    color: palette.black,
    backgroundColor: palette.lighterGrey,
    alignSelf: 'center'
  },
  btnPress: {
    borderColor: 'transparent',
    borderWidth: 1,
    textAlign: 'center',
    alignItems: 'center',
    paddingTop: 4,
    fontSize: 17,
    color: palette.black
  },
  full: {
    flex: 1
  },
  mainContainer: {
    backgroundColor: "#f3f3f3", 
    height: Dimensions.get('window').height - 100,
    padding: spacing[4],
    flexDirection: 'row',
    flex: 1
  },
  listTitle: {
    color: color.storybookTextColor,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: spacing[5],
    alignSelf: "center"
  },
  dateText: {
    color: color.storybookTextColor,
    fontWeight: '400',
    fontSize: 18,
    marginTop: spacing[5],
    alignSelf: "center"
  },
  description: {
    color: color.storybookTextColor,
    alignSelf: 'center',
    marginTop: spacing[4],
    marginBottom: -spacing[3],
    opacity: .6
  },
  text: {
    color: color.storybookTextColor,
    marginLeft: 8
  },
  image: {
    height: 144,
    width: 110,
    alignSelf: 'center',
    borderRadius: 8,
    marginTop: spacing[5]
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
    fontSize: 15,
    
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