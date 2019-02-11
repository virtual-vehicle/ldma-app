module.exports = {
  presets: ["module:metro-react-native-babel-preset", "@babel/preset-flow", "module:react-native-dotenv"],
  plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
  ],
};