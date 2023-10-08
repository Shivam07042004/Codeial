const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (request, response) {
  try {
    const post = await Post.create({
      content: request.body.content,
      user: request.user._id,
    });

    // Flash message (if session and flash middleware are properly configured)
    request.flash('success', 'Post published');
    console.log('post is created');
    
    return response.redirect('back');
  } catch (error) {
    console.error('Error in creating the post', error);
    // Handle the error and send an appropriate response to the client if needed
  }
};

module.exports.destroy = async function (request, response) {
  try {
    console.log('ID to be deleted', request.params.id);
    const post = await Post.findById(request.params.id);
    if (post) {
      if (post.user == request.user.id) {
        await Post.deleteOne({ _id: post._id });
        console.log('Post deleted');

        await Comment.deleteMany({ post: request.params.id });
        console.log('Comments of post are deleted');

        return response.redirect('back');
      }
    }
    console.log('You cannot delete this post');
    return response.redirect('back');
  } catch (error) {
    console.error('Error in deleting the post', error);
    // Handle the error and send an appropriate response to the client if needed
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