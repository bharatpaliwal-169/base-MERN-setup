import mongoose from 'mongoose';
const authSchema = mongoose.Schema({
  fullName : {type: 'string',required: true},
  email : {type: 'string',required: true},
  password : {type: 'string',required: true},
  id : {type: 'string'}
})
var authTable = mongoose.model('authTable',authSchema);
export default authTable;