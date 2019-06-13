import React, { Component } from 'react';
import {
  View,
  Platform,
  ImageBackground,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { COLORS } from 'ldmaapp/src/constants/colors';
import { closeInvalidCredentialsModal } from 'ldmaapp/src/actions/uiActions';
import { login } from 'ldmaapp/src/actions/userActions';
import ModalSimple from 'ldmaapp/src/components/common/ModalSimple';
import Loader from 'ldmaapp/src/components/common/Loader';
/* Config/Constants
============================================================================= */

/* eslint-disable global-require */

const BUTTON_HEIGHT = 55;
const INPUT_FIELDS_HEIGHT = 58;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

type Props = {
  dispatch: any,
  navigation: any,
  login: any,
  loading: boolean,
  invalidCredentialsModalOpen: boolean,
  closeInvalidCredentialsModal: any,
};

type State = {
  username: String,
  password: String,
};

export class LoginScreen extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  userLogin(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { login } = this.props;
    if (username && password) {
      login(username, password);
    }
  }

  render() {
    const {
      closeInvalidCredentialsModal,
      invalidCredentialsModalOpen,
      loading,
    } = this.props;

    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null} enabled>
        <View style={styles.container}>
          <ImageBackground
            style={styles.backgroundImage}
            source={require('ldmaapp/assets/png/bg.png')}
          >
            <View style={styles.markWrapper}>
              <Image
                style={styles.mark}
                source={require('ldmaapp/assets/png/mark.png')}
              />
            </View>
            <View style={{ alignItems: 'center', marginTop: 0.153 * SCREEN_HEIGHT }}>
              <View style={{ position: 'relative' }}>
                <View style={styles.usernameSection}>
                  <Image
                    source={require('ldmaapp/assets/png/username.png')}
                    style={styles.usernameImage}
                  />
                  <Text style={{ position: 'absolute', color: COLORS.WHITE, fontSize: 10, lineHeight: 10, letterSpacing: 1, left: 60, top: 0 }}>
                    USERNAME
                  </Text>
                  <TextInput
                    style={styles.usernameInput}
                    underlineColorAndroid="transparent"
                    placeholder="Enter username"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                  />
                </View>
                <View>
                  <Image
                    source={require('ldmaapp/assets/png/line.png')}
                    style={styles.lineImage}
                  />
                </View>
                <View style={styles.passwordSection}>
                  <Image
                    source={require('ldmaapp/assets/png/password.png')}
                    style={styles.passwordImage}
                  />
                  <Text style={{ position: 'absolute', color: COLORS.WHITE, fontSize: 10, lineHeight: 10, letterSpacing: 1, left: 60, top: 0 }}>
                    PASSWORD
                  </Text>
                  <TextInput
                    style={styles.passwordInput}
                    secureTextEntry
                    underlineColorAndroid="transparent"
                    placeholder="••••••••"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={COLORS.LIGHTGREY}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}
                  />
                </View>
                <Text style={{ position: 'absolute', color: 'rgba(255, 255, 255, 0.5)', fontSize: 13, lineHeight: 13, letterSpacing: 0, right: '7.5%', bottom: 20 }}>
                  Help
                </Text>
                <View>
                <Image
                  source={require('ldmaapp/assets/png/line.png')}
                  style={styles.lineImage}
                />
              </View>
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={(e) => this.userLogin(e)}
              >
                <Text style={styles.loginText}>Sign In</Text>
              </TouchableOpacity>
              <View style={styles.createForgetSection} />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: 10, lineHeight: 10, letterSpacing: 1 }}>DON’T HAVE AN ACCOUNT?</Text>
              <Text style={{ color: COLORS.WHITE, fontSize: 10, lineHeight: 10, letterSpacing: 1, paddingLeft: 7.5 }}>SIGN UP</Text>
            </View>
            {loading && <Loader white />}
            <ModalSimple
              isVisible={invalidCredentialsModalOpen}
              onPress={closeInvalidCredentialsModal}
              headline={`Invalid Username or Password.\nPlease Try Again.`}
            />
          </ImageBackground>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    height: '100%',
  },
  backgroundImage: {
    flex: 1,
    alignItems: 'center',
  },
  markWrapper: {
    marginTop: SCREEN_HEIGHT * .17,
    zIndex: 100,
    width: 150,
    height: 150,
  },
  mark: {
    width: 150,
    height: 150,
  },
  createForgetSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 18,
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 0.84 * SCREEN_WIDTH,
    borderRadius: 50,
    height: BUTTON_HEIGHT,
    marginTop: 40,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  usernameSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginLeft: '7.5%',
    marginRight: '7.5%',
  },
  usernameImage: {
    padding: 10,
    margin: 5,
    height: 22,
    width: 22,
    position: 'absolute',
    top: 0,
    zIndex: 100,
    left: 0,
  },
  lineImage: {
    width: '100%',
    zIndex: 200,
    height: 1,
  },
  usernameInput: {
    width: '100%',
    height: INPUT_FIELDS_HEIGHT,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingLeft: 60,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  passwordSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginLeft: '7.5%',
    marginRight: '7.5%',
    marginTop: 20,
  },
  passwordImage: {
    margin: 5,
    height: 23,
    width: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  passwordInput: {
    width: '100%',
    height: INPUT_FIELDS_HEIGHT,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingLeft: 60,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  loginText: {
    color: COLORS.WHITE,
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
  },
});

const mapStateToProps = (state) =>
  ({
    invalidCredentialsModalOpen: state.ui.invalidCredentialsModalOpen,
    loading: state.loading,
  });

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
    closeInvalidCredentialsModal,
    login,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
