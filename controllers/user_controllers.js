const User = require('../models/user');

module.exports.profile = function(request, response) {
    if (request.cookies.user_id) {
        User.findById(request.cookies.user_id)
            .then(user => {
                if (user) {
                    return response.render('user_profile', {
                        title: 'profile',
                        user: user
                    });
                } else {
                    return response.redirect('/users/sign-in');
                }
            })
            .catch(error => {
                console.log('Error fetching user:', error);
                return response.redirect('/users/sign-in');
            });
    } else {
        return response.redirect('/users/sign-in');
    }
};


    
// render singUp page 
module.exports.signUp = function(request,response){
    return response.render('user_sign_up',{
        title:"Sign Up"
    });
}
// render signIn page
module.exports.signIn = function(request,response){
    return response.render('user_sign_in',{
        title:"Sign In"
    });
}

module.exports.signOut = function(request,response){
    // clear cookie
    response.clearCookie('user_id');
    console.log('signed out successfully');

    return response.redirect('/users/sign-in')
}

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
module.exports.createSession = function(request,response){
   User.findOne( {email : request.body.email })
        .then( user => {
            // user not found 
            if(!user){
                console.log('user not found');
                return response.redirect('back');
            }
            else  {

                // password not matches 
                if(user.password !== request.body.password){
                    console.log('wrong password');
                    return response.redirect('back');
                }
                // password matches
                else  {
                    console.log('user found');
                    response.cookie('user_id',user.id);
                    return response.redirect('/users/profile');
                }
            }
        })
        .catch(error => {
            console.log('errror in signing in',error);
            return response.redirect('back');
        })
}


