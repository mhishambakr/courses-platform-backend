const mongoose = require('mongoose');

// Create Schema
// var studentSchema = new mongoose.Schema({ ... }, { collection : 'student' });

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
},{ collection : 'courses' });

let Course = mongoose.model('Course', CourseSchema);

module.exports = Course;



// hard code
// const courses = [
//     {
//         id: 1,
//         name: 'Data Structure',
//         description: 'Data Structure with javascript',
//         points: 100,
//         image: 'public/photos/ds.png',
//         media: 'media'
//     },
//     {
//         id: 2,
//         name: 'Django',
//         description: 'python framework',
//         points: 30,
//         image: 'public/photos/django.png',
//         media: 'media'
//     },
//     {
//         id: 3,
//         name: 'Adonis JS',
//         description: 'JS framework',
//         points: 50,
//         image: 'public/photos/adonis.png',
//         media: 'media'
//     }
// ];

// module.exports = courses;
