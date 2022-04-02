/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider as PaperProvider, configureFonts, DefaultTheme} from 'react-native-paper';

const font = {
    android: {
        regular: {
          fontFamily: 'sans-serif',
          fontWeight: 'normal',
        },
        medium: {
          fontFamily: 'sans-serif-medium',
          fontWeight: 'normal',
        },
        light: {
          fontFamily: 'sans-serif-light',
          fontWeight: 'normal',
        },
        thin: {
          fontFamily: 'sans-serif-thin',
          fontWeight: 'normal',
        },
    }
};

const theme = {
    ...DefaultTheme,
    fonts: configureFonts(font)
}


export default function Main () {
    return (
        <PaperProvider theme={theme}>
            <App />
        </PaperProvider>
    );
};

AppRegistry.registerComponent(appName, () => Main);