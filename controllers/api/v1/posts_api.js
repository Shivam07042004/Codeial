const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(request,response){

    let posts = await  Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
          path: 'comments',
          options: { sort: { createdAt: -1} }, 
          populate: {
            path: 'user'
          }
        })
    
    return response.json(200,{
        message:'list of posts',
        posts : posts
    })
}

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
  
            return response.json(200,{
                message: 'post and associte comments are deleted'
            });
          // return response.redirect('back');
        }
        else  {
          return response.json(401,{
            message: 'you can not delete this post'
        });

        }
      }
      else  {
        return response.json(404,{
            message: 'post not found'
        })
      }
    //   console.log('You cannot delete this post');
    //   return response.redirect('back');
    } catch (error) {
      console.error('Error in deleting the post', error);
      return response.json(500,{
        message: 'invalid server error'
      })
      // Handle the error and send an appropriate response to the client if needed
    }
  };
  