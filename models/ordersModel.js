const mongoose = require('mongoose');

const OrdersSchema = mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  content: { type: String, required: true}
});

OrdersSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
OrdersSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Order', OrdersSchema);
