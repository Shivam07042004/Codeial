const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (request, response) {
  try {
    const post = await Post.create({
      content: request.body.content,
      user: request.user._id,
    });
    const populatedPost = await Post.findById(post._id)
    .populate('user', 'name')
    .exec();
    // Flash message (if session and flash middleware are properly configured)
   
    if (request.xhr) {
      return response.status(200).json({
          data: {
              post: populatedPost,
          },
          message: 'Post created!',
      });
  }

  request.flash('success', 'Post published!');
  return response.redirect('back');
  } catch (error) {
    console.error('Error in creating the post', error);
    // Handle the error and send an appropriate response to the client if needed
    return response.json({
      success: false,
      message: 'Error creating the post',
    });
  }
};

module.exports.destroy = async function (request, response) {
  try {
      let post = await Post.findById(request.params.id);
      if (post.user == request.user.id) {
        await Post.deleteOne({ _id: post._id });
        await Comment.deleteMany({ post: request.params.id });

          if (request.xhr) {
              return response.status(200).json({
                  data: {
                      post_id: request.params.id
                  },
                  message: 'Post deleted'
              });
          }

          // Remove the redirection
          // return response.redirect('back');
      } else {
          return response.redirect('back');
      }
  } catch (err) {
      request.flash('error', err);
      return response.redirect('back');
  }
};




// console.log('id need to be deleted ',request.params.id);
//     Post.findById(request.params.id)
//         .then((post) => {
//             if(post){
//                 if(post.user == request.user.id){
//                     Post.deleteOne({ _id: post._id })
//                         .then(() => {
//                             console.log('deleted');
//                             // Deletion successful
//                         })
//                         .catch((error) => {
//                             console.log('again error',error);
//                             // Handle the error
//                         });

//                     Comment.deleteMany({post : request.params.id})
//                             .then(() => {
//                                 console.log('comments of post are deleted');
//                                 console.log('post deleted');
//                                 return response.redirect('back');
//                             })
//                             .catch((error) => {
//                                 console.log('error in deleting the comments of the post');
//                             })
//                 }
//             }
//             else  {
//                 console.log('you cannot delete this post');
//                 return response.redirect('back');
//             }
//         })
//         .catch((error) => {
//             console.log('error in the deleting the post');
//         })