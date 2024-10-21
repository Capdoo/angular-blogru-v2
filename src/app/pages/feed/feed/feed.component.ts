import { Component, OnInit } from '@angular/core';
import { PostDto } from '../../posts/interfaces/post-dto';
import { PostsService } from '../../../shared/services/posts.service';
import { UtilToolsService } from '../../../shared/services/util-tools.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit{

  listPosts: PostDto[];

  constructor(private postService: PostsService,
    private utilToolsService: UtilToolsService
  ) {

  }

  ngOnInit(): void {
    this.utilToolsService.Timer();
    this.postService.getPosts().subscribe(
      data => {
        this.listPosts = data;
        console.log(data);
        this.utilToolsService.CloseTimer();

      },
      err => {
        this.utilToolsService.CloseTimer();
        this.utilToolsService.errNotif('Feed', 'Ocurrió un error');
        console.error(err);
      }
    )
  }

}
