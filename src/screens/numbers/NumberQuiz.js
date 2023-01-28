//import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { TouchableOpacity,StyleSheet, Text, View, Image, ImageBackground } from 'react-native';

import * as Font from 'expo-font';

import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import ModalPopUp from './ModalPopUp';
import CustomDialog from './CustomDialog';

export default function NumberQuiz({navigation}) {
  const [sound, setSound] = React.useState();
  const [visible, setVisible] = React.useState(visible);
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
  const maxNumber = 10;
 var  nextNumberToBePlayed=1;

  async function playSound(arg) {
    if(isCorrectNumberPlayed(arg)){
        await sound[arg-1].playAsync();
        sound[arg-1].setPositionAsync(0);
        if(arg==10){
          //alert('Congratulations');
          setVisible(true)
          setTimeout(() => {
            setVisible(false);
                   }, 3000);
        }
    }
    else{
      console.log('wrong number pressed'+arg);
    }
  }

  function isCorrectNumberPlayed(numberPlayed){
    if(numberPlayed==nextNumberToBePlayed)
    {
      nextNumberToBePlayed++;
      return true;
    }
    return false;

  }
  const NumberItem=({})=>{
    const randNumber=Math.floor(Math.random() * maxNumber);
    for (var array=[],i=0;i<maxNumber;++i) array[i]=i;
    var tmp, current, top = array.length;
    if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
    return(

        array.map((x, i) =>
          <TouchableOpacity onPress={() => playSound(x+ 1)} style={styles.myCard}>
            <LinearGradient colors={colorArray[i%12]} style={styles.CircleShape}>
              <Text style={styles.numberText}>{(x+ 1)}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          )
    )
  }
  React.useEffect(() => {
    const loadFiles = async () => {
      console.log('loading Sound');
      const { sound: sound1 } = await Audio.Sound.createAsync(require('../../assets/voices/number_voice/1.mp3'));
      const { sound: sound2 } = await Audio.Sound.createAsync(require('../../assets/voices/number_voice/2.mp3'));
      const { sound: sound3 } = await Audio.Sound.createAsync(require('../../assets/voices/number_voice/3.mp3'));
      const { sound: sound4 } = await Audio.Sound.createAsync(require('../../assets/voices/number_voice/4.mp3'));
      const { sound: sound5 } = await Audio.Sound.createAsync(require('../../assets/voices/number_voice/5.mp3'));
      const { sound: sound6 } = await Audio.Sound.createAsync(require('../../assets/voices/number_voice/6.mp3'));
      const { sound: sound7 } = await Audio.Sound.createAsync(require('../../assets/voices/number_voice/7.mp3'));
      const { sound: sound8 } = await Audio.Sound.createAsync(require('../../assets/voices/number_voice/8.mp3'));
      const { sound: sound9 } = await Audio.Sound.createAsync(require('../../assets/voices/number_voice/9.mp3'));
      const { sound: sound10 } = await Audio.Sound.createAsync(require('../../assets/voices/number_voice/10.mp3'));
      //setSound({ s1: sound1, s2: sound2, s3: sound3, s4: sound4, s5: sound5, s6: sound6, s7: sound7, s8: sound8, s9: sound9, s10: sound10 });
    setSound([sound1, sound2, sound3, sound4, sound5, sound6, sound7, sound8, sound9,sound10 ]);
    
    }
    loadFiles();
    
  }, []);

  React.useEffect(() => {
    return  sound?() => {
          console.log('Unloading Sound');
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
        }:undefined
  }, [sound]);

  return (
    <>{//visible&&<ModalPopUp visible={visible} setVisible={setVisible}/>
    }
      {visible && 
      <CustomDialog visible={visible} setVisible={setVisible} textToShow="Congratulations"/>
      }
      <View
        style={[
          styles.container,
          {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: 'column',
          },
        ]}>
        <ImageBackground style={{flex:1}} resizeMode="cover" source={require('../../assets/images/gif/108109-moving-grass.gif')}>
        <Button onPress={()=>navigation.goBack()} style={{alignSelf:"flex-start"}}
        icon={({ size, color }) => (
          <Image
            source={require('../../assets/images/back-icon.png')}
            style={{ width: 50, height: 50,marginTop:15 }}
          />
        )}
        />
        
        <View style={{ flex: 1 }}>
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}><Text style={{fontFamily:'Rancho_400Regular',fontSize:40,color:'red'}}>Press In Sequence</Text></View>
          <View style={{flex:4,flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',alignContent:'center'}}>
            <NumberItem></NumberItem>
          </View>
        </View>

        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 20,
  },
  myCard: { margin: 20, alignItems: 'center', justifyContent: 'center' },
  numberText: {
    fontSize: 50, color: 'white', fontWeight: '900',
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
