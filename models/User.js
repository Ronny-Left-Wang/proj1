class User {
    constructor({ name = "anonymous", dateCreated }) {
        // TODO options
        this.name = name;
        this.dateCreated = dateCreated;
    }
}

module.exports = User;
