/** 
*  Customer model
*  Describes the characteristics of each attribute in a customer resource.
*
* @author Sanjana Baswapuram <s534595@nwmissouri.edu>
*
*/

// see <https://mongoosejs.com/> for more information
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  user_name: { type: String, required: true },
  account_number: { type: Number, required: true, unique: true, default: 555 },
  user_email: { type: String, required: true },
  balance: { type: Number, required: true, default: 999 },
  phone_number: { type: Number, required: false },
  })

module.exports = mongoose.model('User', UserSchema)
