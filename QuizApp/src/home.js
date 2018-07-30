import React, { Component } from 'react';
import { View, Text, Button,Image,StyleSheet } from 'react-native';
import profile from '../assets/default-profile-picture.jpg';

export class Home extends Component {
  constructor(){
        super();
        this.photo =  '';
    }
    render() {
        const { navigation } = this.props;
        const user = navigation.getParam('user');
        this.photo = user.photo;
        return (
      <View>
          <Image source = {{uri:this.photo || profile}} style = {styles.profile} />
        <Text>This is Home screen</Text>
        <Button onPress={() => this.props.navigation.navigate('QuizScreen')} title="Quiz"/>
      </View>
    )
  }
};

export default Home;

const styles = StyleSheet.create({
    profile: {
        width:100,
        height:100
    },
   
  });
  