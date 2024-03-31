module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src/'],
        alias: {
          app: './src/app',
          screens: './src/screens',
          widgets: './src/widgets',
          features: './src/features',
          entities: './src/entities',
          shared: './src/shared',
          assets: './src/assets',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
