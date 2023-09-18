const Post = require('../models/post');

module.exports.create = function(request,response){
    Post.create({
        content:request.body.content,
        user:request.user._id
    })
    .then(() => {
        console.log('post is created')
        return response.redirect('back')
    })
    .catch((error) => {
        console.log('error in the creating the posts',error);
    })
}