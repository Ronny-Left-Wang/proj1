class Post {
    constructor({ data=null, title = "Untitled", content, dateCreated, user, postId }) {
        this.postId = postId;
        this.user = user;
        this.title = title;
        this.dateCreated = dateCreated;
        this.content = content;
        if (data != null) {
            this.postId = data.post_id;
            this.dateCreated = data.date_created;
            this.content = data.content;
            this.title = data.title;
        }
    }
}

module.exports = Post;
