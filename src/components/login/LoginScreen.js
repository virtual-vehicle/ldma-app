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

const BUTTON_HEIGHT = 50;
const INPUT_FIELDS_HEIGHT = 66;
const SCREEN_HEIGHT = Dimensions.get('window').height;

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
            source={require('ldmaapp/assets/png/background_white.png')}
          >
            <View style={styles.logoWrapper}>
              <Image
                style={styles.logo}
                source={require('ldmaapp/assets/png/logo_blue.png')}
              />
            </View>
            <View style={styles.titleWrapper}>
              <Text style={{ fontSize: 25, fontStyle: 'italic' }}>Ldma</Text>
            </View>
            <View style={{ marginBottom: SCREEN_HEIGHT > 800 ? '45%' : '30%', width: '88%' }}>
              <View style={{ position: 'relative', borderColor: COLORS.BLUE, borderBottomWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderTopWidth: 2, borderRadius: 5 }}>
                <View style={styles.usernameSection}>
                  <Image
                    source={require('ldmaapp/assets/png/username.png')}
                    style={styles.usernameImage}
                  />
                  <TextInput
                    style={styles.usernameInput}
                    underlineColorAndroid="transparent"
                    placeholder="Username"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={COLORS.LIGHTGREY}
                    value={this.state.username}
                    onChangeText={(text) => this.setState({ username: text })}
                  />
                </View>
                <View style={styles.lineSeparator} />
                <View style={styles.passwordSection}>
                  <Image
                    source={require('ldmaapp/assets/png/password.png')}
                    style={styles.passwordImage}
                  />
                  <TextInput
                    style={styles.passwordInput}
                    secureTextEntry
                    underlineColorAndroid="transparent"
                    placeholder="Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholderTextColor={COLORS.LIGHTGREY}
                    value={this.state.password}
                    onChangeText={(text) => this.setState({ password: text })}

                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={(e) => this.userLogin(e)}
              >
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
              <View style={styles.createForgetSection} />
            </View>
            {loading && <Loader />}
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
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  logoWrapper: {
    marginTop: 65,
    marginBottom: 65,
    zIndex: 100,
    width: 180,
    height: 90,
  },
  logo: {
    width: 180,
    height: 90,
  },
  titleWrapper: {
    marginTop: 10,
    marginBottom: 65,
    zIndex: 100,
  },
  createForgetSection: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 18,
  },
  lineSeparator: {
    borderBottomColor: COLORS.GREY,
    borderBottomWidth: 0.5,
    width: '88%',
    position: 'absolute',
    top: 65,
    left: '6%',
  },
  loginButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.BLUE,
    width: '100%',
    borderRadius: 5,
    height: BUTTON_HEIGHT,
    marginTop: 30,
  },
  usernameSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  usernameImage: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    position: 'absolute',
    left: 25,
    bottom: 16,
    zIndex: 100,
  },
  usernameInput: {
    width: '100%',
    height: INPUT_FIELDS_HEIGHT,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingLeft: 60,
    fontSize: 18,
  },
  passwordSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  passwordImage: {
    margin: 5,
    height: 24,
    width: 24,
    position: 'absolute',
    left: 25,
    bottom: 17,
    zIndex: 100,
  },
  passwordInput: {
    width: '100%',
    height: INPUT_FIELDS_HEIGHT,
    backgroundColor: COLORS.WHITE,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    paddingLeft: 60,
    fontSize: 18,
  },
  loginText: {
    color: COLORS.WHITE,
    fontSize: 20,
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
