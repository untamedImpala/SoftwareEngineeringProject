const mongoose = require("mongoose");
const Joi = require('joi');

const {userSchema} = require('./user');


const feedbackSchema = new mongoose.Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userSchema',
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'orderSchema',
    },
    message: {
        type: String,
        maxlength: 280, // tweet length
        trim: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

function validateFeedback(feedback){
    const schema = Joi.object({
        user: Joi.objectId(),
        order: Joi.objectId(),
        rating : Joi.number().min(1).max(5).required(),
        message: Joi.string().required()
    });

    return schema.validate(feedback);
};

exports.Feedback = Feedback
exports.validateFeedback = validateFeedback
