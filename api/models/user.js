const mongoose = require('mongoose');
const {Schema,model}= mongoose;

const userSchema = new Schema({
    Username:{type: 'string', required: true, unique: true, min:5},
    Password:{type: 'string', required: true}
});

const usermodel= model('user',userSchema);

module.exports= usermodel;