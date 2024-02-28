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
          pages: './src/pages',
          widgets: './src/widgets',
          features: './src/features',
          entities: './src/entities',
          shared: './src/shared',
          assets: './src/assets',
          components: './src/components',
          configs: './src/configs',
          constants: './src/constants',
          consts: './src/consts',
          helpers: './src/helpers',
          hooks: './src/hooks',
          json: './src/json',
          services: './src/services',
          slices: './src/slices',
          thunks: './src/thunks',
          utils: './src/utils',
          validations: './src/validations',
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
