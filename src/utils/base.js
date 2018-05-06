import Rebase from 're-base';
import firebase from 'firebase';

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCPqnzCv8fADrFi7HHc94w83iLpJrwC1BQ',
  authDomain: 'foodmarket-d4cb5.firebaseapp.com',
  databaseURL: 'https://foodmarket-d4cb5.firebaseio.com'
});

const base = Rebase.createClass(firebaseApp.database());

export default base;
