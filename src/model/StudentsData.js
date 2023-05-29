
const mongoose= require('mongoose');

const StudentSchema = new mongoose.Schema({
    // Your code goes here
    id: {
          type: String,
          required: true,
          unique: true
        },
    name: {
          type: String,
          required: true
        },
    currentClass: {
          type: String,
          required: true
        },
    division: {
          type: String,
          required: true
        }
})


const StudentsData = mongoose.model('students', StudentSchema);

module.exports = StudentsData;
