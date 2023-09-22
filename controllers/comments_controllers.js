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


module.exports.destroy = function(request,response){
      console.log('comment id need to be deleted ',request.params.id);
      
      Comment.findById(request.params.id)
             .then( (comment) => {
                  // comment exists or not to be deleted
                  if(comment){
                    // signed in user and commented user is same or not
                    if(comment.user == request.user.id){
                      Comment.deleteOne({_id: comment.id})
                             .then( () => {
                              let postId= comment.post;
                              console.log('comment deleted');
                              Post.findByIdAndUpdate(postId,{ $pull:{comments: request.params.id}})
                                  .then( (post) =>{
                                    return response.redirect('back');
                                  })
                                  .catch( (error) => {
                                    console.log('error in the deleting the comment ',error);
                                  })
                             })
                             .catch( (error) => {
                              console.log('error in the deleting the comment');
                             })
                    }
                    else  {
                      console.log('this user can not delete this comment');
                    }
                  }
                  else  {
                    console.log('comment does not exist to be deleted');
                  }
             })
             .catch( (error) => {
              console.log('error in the deleting the comment',error);
             });
}


