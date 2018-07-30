import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Home from './home';

import { StackNavigator } from 'react-navigation';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:'846275887477-7tf57grs2t9d2ffh71sakbv8vvsq17hd.apps.googleusercontent.com',
  forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
}).then(() => {
  // you can now call currentUserAsync()
  //getCurrentUser();
});


const AppNavigator = StackNavigator({
  HomeScreen: { screen: Home }
});

const instructions = Platform.select({
    android: 'You will be asked some generic questions in order,\n' +
      'You will get your score in the end',
  });
  

class Login extends Component<{}> {
    constructor(){
      super();
      this.state  = {
          user:{}
      };
  }
  
    signIn = async () => {
      try {
        const user = await GoogleSignin.signIn();
        console.log(user);
        this.setState({ user:user });
        
        this.props.navigation.navigate('HomeScreen', {
            user:user
          });
        console.log('now we can change view and load quiz');
      } catch (error) {
        if (error.code === 'CANCELED') {
          // user cancelled the login flow
          console.log('Flow Cancelled');
        } else {
          // some other error happened
          console.log('error in signing');
        }
      }
    };
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Quiz App
          </Text>
          <Text style={styles.instructions}>
            To get started, you can login with your google account
          </Text>
          <Text style={styles.instructions}>
            {instructions}
          </Text>
          <GoogleSigninButton
      style={{ width: 48, height: 48 }}
      size={GoogleSigninButton.Size.Icon}
      color={GoogleSigninButton.Color.Dark}
      onPress={this.signIn}/>
        </View>
        
      );
    }
  }
  
  export default Login;
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });
  