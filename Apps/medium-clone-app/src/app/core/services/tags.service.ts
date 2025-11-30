import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private apiService: ApiService) {}

  getAll(): Observable<[string]> {
    return this.apiService.get('/tags').pipe(map((data) => data.tags));
  }
}
