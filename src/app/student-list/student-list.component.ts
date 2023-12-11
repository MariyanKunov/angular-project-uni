import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from './students.service';
import { Observable, map, switchMap } from 'rxjs';
import { Student } from './student.interface';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { Message, MessageService } from 'primeng/api';
import { University } from './university.interface';
import { UniversityService } from './univers';
import { InputNumberModule } from 'primeng/inputnumber';
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DropdownModule,
    DialogModule,
    ToastModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [StudentService, UniversityService, MessageService],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.scss',
})
export class StudentListComponent implements OnInit {
  students$: Observable<Student[]> = this.studentService.students$;

  universities$: Observable<University[]> =
    this.universityService.universities$;

  loading: boolean = true;

  visible = false;
  newStudent: Student = {} as Student;
  selectedUniversity: University = {} as University;

  constructor(
    private studentService: StudentService,
    private universityService: UniversityService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loading = false;
    this.universityService.getUniversities().subscribe((universities) => {
      console.log(universities);
    });
    this.studentService.getStudents().subscribe((students) => {
      console.log(students);
    });
  }

  openModal() {
    this.visible = true;
  }

  addStudent() {
    if(!this.newStudent.age || !this.newStudent.name || !this.newStudent.university){
      this.messageService.add({ severity: 'error', summary: 'Invalid inputs'});
      return;
    }
    this.studentService
      .addStudent(this.newStudent)
      .pipe(
        switchMap((result) => {
          return this.studentService.getStudents().pipe(map((r) => result));
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.messageService.add({
          severity: 'info',
          summary: 'Successfully added student',
        });
        this.visible = false;
        this.newStudent = {} as Student;
      });
  }
 
  removeStudent(id: number){
    this.studentService
      .removeStudent(id)
      .pipe(
        switchMap((result) => {
          return this.studentService.getStudents().pipe(map((r) => result));
        })
      )
      .subscribe((res) => {
        console.log(res);
        this.messageService.add({
          severity: 'info',
          summary: 'Successfully removed student',
        });
      });
  }

  closeModal() {
    this.newStudent = {} as Student;
    this.visible = false;
  }
}
