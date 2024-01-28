const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const registrationSchema = new mongoose.Schema({
	time: { type: String, default: Date.now },
	username: { type: String, required: true },
	email: { type: String, required: false, unique: true },
	password: { type: String, required: true },
});

registrationSchema.pre('save', function(next) {
	if (!this.isModified('password')) return next()
	this.password = bcrypt.hashSync(this.password, 8)
	next();
})


const authRegistration = mongoose.model('registration', registrationSchema);

module.exports = { authRegistration }