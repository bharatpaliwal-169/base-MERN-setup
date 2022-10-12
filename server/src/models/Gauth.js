import mongoose from 'mongoose';
const GauthSchema = mongoose.Schema({
  email : {type: 'string',required: true}
});
var Guser = mongoose.model('Guser',GauthSchema);
export default Guser;