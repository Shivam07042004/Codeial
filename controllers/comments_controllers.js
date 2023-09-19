const Comment = require('../models/comment');
const Post = require('../models/post');

module.exports.create = function(request, response) {
  Post.findById(request.body.post)
    .then( (post) => {
      if (post) {
        Comment.create({
          content: request.body.content,
          post: request.body.post,
          user: request.user._id
        })
        .then( (comment) => {
          console.log('comment created');
          post.comments.push(comment);
          post.save();
          response.redirect('/');
        })
        .catch( (error) => {
          console.log('error in creating comment', error);
          response.redirect('/');
        });
      }
    })
    .catch( (error) =>  {
      console.log('error in finding post', error);
      response.redirect('/');
    });
};
