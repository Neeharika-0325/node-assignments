const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    // Your code goes here
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    posted_at: {
        type: Date,
        default: function() {
            return new Date().toISOString().split('T')[0];
          }
    },
    posted_by: {
        type: String,
        required: true
    }
})

// blogSchema.pre('save', function(next) {
//     if (!this.posted_at) {
//       this.posted_at = new Date().toISOString().split('T')[0];
//     }
//     next();
// });

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;