const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  claimed_points: {
    type: Number,
    required: true
  },
  unclaimed_points: {
    type: Number,
    required: true
  },
  is_admin: {
    type: Boolean,
    required: true
  },
  is_disabled: {
    type: Boolean,
    required: true
  }
},{collection: 'users'});



Users = mongoose.model('Users', UsersSchema);

module.exports = Users;

// hard code
// const users = [
//     {
//         id: 1,
//         name: 'Mohamed Hisham',
//         email: 'mohisham@gmail.com',
//         password: '123',
//         claimed_points: 100,
//         unclaimed_points: 30,
//         is_admin: 0,
//         is_disabled: 0
//     },
//     {
//         id: 2,
//         name: 'Hassan Ali',
//         email: 'hassan@gmail.com',
//         password: '123',
//         claimed_points: 100,
//         unclaimed_points: 30,
//         is_admin: 0,
//         is_disabled: 0
//     },
//     {
//         id: 3,
//         name: 'Youssef Hisham',
//         email: 'jo@gmail.com',
//         password: '123',
//         claimed_points: 100,
//         unclaimed_points: 30,
//         is_admin: 0,
//         is_disabled: 0
//     }
// ];

// module.exports = users;