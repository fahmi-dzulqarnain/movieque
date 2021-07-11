import * as Font from "expo-font"

export const initFonts = async () => {
  // Refer to ./assets/fonts/custom-fonts.md for instructions.
  // ...
  // Welcome back! Just uncomment this and replace/append with your font file names!
  // ⬇
  await Font.loadAsync({
    QuicksandRegular: require("./Quicksand-Regular.ttf"),
    "Quicksand-Regular": require("./Quicksand-Regular.ttf"),

    QuicksandMedium: require("./Quicksand-Medium.ttf"),
    "Quicksand-Medium": require("./Quicksand-Medium.ttf"),

    QuicksandSemiBold: require("./Quicksand-SemiBold.ttf"),
    "Quicksand-SemiBold": require("./Quicksand-SemiBold.ttf"),

    QuicksandBold: require("./Quicksand-Bold.ttf"),
    "Quicksand-Bold": require("./Quicksand-Bold.ttf"),
  })
}
