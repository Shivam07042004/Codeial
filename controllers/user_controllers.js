const User = require('../models/user');

const fs= require('fs');
const path= require('path');

// module.exports.profile = function(request, response) {
//     if (request.cookies.user_id) {
//         User.findById(request.cookies.user_id)
//             .then(user => {
//                 if (user) {
//                     return response.render('user_profile', {
//                         title: 'profile',
//                         user: user
//                     });
//                 } else {
//                     console.log('user not logged in and processed to sign in page')
//                     return response.redirect('/users/sign-in');
//                 }
//             })
//             .catch(error => {
//                 console.log('Error fetching user:', error);
//                 return response.redirect('/users/sign-in');
//             });
//     } else {
//         console.log('user not logged in and processed to sign in page')
//         return response.redirect('/users/sign-in');
//     }
// };

module.exports.profile = function(request,response){
    User.findById(request.params.id)
        .then((user) => {
          return response.render('user_profile',{
            title:'User Profile',
            profile_user: user
          })  
        })
        .catch( (error) => {
            console.log('error in the displaying profile ',error);
        })

}

module.exports.update = async function(request,response){
    // if(request.user.id == request.params.id){
    //     User.findByIdAndUpdate(request.params.id, request.body)
    //         .then( () => {
    //             console.log('user data updated');
    //             return response.redirect('back');
    //         })
    //         .catch( (error) => {
    //             console.log('error in the updating the user data');
    //         })
    // }
    // else  {
    //     return response.status(401).send('unauthorized');
    // }

    if(request.user.id == request.params.id){
        try{
            let user= await User.findById(request.params.id);

            User.uploadedAvatar(request,response,function(error){
                if(error){
                    console.log('multer error',error);
                    return response.redirect('back');
                }
                console.log(request.file);
                user.name= request.body.name;
                user.email= request.body.email;
                console.log("********* ",request.file.filename);
                if (request.file) {
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    // Assuming you have already corrected the path as mentioned earlier
                    user.avatar = '/uploads/users/avatars/' + request.file.filename;
                    request.flash('success','new avatar uploaded')
                } else {
                    console.log('No new avatar uploaded'); // Handle this case as needed
                }
                
                user.save();
                        return response.redirect('back');
                  
            })
        

        }catch(error){
            request.flash('error',error);
            return response.redirect('back');
        }

    }else  {
        request.flash('error','Unauthorized');
        return response.status(401).send('Unauthorized');
    }


}


    
// render singUp page 
module.exports.signUp = function(request,response){
    // if user is already signed up 
    // don't redirect to sign up page
    if(request.isAuthenticated()){
        return response.redirect('/users/profile');
    }

    return response.render('user_sign_up',{
        title:"Sign Up"
    });
}
// render signIn page
module.exports.signIn = function(request,response){
    // if user is already signed in 
    // don't redirect to sign in page
    if(request.isAuthenticated()){
        return response.redirect('/users/profile');
    }
    return response.render('user_sign_in',{
        title:"Sign In"
    });
}

// module.exports.signOut = function(request,response){
//     // clear cookie
//     response.clearCookie('user_id');
//     console.log('signed out successfully');

//     return response.redirect('/users/sign-in')
// }

module.exports.signOut = function(request, response) {
    // Using Passport's logout method with a callback function
    // request.logout();
    // console.log('signed out successfully');
    // return response.redirect('/users/sign-in');



    request.logout(function(err) {
        if (err) {
            console.log('Error during logout:', err);
            return response.redirect('/'); // Redirect to some error page
        }

        request.flash('success','logged out successfully!');
        
        console.log('signed out successfully');
        return response.redirect('/users/sign-in');
    });
};


// render create user
// module.exports.create = function(request,response){
//     if(request.password !== request.confirm_password){
//         return response.redirect('back');
//     }

//     User.findOne({email : request.body.email},(function(error,user){
//         if(error){ console.log('error in the signing up', error);  return; }

//         if(!user){
//             User.create(request.body, function(error,user){
//                 if(error){ console.log('error in the creating the user',error); return; }

//                 console.log('user created successfully');
//                 return response.redirect('/users/sign-in')
//             })
//         }
//         else  {
//             return response.redirect('back');
//         }
    

//     })
//     )
   



// }

module.exports.create = function (request, response) {
    if (request.body.password !== request.body.confirm_password) {
        return response.redirect('back');
    }

    User.findOne({ email: request.body.email })
        .then(user => {
            if (!user) {
                User.create(request.body);
                console.log('User created successfully');
                return response.redirect('/users/sign-in');
            } else {
                console.log("User already exists");
                return response.redirect('/users/sign-up')
            }
        })
        // .then(user => {
        //     console.log('User created successfully');
        //     return response.redirect('/users/sign-in');
        // })
        .catch(error => {
            console.log('Error in creating the user:', error);
            return response.redirect('back');
        });
};


// render create-session
// module.exports.createSession = function(request,response){
//    User.findOne( {email : request.body.email })
//         .then( user => {
//             // user not found 
//             if(!user){
//                 console.log('user not found');
//                 return response.redirect('back');
//             }
//             else  {

//                 // password not matches 
//                 if(user.password !== request.body.password){
//                     console.log('wrong password');
//                     return response.redirect('back');
//                 }
//                 // password matches
//                 else  {
//                     console.log('user found');
//                     response.cookie('user_id',user.id);
//                     return response.redirect('/users/profile');
//                 }
//             }
//         })
//         .catch(error => {
//             console.log('errror in signing in',error);
//             return response.redirect('back');
//         })
// }
module.exports.createSession = function(request, response) {
    // Assuming your authentication logic goes here

    // Log the user's ID
    console.log('User ID:', request.user.id);

    // Set the session cookie
    response.cookie('user_id', request.user.id);

    // Log session information
    console.log('Session:', request.session);

    // display flash messages
    request.flash('success','logged in successfully!');

    return response.redirect('/');
};
