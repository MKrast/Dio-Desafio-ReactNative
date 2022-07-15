import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Image, TouchableOpacity, Alert} from 'react-native'
import imageOn from './assets/icons/eco-light.png';
import imageOff from './assets/icons/eco-light-off.png';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {
  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    //Liga flash do celular
    Torch.switchState(toggle);
    //Alert.alert('Montou o componente');
  },[toggle]);

  useEffect(() => {
    /**
     * Quando o celular for chacoalhado, mudaremos o toggle
     */
    const subscription = RNShake.addListener(() => {
      handleChangeToggle();
    });

    //Essa função vai ser chamada quando o componente for desmontado.
    return () => subscription.remove();
  },[]);

  //if toggle return light
  return (
    <View style={toggle ? style.containerLight : style.container}> 
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          //Aqui também poderia ser usado o seguinte código para apresentar a imagem.
          //<Image source={require('./assets/icons/eco-light-off.png')}>
          source={toggle ? imageOn : imageOff}
        />
        <Image
          style={style.dioLogo}
          source={toggle 
            ? require('./assets/icons/logo-dio.png') 
            : require('./assets/icons/logo-dio-white.png')
          }
        />
      </TouchableOpacity>
    </View>
  );
}

export default App;

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight:{
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightingOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },
  lightingOff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  dioLogo:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },
});