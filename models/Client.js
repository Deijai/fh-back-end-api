const {Schema, model} = require('mongoose');

const ClientSchema = Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    occupation: {
        type: String,
        required: true,

    },
    isDeleted: {
        type: Boolean,
        default: false
    }

});

ClientSchema.method('toJSON', function(){
    const {__v, _id,...object} = this.toObject();

    object.id = _id

    return object;
});

module.exports = model('Client', ClientSchema);