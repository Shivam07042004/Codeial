const User = require('../models/user');

module.exports.profile = function(request,response){
    return response.end('<h1>User profile</h1>');
}
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
module.exports.createSession = function(request,reponse){
    // TODO later
}