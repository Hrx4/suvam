 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 const blogSchema = new Schema({
     title: {
         type: String,
         required: true,
     },
     content: {
         type: String,
         required: true,
     },
     blogType: {
         type: String,
         enum: ['fictional', 'non-fictional'],
     },
    
     image: {
         type: String,
     },
 });

 // Export the model
 module.exports = mongoose.model('blog', blogSchema);

