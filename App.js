//import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { TouchableOpacity, StatusBar, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

import * as Font from 'expo-font';

import { Audio } from 'expo-av';
import { Avatar } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
export default function App() {
  const [sound, setSound] = React.useState();
  // const [fontsLoaded] = useFonts({
  //   'Mouse-Font': require('./assets/fonts/Mousie.ttf'),
  // });
  const colorArray = [
    ['#ff4da9', '#ffff66'], ['#ee9ca7', '#ffdde1'], ['#36d1dc', '#5b86e5'],
    ['#1cd8d2', '#93edc7'],
    ['#5c258d', '#4389a2'],
    ['#134e5e', '#71b280'],
    ['#2bc0e4', '#eaecc6'], ['#4776e6', '#8e54e9'], ['#ff8008', '#ffc837'], ['#1d976c', '#93f9b9'], ['#eb3349', '#f45c43'], ['#1fa2ff', '#12d8fa', '#a6ffcb'], ['#ff512f', '#f09819']
  ];
  const maxNumber = 20;
  async function playSound(arg) {
    console.log('Loading Sound');

    console.log('Playing Sound');
    if (arg == 1) {
      await sound.s1.playAsync();
    }
    switch (arg) {

      case 1:
        sound.s1.setPositionAsync(0);
        await sound.s1.playAsync();
        break;
      case 2:
        sound.s2.setPositionAsync(0);
        await sound.s2.playAsync();
        break;
      case 3:
        sound.s3.setPositionAsync(0);
        await sound.s3.playAsync();
        break; case 4:
        sound.s4.setPositionAsync(0);
        await sound.s4.playAsync();
        break; case 5:
        sound.s5.setPositionAsync(0);
        await sound.s5.playAsync();
        break; case 6:
        sound.s6.setPositionAsync(0);
        await sound.s6.playAsync();
        break; case 7:
        sound.s7.setPositionAsync(0);
        await sound.s7.playAsync();
        break; case 8:
        sound.s8.setPositionAsync(0);
        await sound.s8.playAsync();
        break; case 9:
        sound.s9.setPositionAsync(0);
        await sound.s9.playAsync();
        break; case 10:
        sound.s10.setPositionAsync(0);
        await sound.s10.playAsync();
        break;
      default:
        break;
    }

  }
  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        //sound.s1.unloadAsync();
      }
      : undefined;
  }, [sound]);
  React.useEffect(() => {
    const loadFiles = async () => {
      const { sound: sound1 } = await Audio.Sound.createAsync(require('./assets/voices/number_voice/1.mp3'));
      const { sound: sound2 } = await Audio.Sound.createAsync(require('./assets/voices/number_voice/2.mp3'));
      const { sound: sound3 } = await Audio.Sound.createAsync(require('./assets/voices/number_voice/3.mp3'));
      const { sound: sound4 } = await Audio.Sound.createAsync(require('./assets/voices/number_voice/4.mp3'));
      const { sound: sound5 } = await Audio.Sound.createAsync(require('./assets/voices/number_voice/5.mp3'));
      const { sound: sound6 } = await Audio.Sound.createAsync(require('./assets/voices/number_voice/6.mp3'));
      const { sound: sound7 } = await Audio.Sound.createAsync(require('./assets/voices/number_voice/7.mp3'));
      const { sound: sound8 } = await Audio.Sound.createAsync(require('./assets/voices/number_voice/8.mp3'));
      const { sound: sound9 } = await Audio.Sound.createAsync(require('./assets/voices/number_voice/9.mp3'));
      const { sound: sound10 } = await Audio.Sound.createAsync(require('./assets/voices/number_voice/10.mp3'));
      setSound({ s1: sound1, s2: sound2, s3: sound3, s4: sound4, s5: sound5, s6: sound6, s7: sound7, s8: sound8, s9: sound9, s10: sound10 });
    }
    loadFiles();

  }, []);

  const loadVoice = (props) => {
    alert(props);
    //\assets\voices
  }
  return (
    <>
      <View
        style={[
          styles.container,
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: 'column',
          },
        ]}>

        <ImageBackground resizeMode="cover" source={require('./assets/images/gif/108109-moving-grass.gif')} 
        style={{ flex: 4, flexDirection: 'row', backgroundColor: '#ccffff', flexWrap: 'wrap', justifyContent: 'center',alignContent:'center' }}>

          {[...Array(20)].map((x, i) =>
            <TouchableOpacity onPress={() => playSound(i + 1)} style={styles.myCard}>
              <LinearGradient colors={colorArray[i%12]} style={styles.CircleShape}>
                <Text style={styles.numberText}>{i + 1}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          )}


        </ImageBackground>

        <StatusBar style='auto' />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
  },
  myCard: { margin: 10, alignItems: 'center', justifyContent: 'center' },
  numberText: {
    fontSize: 50, color: 'white', fontWeight: '900'
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
    backgroundColor: '#FF9800',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5
  },
});

//export default Flex;
