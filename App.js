import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { AppNavigationContainer } from './AppNavigationContainer';
import NavigationService from 'ldmaapp/src/utils/navigation';
import ldmaApp from 'ldmaapp/src/reducers';

const store = createStore(
  ldmaApp,
  applyMiddleware(
    thunk,
  ),
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigationContainer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
      </Provider>
    );
  }
}

/*
const codePushOptions = {
  installMode: CodePush.InstallMode.IMMEDIATE,
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  updateDialog: true,
};
*/

/* CodePush.getUpdateMetadata().then((update) => {
  if (update) {
    console.log("\n\n\n\n\n\n", update, "hi\n\n\n\n\n")
  } else {
    console.log("\n\n\n\n\n\n none hi\n\n\n\n\n")
  }
});
*/

// export default CodePush(codePushOptions)(App);
export default App;
