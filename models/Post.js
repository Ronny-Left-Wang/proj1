class Post {
    constructor({ title = "Untitled", content, dateCreated, user, postId }) {
        // TODO options
        this.postId = postId;
        this.user = user;
        this.title = title;
        this.dateCreated = dateCreated;
        this.content = content;
    }
}

module.exports = Post;
