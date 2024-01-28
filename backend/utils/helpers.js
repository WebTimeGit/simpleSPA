const bcrypt = require('bcrypt');
const {sign, verify} = require("jsonwebtoken");
const JWTSECRET = 'Practic'

const generateAuthToken = (id) => {
	return sign({_id: id}, JWTSECRET)
}

// Function to extract _id from token
const getUserIdFromToken = (token) => {
	try {
		const decoded = verify(token, JWTSECRET);
		return decoded._id;
	} catch (error) {
		console.error('Error decoding token:', error);
		return null;
	}
};

// Function for hashing the password
const hashPassword = async (password) => {
	const saltRounds = 8; // Number of salt generation rounds
	try {
		return await bcrypt.hash(password, saltRounds);
	} catch (error) {
		console.error('Password hashing error:', error);
		throw error;
	}
}

// Function to check password
const comparePassword = async (password, hash) => {
	try {
		const match = await bcrypt.compare(password, hash);
		return match; // return true if the passwords match, else false
	} catch (error) {
		console.error('Error checking password:', error);
		throw error;
	}
}

module.exports = {hashPassword, comparePassword, generateAuthToken, getUserIdFromToken}