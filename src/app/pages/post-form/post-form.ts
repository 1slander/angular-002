import { Component, inject } from '@angular/core';
import { Posts } from '../../services/posts';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Post } from '../../models/post';
import { filter, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-post-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css',
})
export class PostForm {
  postId?: number;

  private postsService = inject(Posts);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  form = new FormGroup({
    title: new FormControl('', { nonNullable: true }),
    body: new FormControl('', { nonNullable: true }),
  });

  ngOnInit() {
    this.route.paramMap
      .pipe(
        map((params) => Number(params.get('id'))),
        filter((id) => !Number.isNaN(id)),
        switchMap((id) => this.postsService.getById(id)),
      )
      .subscribe((post) => {
        this.form.patchValue({
          title: post.title,
          body: post.body,
        });
      });
  }

  save() {
    const payload: Post = {
      userId: 1,
      title: this.form.controls.title.value,
      body: this.form.controls.body.value,
      id: this.postId ?? 0, // no es necesario, pero no molesta
    };

    const request$ = this.postId
      ? this.postsService.update(this.postId, payload)
      : this.postsService.create(payload);

    request$.subscribe({
      next: (res) => this.router.navigate(['/posts', res.id ?? this.postId ?? 1]),
      error: (e) => console.error('Error guardando:', e),
    });
  }
}
