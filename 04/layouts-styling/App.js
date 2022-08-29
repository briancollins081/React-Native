import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import { useCallback, useState } from 'react';
import Colors from './constants/colors';
import GameOverScreen from './screens/GameOverScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [gameRounds, setGameRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf")
  });


  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber)
  }

  const gameOverHandler = (roundsPlayed) => {
    setGameIsOver(true)
    setGameRounds(roundsPlayed)
  }

  const startNewGameHandler = () => {
    setUserNumber(null)
    setGameRounds(0)
    setGameIsOver(false)
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />
  if (userNumber) {
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
  }
  if (gameIsOver) {
    screen = <GameOverScreen rounds={gameRounds} userNumber={userNumber} onStartNewGame={startNewGameHandler} />
  }

  return <LinearGradient
    onLayout={onLayoutRootView}
    colors={[Colors.primary800, Colors.accent500,]}
    style={styles.rootScreen}>
    <ImageBackground
      source={require("./assets/images/background.png")}
      resizeMode="cover"
      style={styles.rootScreen}
      imageStyle={styles.backgroundImage}
    >
      <SafeAreaView style={styles.rootScreen}>
        {screen}
      </SafeAreaView>
    </ImageBackground>
  </LinearGradient>;
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.30
  }
});
