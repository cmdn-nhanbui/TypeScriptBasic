// Enum: Create an enum Role to represent student roles (Student, TeachingAssistant, Admin).

enum Role {
  Student = "STUDENT",
  TeachingAssistant = "TEACHING_ASSISTANT",
  Admin = "ADMIN",
}

interface Student {
  id: number;
  name: string;
  grades: number[];
  role: Role.Student | Role.TeachingAssistant;
}

function addItem<T>(array: T[], item: T) {
  return array.push(item);
}

const students: Student[] = [
  {
    id: 1,
    name: "Nguyen Van A",
    grades: [10, 9, 10],
    role: Role.Student,
  },
];

const newStudent: Student = {
  id: 2,
  name: "Nguyen Van B",
  grades: [9, 9, 9],
  role: Role.Student,
};

type ReadOnlyStudent = {
  readonly [K in keyof Student]: Student[K];
};

const readonlyStudent: ReadOnlyStudent = {
  id: 3,
  name: "Nguyen Van C",
  grades: [8, 8, 8],
  role: Role.Student,
};
// readonlyStudent.id = 10 //Cannot assign to 'id' because it is a read-only property

type StudentSummary = Pick<Student, "name" | "role">;

const studentSummary: StudentSummary = {
  name: "Tran Thi D",
  role: Role.Student,
};

type StudentWithoutGrades = Omit<Student, "grades">;

const studentWithoutGrades: StudentWithoutGrades = {
  id: 5,
  name: "Phan Van T",
  role: Role.Student,
};

type StudentDatabase = Record<number, Student>;

const newStudentDatatbase: StudentDatabase = {
  [newStudent.id]: newStudent,
};

class StudentManager {
  private database: Student[];

  constructor(database: Student[] = []) {
    this.database = database;
  }

  getStudent(studentId: number): Student | null {
    const studentIndex = this.database.findIndex(
      (student) => student.id === studentId
    );
    if (studentIndex === -1) {
      console.log("Not found student");
      return null;
    }
    return this.database[studentIndex];
  }

  addStudent(student: Student): void {
    if ((student.role as unknown as Role) === Role.Admin)
      throw new Error("Student can't have role admin");

    const isExistedStudent = this.database.some((s) => s.id === student.id);
    if (isExistedStudent) {
      throw new Error("Student is existed!");
    }
    addItem(this.database, student);
    console.log("Add student successfully");
  }

  getStudentSummary(studentId: number): StudentSummary {
    const student = this.database.find((student) => student.id === studentId);
    if (!student) throw new Error("Not found student");
    const studentSummary: StudentSummary = {
      name: student.name,
      role: student.role,
    };
    return studentSummary;
  }

  addGrade(studentId: number, grade: number): void {
    const student = this.getStudent(studentId);
    if (student) {
      addItem<number>(student.grades, grade);
      return console.log("Add grade successfully");
    }
  }

  getDatabase(): Student[] {
    return this.database;
  }
}

const studentManager: StudentManager = new StudentManager([]);

studentManager.addStudent({
  id: 10,
  name: "Le Van A",
  grades: [9, 8, 9],
  role: Role.Student,
});

studentManager.addStudent({
  id: 11,
  name: "Tran Thi B",
  grades: [10, 10, 10],
  role: Role.TeachingAssistant,
});

studentManager.addStudent({
  id: 12,
  name: "Nguyen Van C",
  grades: [7, 8, 9],
  role: Role.Student,
});

studentManager.addStudent({
  id: 15,
  name: "Admin",
  grades: [],
  role: Role.Student,
});

console.log("--- Database ---");
console.log(studentManager.getDatabase());

console.log("--- Student Summary (id: 11) ---");
console.log(studentManager.getStudentSummary(11));

studentManager.addGrade(10, 10);
console.log("--- After adding grade to id: 10 ---");
console.log(studentManager.getStudent(10));
