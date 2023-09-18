const Post = require('../models/post');
const User = require('../models/user')

module.exports.home = function(request,response){

    // Post.find({})
    //     .then( (posts) => {
    //         return response.render('home',{
    //             posts : posts,
    //             title:'Codeial | Home'
    //         })
    //     })
    //     .catch( (error) => {
    //         console.log('error in the displaying the posts');
    //     })

    Post.find({})
    .populate('user') // Change 'User' to 'user' to match your schema
    .exec()
    .then(posts => {
        return response.render('home', {
            posts: posts,
            title: 'Codeial | Home'
        });
    })
    .catch(error => {
        console.log('error in user finding for posts', error);
        return response.redirect('back');
    });


        

    // console.log(request.cookies);
    // // response.cookie('user_id',11);

    // return response.render('home',{
    //     title: "Home"
    // });
}