const Post = require('../models/post');
const User = require('../models/user')

module.exports.home = async function(request,response){

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

  try
  {
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
      console.log('await works fine');
      let users= await User.find({})
        return response.render('home', {
          posts: posts,
          title: 'Codeial | Home',
          all_users: users,
          user: request.user // Make sure 'user' is passed here
      });
    
  } catch(error){
    console.log('error in the home page loading',error);

  }
       
  



        

    // console.log(request.cookies);
    // // response.cookie('user_id',11);

    // return response.render('home',{
    //     title: "Home"
    // });
}