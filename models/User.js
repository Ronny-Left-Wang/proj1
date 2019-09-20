class User {
    constructor({ name, dateCreated, userId, email, hashed_password, data=null }) {
        this.userId = userId;
        this.name = name;
        this.dateCreated = dateCreated;
        this.email = email;
        this.hashed_password = hashed_password;
        if (data != null) {
            this.name = data.first_name + ' ' + data.last_name;
            this.dateCreated = data.first_created;
            this.hashed_password = data.hashed_password;
            this.email = data.email;
            this.userId = data.user_id;
            this.dateCreated = data.date_created;
        }
    }
}

module.exports = User;
