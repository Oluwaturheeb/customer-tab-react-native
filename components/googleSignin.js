import React, {useState} from 'react';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
    webClientId: '515730826407-3qa3d31d1lags548gkfr9jlpf1no71qa.apps.googleusercontent.com',
    offline: true,
});

const signin = async () => {
    try{
        await GoogleSignin.hasPlayServices();
        let status = await GoogleSignin.isSignedIn(),
        user;
        if (status) user = await GoogleSignin.getCurrentUser();
        else user = await GoogleSignin.signIn();
        // return the user
        return user;
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            return 'Signin cancelled!';
        } else if (error.code === statusCodes.IN_PROGRESS) {
            return 'Please wait while connecting to google';
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            return 'GooglePlay Services not available';
        } else {
            return 'Unknown error occured!'
        }
    }
};

export default signin;