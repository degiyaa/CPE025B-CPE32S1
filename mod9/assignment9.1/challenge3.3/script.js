class Users {
    #users;

    constructor() {
        this.#users = new Map();
    }

    add(name, surname, email) {
        try{
            this.#users.set(email, new User(name, surname, email));
        } catch(e) {
            console.log(e.message);
        }
    }

    delete(email) {
        return this.#users.delete(email);
    }

    get(email) {
        return this.#users.get(email);
    }

    getAll(sortBy) { //name,surname,email
        return [...this.#users].sort((u1,u2) => u1[1][sortBy] > u2[1][sortBy] ? 1 : -1).map(u => u[1]);
    }
}

let users = new Users();
users.add("Aaaa", "Bbbb", "cccc@gmail.com");
users.add("Mmmm", "Ffff", "eeee@gmail.com");
users.add("Aaaa", "Bbbb", "cccc@gmail.com");
users.add("Xxxx", "Oooo", "dddd@gmail.com");
console.log(users.get("dddd@gmail.com"));
console.log(users.getAll("name").map(u => u.name));
console.log(users.getAll("surname").map(u => u.surname));
console.log(users.getAll("email").map(u => u.email));