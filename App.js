import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import AppWithNavigationState from './AppNavigator';
import ldmaApp from 'ldmaapp/src/reducers';
import { middleware } from 'ldmaapp/src/utils/redux';
import { API } from 'ldmaapp/src/constants/api';

const client = axios.create({ // all axios can be used, shown in axios documentation
  baseURL: API.BACKEND_URL,
  responseType: 'json',
});

const store = createStore(
  ldmaApp,
  applyMiddleware(
    middleware,
    axiosMiddleware(client),
    thunk,
  ),
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
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
