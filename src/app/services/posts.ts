import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class Posts {
  private readonly url = 'https://jsonplaceholder.typicode.com/posts';

  private http = inject(HttpClient);

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  getById(id: number) {
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  delete(id: number) {
    return this.http.delete<Post>(`${this.url}/${id}`);
  }

  create(post: Post) {
    return this.http.post<Post>(this.url, post);
  }

  update(id: number, post: Post) {
    return this.http.put<Post>(`${this.url}/${id}`, post);
  }
}
