import * as React from 'react';
import { ImageBackground, View } from 'react-native';
import { Button, Dialog, Portal, Provider, Text } from 'react-native-paper';

const CustomDialog = ({visible,setVisible,textToShow}) => {

  return (
      <Portal>         
        <ImageBackground style={{flex:1,opacity:1}} resizeMode="cover" source={require('../../assets/images/gif/BD473hhsp0.gif')}>
        </ImageBackground>
      </Portal>
  );
};

export default CustomDialog;