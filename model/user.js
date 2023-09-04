const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=Schema({
    iss: String,
    azp: String,
    aud: String,
    sub: {
        type: String,
        required: true
    },
    email: String,
    email_verified: Boolean,
    nbf: Number,
    name: {
        type: String,
        required: true
    },
    picture: String,
    given_name: String,
    family_name: String,
    locale: String,
    iat: Number,
    exp: Number,
    jti: String
})

const Users=mongoose.model('users', userSchema);
module.exports.Users=Users;