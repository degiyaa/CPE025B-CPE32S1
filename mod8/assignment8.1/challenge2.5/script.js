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

class Tutoring {
    constructor() {
        this.students = [];
        this.teachers = [];
    }

    addStudent(name, surname, email) {
        this.students.push(new Student({name, surname, email}));
    }

    addTeacher(name, surname, email) {
        this.teachers.push(new Teacher({name, surname, email}));
    }

    getStudentByName(name, surname) {
        return this.students.find(s => s.name === name && s.surname === surname);
    }

    getTeacherByName(name, surname) {
        return this.teachers.find(t => t.name === name && t.surname === surname);
    }

    getStudentsForTeacher(teacher) {
        let result = [];
        this.students.forEach(student => {
            let match = ExtendedUser.match(teacher, student);
            if (match.length > 0) result.push(student);
        });
        return result;
    }

    getTeacherForStudent(student) {
        let result = [];
        this.teachers.forEach(teacher => {
            let match = ExtendedUser.match(teacher, student);
            if (match.length > 0) result.push(teacher);
        });
        return result;
    }
}

class ExtendedTutoring extends Tutoring {
    sendMessages(from, to, message) {
        for (let user of to) {
            from.sendMessage(user, message);
        }
    }
}

let tutoring = new ExtendedTutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');
let to = [];
to.push(tutoring.getStudentByName('Rafael', 'Fife'));
to.push(tutoring.getStudentByName('Kelly', 'Estes'));
tutoring.sendMessages(tutoring.getTeacherByName('Paula', 'Thompkins'), to, 'test message');
for(let user of to) {
    user.showMessagesHistory();
}
// -> PaulaThompkins@jourrapide.com -> rfife@rhyta.com: test message
// -> PaulaThompkins@jourrapide.com -> k_estes@dayrep.com: test message