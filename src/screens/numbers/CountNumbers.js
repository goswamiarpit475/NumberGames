//import { StatusBar } from 'expo-status-bar';
import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";

import * as Font from "expo-font";

import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { Button, useTheme } from "react-native-paper";
import * as Speech from "expo-speech";

export default function CountNumbers({ navigation }) {
  const [sound, setSound] = React.useState();
  const [numberPressed, setNumberPressed] = React.useState(1);
  const theme = useTheme();
  // const [fontsLoaded] = useFonts({
  //   'Mouse-Font': require('./assets/fonts/Mousie.ttf'),
  // });
  const colorArray = theme.colors.colorArray;
  const maxNumber = 10;
  //var numberPressed=0;
  async function playSound(arg) {
    await sound[arg - 1].playAsync();
    sound[arg - 1].setPositionAsync(0);
    setNumberPressed(arg);
    console.log(numberPressed);
  }
  async function playSound1(arg) {
    var x = await Speech.getAvailableVoicesAsync();
    x.forEach((element) => {
      //console.log(element);
    });
    console.log(x[0]);
    await Speech.speak(arg.toString(), { voice: "hi-in-x-hia-network" });
    setNumberPressed(arg);
    console.log(numberPressed);
  }
  React.useEffect(() => {
    const loadFiles = async () => {
      console.log("loading Sound");
      const { sound: sound1 } = await Audio.Sound.createAsync(
        require("../../assets/voices/number_voice/1.mp3")
      );
      const { sound: sound2 } = await Audio.Sound.createAsync(
        require("../../assets/voices/number_voice/2.mp3")
      );
      const { sound: sound3 } = await Audio.Sound.createAsync(
        require("../../assets/voices/number_voice/3.mp3")
      );
      const { sound: sound4 } = await Audio.Sound.createAsync(
        require("../../assets/voices/number_voice/4.mp3")
      );
      const { sound: sound5 } = await Audio.Sound.createAsync(
        require("../../assets/voices/number_voice/5.mp3")
      );
      const { sound: sound6 } = await Audio.Sound.createAsync(
        require("../../assets/voices/number_voice/6.mp3")
      );
      const { sound: sound7 } = await Audio.Sound.createAsync(
        require("../../assets/voices/number_voice/7.mp3")
      );
      const { sound: sound8 } = await Audio.Sound.createAsync(
        require("../../assets/voices/number_voice/8.mp3")
      );
      const { sound: sound9 } = await Audio.Sound.createAsync(
        require("../../assets/voices/number_voice/9.mp3")
      );
      const { sound: sound10 } = await Audio.Sound.createAsync(
        require("../../assets/voices/number_voice/10.mp3")
      );
      //setSound({ s1: sound1, s2: sound2, s3: sound3, s4: sound4, s5: sound5, s6: sound6, s7: sound7, s8: sound8, s9: sound9, s10: sound10 });
      setSound([
        sound1,
        sound2,
        sound3,
        sound4,
        sound5,
        sound6,
        sound7,
        sound8,
        sound9,
        sound10,
      ]);
    };
    loadFiles();
  }, []);

  React.useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound[0].unloadAsync();
          sound[1].unloadAsync();
          sound[2].unloadAsync();
          sound[3].unloadAsync();
          sound[4].unloadAsync();
          sound[5].unloadAsync();
          sound[6].unloadAsync();
          sound[7].unloadAsync();
          sound[8].unloadAsync();
          sound[9].unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <>
      <LinearGradient
        colors={colorArray[(numberPressed - 1) % 12]}
        style={{ flex: 1 }}
      >
        <View
          style={[
            styles.container,
            {
              // Try setting `flexDirection` to `"row"`.
              flexDirection: "column",
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Button
              onPress={() => navigation.goBack()}
              style={{ alignSelf: "flex-start" }}
              icon={({ size, color }) => (
                <Image
                  source={require("../../assets/images/back-icon.png")}
                  style={{ width: 50, height: 50, marginTop: 15 }}
                />
              )}
            />

            <View style={{ flex: 3, flexDirection: "row" }}>
              <View style={{ flex: 2 }}>
                <Text style={styles.bigNumberText}>{numberPressed}</Text>
              </View>
              <View
                style={{
                  flex: 3,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                {[...Array(numberPressed)].map((x, i) => (
                  <Image
                    style={{ height: 100, width: 100 }}
                    source={require("../../assets/images/numbers/duck-removebg-preview.png")}
                  />
                ))}
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <ScrollView
                horizontal
                style={{
                  flex: 4,
                  flexDirection: "row",
                  alignContent: "center",
                }}
              >
                {[...Array(maxNumber)].map((x, i) => (
                  <TouchableOpacity
                    onPress={() => playSound(i + 1)}
                    style={styles.myCard}
                  >
                    <LinearGradient
                      colors={colorArray[i % 12]}
                      style={styles.CircleShape}
                    >
                      <Text style={styles.numberText}>{i + 1}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
  },
  myCard: { margin: 10, alignItems: "center", justifyContent: "center" },
  numberText: {
    fontSize: 50,
    color: "white",
    fontWeight: "900",
  },
  bigNumberText: {
    fontSize: 200,
    color: "white",
    fontWeight: "900",
    alignSelf: "center",
  },
  //grad:{backgroundImage: linearGradient('red', 'yellow')},
  tinyLogo: {
    width: 100,
    height: 100,
  },
  CircleShape: {
    width: 80,
    height: 80,
    borderRadius: 80 / 2,
    backgroundColor: "#FF9800",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
  },
});

//export default Flex;
