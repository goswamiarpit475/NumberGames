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

import * as Font from "expo-font";

import { Audio } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { Button, useTheme } from "react-native-paper";
import ModalPopUp from "./ModalPopUp";
import CustomDialog from "./CustomDialog";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

const NumberItem = ({ maxNumber, playSound, array }) => {
  console.log("in number item");
  console.log(maxNumber, JSON.stringify(array));
  const theme = useTheme();
  const randNumber = Math.floor(Math.random() * maxNumber);
  const listItem = ({ item, index }) => {
    console.log("item.value-" + item.value);
    return (
      <TouchableOpacity
        onPress={() => playSound(item.value + 1)}
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
      data={array}
      renderItem={listItem}
      keyExtractor={(item) => item.key.toString()}
    />
  );
};

const DialogModal = ({ isVisible }) => {
  const [visible, setVisible] = React.useState(isVisible);
  if (visible == true) {
    setTimeout(() => {
      setVisible(false);
      //isVisible = false;
    }, 3000);
  }
  return (
    visible && (
      <CustomDialog
        visible={visible}
        setVisible={setVisible}
        textToShow="Congratulations"
      />
    )
  );
};

export default function NumberQuiz({ navigation }) {
  const [sound, setSound] = React.useState();

  //const [nextNumberToBePlayed, setNextNumberToBePlayed] = React.useState(1);
  const [array, setArray] = React.useState([]);
  const [reload, setReload] = React.useState(true);
  // const [fontsLoaded] = useFonts({
  //   'Mouse-Font': require('./assets/fonts/Mousie.ttf'),
  // });

  const maxNumber = 10;
  var nextNumberToBePlayed = 1;
  var isVisible = false;
  async function playSound(arg) {
    if (isCorrectNumberPlayed(arg)) {
      console.log("playing--" + arg);
      sound[arg - 1].setPositionAsync(0);
      await sound[arg - 1].playAsync();
      if (arg == 10) {
        //alert('Congratulations');
        //setVisible(true);
        isVisible = true;

        //setArray([]);
        //setNextNumberToBePlayed(1);
        nextNumberToBePlayed++;
        setReload(!reload);
      }
    } else {
      console.log("wrong number pressed" + arg);
    }
  }

  function isCorrectNumberPlayed(numberPlayed) {
    if (numberPlayed == nextNumberToBePlayed) {
      //nextNumberToBePlayed++;
      if (nextNumberToBePlayed < 10) nextNumberToBePlayed++; //setNextNumberToBePlayed(nextNumberToBePlayed + 1);
      return true;
    }
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
  }, []);

  return (
    <>
      <DialogModal isVisible={isVisible} />
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
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Rancho_400Regular",
                  fontSize: 60,
                  color: "red",
                }}
              >
                Press 1
              </Text>
            </View>
            <View
              style={{
                flex: 4,
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <NumberItem
                maxNumber={maxNumber}
                playSound={playSound}
                array={array}
              ></NumberItem>
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
