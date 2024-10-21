import { Component, OnInit } from '@angular/core';
import { PostDto } from '../../../posts/interfaces/post-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../../shared/services/posts.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent implements OnInit {

  id: string = "";
  public post: PostDto;
  constructor(private activatedRouted: ActivatedRoute,
    private postService: PostsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.activatedRouted.params.pipe(
      switchMap(({ id }) => this.postService.getPostById(id))
    ).subscribe(
      (data) => {
        console.log(data);
        if (!data) {
          return this.router.navigateByUrl('');
        }
        console.log('Se obtiene el post a ver detalle');
        this.post = data;
        return 0;
      },
      (err) => {
        console.log(err)
      }
    );
  }

}
