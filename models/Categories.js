const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true
  }
},{collection: 'categories'});



Categories = mongoose.model('Categories', CategoriesSchema);

module.exports = Categories;

// hard code
// const categories = [
//     {
//         id: 1,
//         name: 'Coding'
//     },
//     {
//         id: 2,
//         name: 'backend framework'
//     },
//     {
//         id: 3,
//         name: 'frontend framework'
//     }
// ];

// module.exports = categories;