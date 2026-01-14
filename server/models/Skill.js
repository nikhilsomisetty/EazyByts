const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    proficiency: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    category: {
        type: String,
        required: true,
        enum: ['Frontend', 'Backend', 'Tools', 'Soft Skills']
    },
    icon: {
        type: String, // Storing emoji or icon class string
        default: '🔧'
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
