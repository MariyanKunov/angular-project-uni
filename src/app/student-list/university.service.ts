import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { University } from './university.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UniversityService {
  universityUrl = 'http://localhost:3000/university';

  constructor(private httpClient: HttpClient) {}

  private readonly _universities = new BehaviorSubject<University[]>([]);
  public readonly universities$ = this._universities.asObservable();

  getUniversities() {
    return this.httpClient.get(this.universityUrl).pipe(
      map((universities) => {
        this.universities = universities as unknown as University[];
      })
    );
  }

  get universities(): University[] {
    return this._universities.getValue();
  }

  private set universities(val: University[]) {
    this._universities.next(val);
  }
}
