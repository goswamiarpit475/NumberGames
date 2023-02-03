import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LearnNumbers from './src/screens/numbers/LearnNumbers';
import NumberQuiz from './src/screens/numbers/NumberQuiz';
import CountNumbers from './src/screens/numbers/CountNumbers';
import {HomeScreen} from './src/screens/HomeScreen';
import {  Provider as PaperProvider,MD3LightTheme,Text } from 'react-native-paper';
import { useFonts, Rancho_400Regular } from '@expo-google-fonts/rancho'; 
import * as SplashScreen from 'expo-splash-screen';


const Stack = createNativeStackNavigator();

function App() {
const [appReady,setAppReady]=React.useState(false);
  let [fontsLoaded] = useFonts({
    Rancho_400Regular,
  });
 React.useEffect( () => {
  async function prepare() {
    try {
      // Pre-load fonts, make any API calls you need to do here
      //await Font.loadAsync(Entypo.font);
      // Artificially delay for two seconds to simulate a slow loading
      // experience. Please remove this if you copy and paste the code!
      await new Promise(resolve => setTimeout(resolve, 5000));
    } catch (e) {
      console.warn(e);
    } finally {
      // Tell the application to render
      //setAppIsReady(true);
    }
  }

  prepare();



    if (fontsLoaded) {
      setAppReady(true);
    }
  }, [fontsLoaded]);

  const theme={...MD3LightTheme,colors:{
    ...MD3LightTheme,
    colorArray:[
      ['#ff4da9', '#ffff66'], ['#ee9ca7', '#ffdde1'], ['#36d1dc', '#5b86e5'],
      ['#1cd8d2', '#93edc7'],
      ['#5c258d', '#4389a2'],
      ['#134e5e', '#71b280'],
      ['#2bc0e4', '#eaecc6'], ['#4776e6', '#8e54e9'], ['#ff8008', '#ffc837'], ['#1d976c', '#93f9b9'], ['#eb3349', '#f45c43'], ['#1fa2ff', '#12d8fa', '#a6ffcb'], ['#ff512f', '#f09819']
    ],
  }};
  


   React.useEffect(() => {
     StatusBar.setBackgroundColor('#FF573300'); 
     StatusBar.setTranslucent(true)
    }, []);

  const Loading=()=><Text>Loading</Text>
  return (
    <PaperProvider theme={theme}>    
      <NavigationContainer>
        {appReady?(<Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LearnNumbers" component={LearnNumbers} />
        <Stack.Screen name="NumberQuiz" component={NumberQuiz} />
        <Stack.Screen name="CountNumbers" component={CountNumbers} />
      </Stack.Navigator>):
      <Loading/>

        }
    </NavigationContainer>
    </PaperProvider>

  );
}

export default App;