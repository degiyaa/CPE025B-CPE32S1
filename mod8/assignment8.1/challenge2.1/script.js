function sendEmail(from, to, message) {}

class User {
    constructor({name, surname, email, role}) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.messages = [];
        this.courses = [];
    }

    addCourse(course, level) {
        for(let i=0; i < this.courses.length; i++) {
            if(this.courses[i].course === course) {
                return;
            }
        }
        this.courses.push({course, level});
    }

    removeCourse(course) {
        for(let i=0; i < this.courses.length; i++) {
            if(this.courses[i].course === course) {
                this.courses.splice(i,1);
                break;
            }
        }
    }

    editCourse(course, level) {
        for(let i=0; i < this.courses.length; i++) {
            if(this.courses[i].course === course) {
                this.courses[i].level = level;
                break;
            }
        }
    }

    sendMessage(from, message) {
        this.messages.push({from: from.email, to: this.email, content: message});
        sendEmail(from.email, this.email, message);
    }

    showMessagesHistory() {
        for(let message of this.messages) {
            console.log(`${message.from} -> ${message.to}: ${message.content}`)
        }
    }
};

let student1 = new User({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com', role: 'student'});
let student2 = new User({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com', role: 'student'});
let teacher1 = new User({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com', role: 'teacher'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 1);
student1.removeCourse('physics');
teacher1.addCourse('biology', 3);
teacher1.editCourse('biology', 4);
console.log(`${student1.name}: ${student1.courses.length} courses`); // -> Rafael: 1 courses
console.log(`${teacher1.name}: ${teacher1.courses.length} courses`); // -> Paula: 1 courses
teacher1.sendMessage(student1, 'test message');
teacher1.sendMessage(student1, 'another message');
teacher1.showMessagesHistory();
// -> rfife@rhyta.com -> PaulaThompkins@jourrapide.com: test message
// -> rfife@rhyta.com -> PaulaThompkins@jourrapide.com: another message