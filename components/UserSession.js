// login, logout, get user storage item, store key constant

// THIS IS a react component using AsyncStorage and can take prop of App state to setState!!

import { AsyncStorage, Text, View, ScrollView, StyleSheet } from 'react-native';

let loggedInUserStorageKey = '@loggedInUser';

// create key/value in storage and set state to username
var loginUser = function(username) {
	storeUsername(username);
	//this.setState({ loggedInUser: username });
}

var storeUsername = function(username) {
	AsyncStorage.setItem(loggedInUserStorageKey, username);
}

var logoutUser = function() {
	removeUsernameFromStorage();
	//this.setState({ loggedInUser: "" });
}

// remove the key/value pair with key = this.loggedInUserStorageKey from storage
var removeUsernameFromStorage = function() {
	AsyncStorage.removeItem(loggedInUserStorageKey);
}

export { loginUser, logoutUser };