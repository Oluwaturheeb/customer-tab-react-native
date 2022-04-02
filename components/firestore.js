import firestore from '@react-native-firebase/firestore';

export const myTab = firestore().collection('customerTab');
export const otherTab = firestore().collection('otherTab');
export const field = firestore.FieldValue;
export const money = num => {
    let format = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    });

    return format.format(num);
}