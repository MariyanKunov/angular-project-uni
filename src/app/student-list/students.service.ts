import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Student } from './student.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StudentService {
  studentsUrl = 'http://localhost:3000/student';

  private readonly _students = new BehaviorSubject<Student[]>([]);
  public readonly students$ = this._students.asObservable();

  constructor(private httpClient: HttpClient) {}

  get students(): Student[] {
    return this._students.getValue();
  }

  private set students(val: Student[]) {
    this._students.next(val);
  }

  getStudents() {
    return this.httpClient.get(this.studentsUrl).pipe(
      map((students) => {
        this.students = students as unknown as Student[];
      })
    );
  }

  addStudent(student: Student) {
    return this.httpClient.post(this.studentsUrl, student);
  }

  updateStudent(id: number, student: Student) {
    return this.httpClient.post(`${this.studentsUrl}/${id}`, student);
  }
  removeStudent(id: number) {
    return this.httpClient.delete(`${this.studentsUrl}/${id}`);
  }
}
