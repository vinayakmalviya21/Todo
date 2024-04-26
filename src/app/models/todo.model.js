const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    Uid: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxLength: 50,
    },
    description: {
        type: String,
        required: true,
        maxLength: 50,
    },
    status: {
        type: String,
        required: true,
        maxLength: 20,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

module.exports = (mongoose.models.Todo) || (mongoose.model("Todo", todoSchema));
