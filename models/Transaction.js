/** 
*  Transaction model
*  Describes the characteristics of each attribute in a Transaction resource.
*
* @author Sai Sri Dachepalli <dachepallysaisri@nwmissouri.edu>
*
*/

// see <https://mongoosejs.com/> for more information
const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    _id: { type: Number, required: true },
    TransactionID: { type: Number, required: true },
    lineNumber: { type: Number, required: true },
    productID: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 1 }
  })
  
  module.exports = mongoose.model('Transaction', TransactionSchema)