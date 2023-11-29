import { Routes } from '@angular/router';
import { StudentListComponent } from './student-list/student-list.component';

export const routes: Routes = [
  { title: 'Students', path: 'students', component: StudentListComponent },
];
