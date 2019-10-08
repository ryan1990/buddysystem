
// don't see how this will work, so let's not use for now

// login, logout, get user storage item, store key constant
// store email address?
// rely on this module for logged in state?

// THIS IS a react component using AsyncStorage and can take prop of App state to setState!!

import { AsyncStorage, Text, View, ScrollView, StyleSheet } from 'react-native';

let loggedInUserStorageKey = '@loggedInUser';





// create key/value in storage and set state to emailAddress
var loginUser = function(emailAddress) {
	storeUserEmailAddress(emailAddress);
	//this.setState({ loggedInUser: emailAddress });
}

var storeUserEmailAddress = function(emailAddress) {
	AsyncStorage.setItem(loggedInUserStorageKey, emailAddress);
}

var logoutUser = function() {
	removeUserEmailAddressFromStorage();
	//this.setState({ loggedInUser: "" });
}

// remove the key/value pair with key = this.loggedInUserStorageKey from storage
var removeUserEmailAddressFromStorage = function() {
	AsyncStorage.removeItem(loggedInUserStorageKey);
}


// var pattern = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

// var validateEmailAddress = function(emailAddress) {
// 	if (!emailAddress || emailAddress.length>254) {
//     return false;
//   }

// 	var valid = pattern.test(emailAddress);
// 	if(!valid) {
// 		return false;
//   }

// 	var parts = emailAddress.split("@");
// 	if(parts[0].length>64) {
//     return false;
//   }

// 	var domainParts = parts[1].split(".");
// 	if(domainParts.some(function(part) { return part.length>63; })) {
//     return false;
//   }

// 	return true;
// }

// var validateUsesOnlyDigitCharacters = function(input) {
// 	var isNum = /^\d+$/.test(input);
// 	return isNum;
// }

export { loginUser, logoutUser };