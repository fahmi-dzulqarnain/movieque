import React, { useEffect } from "react"
import { Dimensions, FlatList, View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, Header, Screen, Text, AutoImage as Image } from "../../components"
import { color, spacing } from "../../theme"
import { useStores, setMovieId } from "../../models"
import { StyleSheet } from "react-native"
import { palette } from "../../theme/palette"
import Icon from 'react-native-vector-icons/FontAwesome';

export const MovieListScreen = observer(function DemoListScreen() {
  const navigation = useNavigation()
  
  const { moviesStore } = useStores()
  const { movies } = moviesStore

  useEffect(() => {
    async function fetchData() {
      await moviesStore.getMovies()
    }

    fetchData()
  }, [])

  return (
    <View testID="MovieListScreen" style={styles.full}>
      <Screen preset="fixed" backgroundColor={palette.orangeDarker}>
        <Header
          headerTx="demoListScreen.title"
          style={styles.header}
          titleStyle={styles.headerTitle} />
        <View style={styles.mainContainer}>
          <Text style={styles.secondTitle}>Trending Today</Text>
          <FlatList
            contentContainerStyle={styles.flatList}
            data={[...movies]}
            keyExtractor={(item) => String(item.movieId)}
            renderItem={({item}) => (
              <View style={styles.listContainer} >
                <View style={{flexDirection: 'row'}}>
                  <Image source={{uri: item.imageUrl}} style={styles.image} />
                  <View>
                    <Text style={styles.listTitle}>
                      {item.title}
                    </Text>
                    <Text style={styles.description}>{item.description.substring(0,140) + '...'}</Text>
                    
                  </View>
                </View>
                <View style={styles.separator}/>
                <View style={styles.listFooter}>
                  <View style={{flexDirection: 'row', marginLeft: 12, flex: 1}}>
                    <Icon name="user" size={16} color={palette.orangeDarker} />
                    <Text text={item.category} style={styles.text}/>
                  </View>
                  <View style={{flexDirection: 'row', marginLeft: 12, flex: 2}}>
                    <Icon name="history" size={16} color={palette.orangeDarker} />
                    <Text text={item.duration.toString() + " menit"} style={styles.text}/>
                  </View>
                  <Button
                      testID="next-screen-button"
                      text="BOOK TICKET" style={styles.button}
                      onPress={ () => {
                        navigation.navigate("chooseTime", { movieId: item.movieId })
                        setMovieId(item.movieId)
                      } } />
                </View>
              </View>
            )}
          />
        </View>
      </Screen>
    </View>
  )
})

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    backgroundColor: 'transparent',
    color: color.storybookTextColor
  },
  mainContainer: {
    backgroundColor: palette.white, 
    height: Dimensions.get('window').height - 100,
    flexDirection: 'column',
    flex: 1
  },
  header: {
    paddingBottom: spacing[5] - 4,
    paddingHorizontal: spacing[4],
    paddingTop: spacing[3],
    backgroundColor: palette.orangeDarker
  },
  headerTitle: {
    fontSize: 15,
    letterSpacing: 1.5,
    lineHeight: 15,
    textAlign: "center",
    marginTop: 10,
    fontWeight: 'bold',
    color: palette.white
  },
  button: {
    borderRadius: 12,
    backgroundColor: palette.orangeDarker,
    fontSize: 17,
    alignContent: 'flex-end',
  },
  full: {
    flex: 1
  },
  flatList: {
    paddingHorizontal: spacing[4],
  },
  listContainer: {
    alignContent: 'center',
    flexDirection: "column",
    padding: spacing[3],
    marginTop: spacing[3],
    marginBottom: spacing[3],
    backgroundColor: palette.white,
    borderRadius: 10,
    shadowColor: palette.black,
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: .3,
    shadowRadius: 10
  },
  listTitle: {
    color: color.storybookTextColor,
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: spacing[2]
  },
  listFooter: {
    flexDirection: 'row',
    marginTop: 10
  },
  description: {
    color: color.storybookTextColor,
    width: Dimensions.get('window').width - 180,
    marginRight: spacing[5],
    marginTop: spacing[1],
    opacity: .5
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
  image: {
    height: 124,
    width: 90,
    borderRadius: 8,
    marginRight: spacing[5]
  },
  separator: {
    backgroundColor: palette.darkGrey,
    marginTop: spacing[3],
    marginBottom: spacing[1],
    height: 1
  },
  icon: {
    width: spacing[2]
  }
});
