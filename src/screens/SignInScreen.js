import React from 'react';
import { View, Button, Alert } from 'react-native';
import { Facebook } from 'expo';
export default class SignInScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // _signInAsync = async () => {
  //   await AsyncStorage.setItem('userToken', 'abc');
  //   this.props.navigation.navigate('App');
  // };

  _signInAsync = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('250801285850865', {
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // TODO: Login to RedPet API
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  render() {
    return (      
      <View>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
      );
  }
}