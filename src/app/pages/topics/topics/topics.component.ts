import { Component, OnInit } from '@angular/core';
import { TopicDto } from '../../posts/interfaces/post-dto';
import { PostsService } from '../../../shared/services/posts.service';
import { TopicsService } from '../../../shared/services/topics.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilToolsService } from '../../../shared/services/util-tools.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrl: './topics.component.css'
})
export class TopicsComponent implements OnInit{

  listTopics: TopicDto[];
  loadingSpinner: boolean = true;
  flagTopics: boolean = false;

  constructor(private postService: PostsService,
    private topicsService: TopicsService,
    private spinner: NgxSpinnerService,
    private utilToolsService: UtilToolsService
  )
  {}

  ngOnInit(): void {
    this.topicsService.getAllTopics().subscribe(
      data => {
        this.listTopics = data;
        this.flagTopics = true;
        this.spinner.hide('topics-spinner');
        this.loadingSpinner = false;
      },
      err => {
        this.utilToolsService.errNotif('Topics', 'Ocurrió un error');

        console.log(err)
      }
    )
  }

  explorar(itemId: string): void {

  }

}
