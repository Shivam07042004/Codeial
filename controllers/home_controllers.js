module.exports.home = function(request,response){
    console.log(request.cookies);
    response.cookie('user_id',11);
    return response.render('home',{
        title: "Home"
    });
}