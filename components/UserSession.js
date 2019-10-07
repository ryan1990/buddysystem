
// login, logout, get user storage item, store key constant
// store email address?
// rely on this module for logged in state?





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

// export { validateEmailAddress, validateUsesOnlyDigitCharacters };