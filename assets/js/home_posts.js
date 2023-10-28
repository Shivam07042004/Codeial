{

    // let deletedPostIds = [];
    // method to submit the form data for new post using AJAX
    let createPost = function()
    {
        let newPostForm  = $('#new-post-form');

        newPostForm.submit(function(event)
        {
            event.preventDefault();
            $.ajax({
                type: 'post',
                url: '/posts/create',
                data: newPostForm.serialize(),
                success: function(data)
                {
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));

                    // call the create comment class
                    // new PostComments(data.data.post._id);

                    // enable the functionality of the toggle like button on the new post
                    // new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty
                    ({
                        theme: 'relax',
                        text: 'Post published',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                }, 
                error: function(error)
                {
                    console.log(error.responseText);
                }
            });
        });
    }
    

    // method to create a post in DOM
    let newPostDom = function(post)
    {
        // show the count of zero likes on this post
                return $(`<li id="post-${post._id}">
                <div>
                    <p> ${post.content} </p>
                    <p> ${post.user.name} </p>
                </div>
            
                    <a class="delete-post-button" href="/posts/destroy/${post._id}"> delete </a>
            
                <div class="post-comments">
                        <form action="comments/create" id="new-comment-form" method="POST">
                            <input type="text" name="content" placeholder="Type comment here..." required>
                            <input type="hidden" name="post" value="<%= post._id %>">
                            <input type="submit" value="Add comment">
                        </form>
                </div>
            
                <div id="post-comments-lists">
                    <ul id="post-comments-${post._id}" type="none">
                        <% } %>
                    </ul>
                </div>
            </li>
            `)
            }


    // method to delete a post from DOM
    // method to delete a post from DOM
// method to delete a post from DOM
// method to delete a post from DOM

let deletePost = function (deleteLink) {
    $(deleteLink).click(function (event) {
        event.preventDefault();

        $.ajax({
            type: 'GET',
            url: $(deleteLink).prop('href'),
            success: function (data) {
                if (data.message === 'Post deleted') {
                    let postId = data.data.post_id;
                    // deletedPostIds.push(postId); // Store the deleted post ID
                    $(`#post-${postId}`).remove(); // Remove the post from the DOM
                    new Noty({
                        theme: 'relax',
                        text: 'Post Deleted',
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                    }).show();
                } else {
                    console.log('Error: Post was not deleted.');
                }
            },
            error: function (error) {
                console.log(error.responseText);
            }
        });
    });
}

// Modify this function to filter out deleted posts when displaying
let convertPostsToAjax = function () {
    $('#posts-list-container>ul>li').each(function () {
        // let self = $(this);
        // let postId = self.prop('id').split("-")[1];
        let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            // let postId = self.prop('id').split("-")[1];
            // PostComments(postId);
        // if (!deletedPostIds.includes(postId)) {
        //     deletePost($(' .delete-post-button', self));
        // }
    });
}


createPost();
convertPostsToAjax();



}