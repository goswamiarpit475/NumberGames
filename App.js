import * as React from 'react';
import { View, Text,StyleSheet, StatusBar, TouchableOpacity, FlatList, TouchableHighlight, ImageBackground, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LearnNumbers from './src/screens/numbers/LearnNumbers';
import NumberQuiz from './src/screens/numbers/NumberQuiz';
import { Button } from 'react-native-paper';





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
    
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <FlatList horizontal 
        data={[{title: 'Learn Number', key: 'item1',navigationPath:'LearnNumbers'},
        {title: 'Number Quiz', key: 'item2',navigationPath:'NumberQuiz'}]}
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
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LearnNumbers" component={LearnNumbers} />
        <Stack.Screen name="NumberQuiz" component={NumberQuiz} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  menuText: {
    fontSize: 23, color: 'yellow', fontWeight: 'bold',fontFamily:'serif',
    flexWrap: 'wrap'
  },
});
export default App;