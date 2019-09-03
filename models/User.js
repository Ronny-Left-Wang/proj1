class User {
    constructor({ name = "anonymous", dateCreated, userId }) {
        // TODO options
        this.userId = userId;
        this.name = name;
        this.dateCreated = dateCreated;
    }
}

module.exports = User;
