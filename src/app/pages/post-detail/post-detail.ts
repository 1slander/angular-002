import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Post } from '../../models/post';
import { Posts } from '../../services/posts';

@Component({
  selector: 'app-post-detail',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './post-detail.html',
  styleUrl: './post-detail.css',
})
export class PostDetail {
  post$!: Observable<Post>;

  private route = inject(ActivatedRoute);
  private postsService = inject(Posts);
  private router = inject(Router);

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const id = Number(params.get('id'));
        if (!id) throw new Error('No id in route');
        return this.postsService.getById(id);
      }),
    );
  }

  deletePost(id: number) {
    const ok = confirm('Seguro que quieres borrar este post?');
    if (!ok) return;

    this.postsService.delete(id).subscribe({
      next: () => this.router.navigate(['/posts']),
      error: (e) => console.error('Error borrando: ', e),
    });
  }
}
