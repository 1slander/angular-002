import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from './models/post';
import { Posts } from './services/posts';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // private postService = inject(Posts);
  // posts$!: Observable<Post[]>;
  // ngOnInit() {
  //   this.posts$ = this.postService.getAll();
  // }
}
