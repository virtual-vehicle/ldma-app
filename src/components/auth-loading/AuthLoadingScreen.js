import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Loader from 'ldmaapp/src/components/common/Loader';
import { REQUEST_LOGIN_SUCCESS } from 'ldmaapp/src/actions/actionTypes';
import NavigationService from 'ldmaapp/src/utils/navigation';

export class AuthLoadingScreen extends Component {

  constructor(props) {
    super(props);
    this.bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync = async () => {
    const userString = await AsyncStorage.getItem('user');
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    const user = JSON.parse(userString);
    const { dispatch } = this.props;
    dispatch({ type: REQUEST_LOGIN_SUCCESS, user });

    if (!user) {
      NavigationService.navigate('Login');
    } else {
      NavigationService.navigate('Home');
    }
  };

  render() {
    return (
      <Loader />
    );
  }
}

export default connect()(AuthLoadingScreen);
