function sendEmail(from, to, message) {}

class User {
    constructor({name, surname, email, role}) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.courses = [];
        this.messages = [];
    }

    addCourse(course, level) {
        this.courses.push({course, level});
    }

    removeCourse(course) {
        this.courses = this.courses.filter(c => c.course !== course);
    }

    editCourse(course, level) {
        let found = this.courses.find(c => c.course === course);
        if (found) {
            found.level = level;
        } else {
            this.courses.push({course, level});
        }
    }

    sendMessage(to, message) {
        sendEmail(this.email, to.email, message);
        to.messages.push({
            from: this.email,
            to: to.email,
            message: message
        });
    }

    showMessagesHistory() {
        this.messages.forEach(m => {
            console.log(`${m.from} -> ${m.to}: ${m.message}`);
        });
    }
}

class ExtendedUser extends User {

    get fullName() {
        return `${this.name} ${this.surname}`;
    }

    set fullName(value) {
        let parts = value.split(" ");
        this.name = parts[0];
        this.surname = parts[1];
    }

    static match(teacher, student, courseName) {

        if (courseName) {
            let studentCourse = student.courses.find(c => c.course === courseName);
            let teacherCourse = teacher.courses.find(c => c.course === courseName);

            if (studentCourse && teacherCourse && teacherCourse.level >= studentCourse.level) {
                return {course: courseName, level: teacherCourse.level};
            }
            return undefined;
        }

        let matches = [];

        student.courses.forEach(sc => {
            let tc = teacher.courses.find(c => c.course === sc.course);
            if (tc && tc.level >= sc.level) {
                matches.push({course: sc.course, level: sc.level});
            }
        });

        return matches;
    }
}

class Teacher extends ExtendedUser {
    constructor({name, surname, email}) {
        super({name, surname, email, role: 'teacher'});
    }
}

class Student extends ExtendedUser {
    constructor({name, surname, email}) {
        super({name, surname, email, role: 'student'});
    }
}

let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let student2 = new Student({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
student1.addCourse('physics', 4);
teacher1.addCourse('maths', 4);
let match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> [{course: 'maths', level: 2}]
teacher1.editCourse('maths', 1);
match = ExtendedUser.match(teacher1, student1);
console.log(match); // -> []
teacher1.addCourse('physics', 4);
match = ExtendedUser.match(teacher1, student1, 'physics');
console.log(match); // -> {course: 'physics', level: 4}