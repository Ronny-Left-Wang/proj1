class User {
    constructor({ name, dateCreated, userId, email, hashed_password }) {
        this.userId = userId;
        this.name = name;
        this.dateCreated = dateCreated;
        this.email = email;
        this.hashed_password = hashed_password;
    }
}

module.exports = User;
