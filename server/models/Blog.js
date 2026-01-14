const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String, // Could be HTML or Markdown
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    tags: {
        type: [String]
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
