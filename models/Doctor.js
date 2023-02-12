const {Schema, model} = require('mongoose');

const DoctorSchema = Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospitals:[ {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true,
    }]
});

DoctorSchema.method('toJSON', function(){
    const {__v,...object} = this.toObject();
    return object;
});

module.exports = model('Doctor', DoctorSchema);