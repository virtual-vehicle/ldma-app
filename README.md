## Installation

Clone project and do following:

```
yarn
```
After you have installed dependencies, follow instructions:

https://facebook.github.io/react-native/docs/getting-started.html (Build Projects with Native Code)

### PLugins to install (VSCode)

- Flow Language Support
- vscode-flow-ide
- Note: You should set workspace preference to disable default syntax validation from Visual Studio Code: `"javascript.validate.enable": false`.

## Running app

### ios
```
react-native run-ios
```
### android
```
react-native run-android
```
## Testing

We use Jest runner for unit tests, and Detox with Jest runner for E2E mobile testing.

### Jest

For running unit/snapshot tests:
```
yarn test:unit
```
For updating snapshots:
```
yarn test:unit:update
```
### Detox

For running E2E tests locally in debug mode on Android you will need to have installed Android Studio and Android Virtual Device - Nexus 5X API 25.

#### Running debug tests

#### iOS
```
yarn test:ios:debug
```
#### Android (coming soon)

In some cases to run the tests on the android in debug mode you have to run with reset cache. So in first terminal window run:

```
npm start -- --reset-cache
```

And in next terminal window you can then normally run the tests. (In release mode you do not need to run with reset cache)

```
yarn test:android:debug
```
#### Running release tests

#### iOS
```
yarn test:ios:release
```
#### Android (coming soon)
```
yarn test:android:release
```
## Systems

Information about our systems.

### Staging
* Backend:
  * URL: http://ldma.us-east-2.elasticbeanstalk.com/api/v1
* Mobile:
  * Deploys[branch]: develop (coming soon)
  * Distribution: HockeyApp staging (coming soon)
