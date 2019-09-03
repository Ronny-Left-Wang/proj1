class User {
    constructor({ name = "anonymous", dateCreated, userId }) {
        this.userId = userId;
        this.name = name;
        this.dateCreated = dateCreated;
    }
}

module.exports = User;
