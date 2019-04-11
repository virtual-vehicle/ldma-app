import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'
import { AppNavigationContainer } from './AppNavigationContainer';
import NavigationService from 'ldmaapp/src/utils/navigation';
import ldmaApp from 'ldmaapp/src/reducers';

const store = createStore(
  ldmaApp,
  applyMiddleware(
    thunk,
    logger
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

export default App;
