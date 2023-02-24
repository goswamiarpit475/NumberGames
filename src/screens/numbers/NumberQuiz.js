//import { StatusBar } from 'expo-status-bar';
import * as React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Vibration,
  FlatList,
} from "react-native";

import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { Button, useTheme } from "react-native-paper";
import CustomDialog from "./CustomDialog";
import * as Speech from "expo-speech";

const NumberItem = React.memo(({ data }) => {
  //console.log(data);
  const theme = useTheme();
  const listItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => data.playSound(item.value + 1)}
        style={styles.myCard}
      >
        <LinearGradient
          colors={theme.colors.colorArray[index % 10]}
          style={styles.CircleShape}
        >
          <Text style={styles.numberText}>{item.value + 1}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: "center",
      }}
      numColumns={6}
      data={data.array}
      renderItem={listItem}
      keyExtractor={(item) => item.key.toString()}
    />
  );
});

export default function NumberQuiz({ navigation }) {
  const [sound, setSound] = React.useState();
  const [currentNumber, setCurrentNumber] = React.useState(1);
  const [visible, setVisible] = React.useState(false);
  const [array, setArray] = React.useState([]);
  const [reload, setReload] = React.useState(true);
  const maxNumber = 10;

  const playSound = async (arg) => {
    //console.log(arg);
    //console.log(sound);
    const play = async () => {
      console.log("playing--" + arg);
      const index = arg - 1;
      sound[index].setPositionAsync(0);
      await sound[index].playAsync();
    };
    if (isCorrectNumberPlayed(arg)) {
      await play();
      if (arg == 10) {
        setVisible(true);
        setTimeout(function myStopFunction() {
          setVisible(false);
          setCurrentNumber(1);
          setReload(!reload);
        }, 3000);
      } else {
        setCurrentNumber(currentNumber + 1);
      }
      console.log(`current numbr increment${currentNumber}`);
    } else {
      console.log("wrong number pressed" + arg);
    }
  };

  function isCorrectNumberPlayed(numberPlayed) {
    if (numberPlayed == currentNumber) {
      return true;
    }
    Speech.speak("Press " + currentNumber);
    Vibration.vibrate(100);
    return false;
  }
  React.useEffect(() => {
    var tarray = [];
    for (var i = 0; i < maxNumber; ++i) {
      var tobj = { key: i, value: i };
      tarray.push(tobj);
    }
    var tmp,
      current,
      top = tarray.length;
    if (top)
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = tarray[current];
        tarray[current] = tarray[top];
        tarray[top] = tmp;
      }

    setArray(tarray);
  }, [reload]);

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
  const dataProp = React.useMemo(
    () => ({
      maxNumber: 10,
      array: array,
      playSound: playSound,
    }),
    [array, playSound]
  );
  return (
    <>
      {visible && <CustomDialog />}

      <View
        style={[
          styles.container,
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column",
          },
        ]}
      >
        <ImageBackground
          style={{ flex: 1 }}
          resizeMode="cover"
          source={require("../../assets/images/gif/108109-moving-grass.gif")}
        >
          <Button
            onPress={() => navigation.goBack()}
            style={{ alignSelf: "flex-start" }}
            icon={() => (
              <Image
                source={require("../../assets/images/back-icon.png")}
                style={{ width: 50, height: 50, marginTop: 15 }}
              />
            )}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: "Rancho_400Regular",
                fontSize: 60,
                color: "red",
                alignSelf: "center",
              }}
            >
              Press {currentNumber}
            </Text>

            <View
              style={{
                flex: 4,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <NumberItem data={dataProp} />
            </View>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
  },
  myCard: { margin: 20, alignItems: "center", justifyContent: "center" },
  numberText: {
    fontSize: 50,
    color: "white",
    fontWeight: "900",
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
    borderWidth: 5,
  },
});

//export default Flex;
