import { Component, OnInit } from '@angular/core';
import { PostDto } from '../../../posts/interfaces/post-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../../../shared/services/posts.service';
import { switchMap } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrl: './read.component.css'
})
export class ReadComponent implements OnInit {

  id: string = "";
  public post: PostDto;
  flagForm: boolean = false;
  loadingSpinner: boolean = true;

  constructor(private activatedRouted: ActivatedRoute,
    private postService: PostsService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {

    this.loadingSpinner = true;
    this.spinner.show('feed-spinner');

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
        this.flagForm = true;

        this.spinner.hide('feed-spinner');
        this.loadingSpinner = false;

        return 0;
      },
      (err) => {
        console.log(err)

        this.spinner.hide('feed-spinner');
        this.loadingSpinner = false;
      }
    );



  }


  volver(): void {
    this.router.navigateByUrl(`/site/feed`);
  }

}
