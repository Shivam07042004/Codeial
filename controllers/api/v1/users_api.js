const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(request, response) {

    try{
        let user = await User.findOne({email : request.body.email});
        console.log('********* request ',request.body);
        if(!user || user.password != request.body.password){
            console.log(user);

            return response.json(422,{
                message: 'invalid username / password',
            })
        } else {

            return response.json(200,{
                message: 'sign in successful and here is your web token',
                data:{
                    token: jwt.sign(user.toJSON(),'codieal',{expiresIn: '100000'})
                }
            })

        }

    } catch(error){
        console.log('********* error ',error);
        return response.json(500,{
            message: 'invalid server error'
        })

    }

};
