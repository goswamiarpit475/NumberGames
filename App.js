import * as React from 'react';
import { Image,BackHandler ,View, Text,StyleSheet, StatusBar, TouchableOpacity, FlatList, TouchableHighlight, ImageBackground, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LearnNumbers from './src/screens/numbers/LearnNumbers';
import NumberQuiz from './src/screens/numbers/NumberQuiz';
import CountNumbers from './src/screens/numbers/CountNumbers';
import { Button, Provider as PaperProvider,MD3LightTheme } from 'react-native-paper';
import { useFonts, Rancho_400Regular } from '@expo-google-fonts/rancho'; 




function HomeScreen({navigation}) {

  const ItemMenu=({item})=>{
    return(
      <ImageBackground style={{height:200,width:200,justifyContent:'center',alignItems:'center',alignSelf:'center',marginHorizontal:10}} imageStyle= 
      {{opacity:0.8}} resizeMode="contain" source={require('./src/assets/images/cloud/cloud-red.png')}>
      <TouchableOpacity onPress={()=>{navigation.navigate(item.navigationPath)}}>
           <Text style={styles.menuText}>{item.title}</Text>
        </TouchableOpacity>
      </ImageBackground>
    )
  }



  return (
    <>
  
  <ImageBackground style={{flex:1}} resizeMode="cover" source={require('./src/assets/images/gif/under-water.gif')}>
  <Button onPress={()=>BackHandler.exitApp()} style={{alignSelf:"flex-start"}}
        icon={({ size, color }) => (
          <Image
            source={require('./src/assets/images/back-icon.png')}
            style={{ width: 50, height: 50,marginTop:15 }}
          />
        )}
        />
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <FlatList horizontal 
        data={[{title: 'Learn Number', key: 'item1',navigationPath:'LearnNumbers'},
        {title: 'Number Quiz', key: 'item2',navigationPath:'NumberQuiz'},
        {title: 'Count Numbers', key: 'item4',navigationPath:'CountNumbers'}]}
        renderItem={({item}) => <ItemMenu item={item} />}
      />
    </View>
    <StatusBar style='auto' />
    </ImageBackground>
    </>
  );
}
{/* <TouchableOpacity onPress={()=>{navigation.navigate('LearnNumbers')}} style={{height:200,width:150,borderRadius:50,backgroundColor:'#EAA338',marginStart:10,justifyContent:'center',alignItems:'center',                    
                    }}>
         <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>Learn Numbers</Text>
      </TouchableOpacity> */}

const Stack = createNativeStackNavigator();

function App() {

  let [fontsLoaded] = useFonts({
    Rancho_400Regular,
  });
  /*const theme={...MD3LightTheme,colors:{
    ...MD3LightTheme,
    colorArray:[
      ['#ff4da9', '#ffff66'], ['#ee9ca7', '#ffdde1'], ['#36d1dc', '#5b86e5'],
      ['#1cd8d2', '#93edc7'],
      ['#5c258d', '#4389a2'],
      ['#134e5e', '#71b280'],
      ['#2bc0e4', '#eaecc6'], ['#4776e6', '#8e54e9'], ['#ff8008', '#ffc837'], ['#1d976c', '#93f9b9'], ['#eb3349', '#f45c43'], ['#1fa2ff', '#12d8fa', '#a6ffcb'], ['#ff512f', '#f09819']
    ],
  }}*/
  


   React.useEffect(() => {
     StatusBar.setBackgroundColor('#FF573300'); 
     StatusBar.setTranslucent(true)
    }, []);

  
  return fontsLoaded?(
    <PaperProvider>    
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LearnNumbers" component={LearnNumbers} />
        <Stack.Screen name="NumberQuiz" component={NumberQuiz} />
        <Stack.Screen name="CountNumbers" component={CountNumbers} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>

  ):null;
}
const styles = StyleSheet.create({
  menuText: {
    fontSize: 23, color: 'yellow', fontWeight: 'bold',fontFamily:'serif',
    flexWrap: 'wrap'
  },
});
export default App;