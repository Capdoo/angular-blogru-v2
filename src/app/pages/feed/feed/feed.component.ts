import { Component, OnInit } from '@angular/core';
import { PostDto, SubtopicDto, TopicDto } from '../../posts/interfaces/post-dto';
import { PostsService } from '../../../shared/services/posts.service';
import { UtilToolsService } from '../../../shared/services/util-tools.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { TopicsService } from '../../../shared/services/topics.service';
import { CategoriesService } from '../../../shared/services/categories.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.css'
})
export class FeedComponent implements OnInit {

  redactPostFormGroup!: FormGroup;

  listPosts: PostDto[];
  loadingSpinner: boolean = true;
  flagPosts: boolean = false;
  listTopics: TopicDto[];
  listSubtopics: SubtopicDto[];
  matcher = new MyErrorStateMatcher();


  constructor(private postService: PostsService,
    private utilToolsService: UtilToolsService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private topicService: TopicsService,
    private categoriesService: CategoriesService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {


    this.redactPostFormGroup = this._formBuilder.group({
      redactPostTopic: ['', Validators.required],
      redactPostCategory: ['', Validators.required],
    });

    this.redactPostFormGroup.get('redactPostCategory').disable();
    // this.selectTopic();


    this.loadingSpinner = true;
    this.spinner.show('feed-spinner');

    this.postService.getPosts().subscribe(
      data => {
        this.listPosts = data;
        // if (this.listPosts.length > 0) {
        //   this.flagPosts = true;
        // }
        this.flagPosts = true;
        this.spinner.hide('feed-spinner');
        this.loadingSpinner = false;

      },
      err => {
        this.utilToolsService.errNotif('Feed', 'Ocurrió un error');
        console.error(err);
        this.spinner.hide('feed-spinner');
        this.loadingSpinner = false;
      }
    )

    this.topicService.getAllTopics().subscribe(
      data => {
        this.listTopics = data;

        this.listTopics = this.listTopics.map((e) => {
          e.description = `assets/${e.description}.png`
          return e;
        })

        this.utilToolsService.CloseTimer();
      },
      err => {
        this.utilToolsService.CloseTimer();

        this.utilToolsService.errNotif('Feed', 'Ocurrió un error');
        console.error(err);
      }
    );

    // this.utilToolsService.Timer();
    this.categoriesService.getAllSubtopics().subscribe(
      data => {
        // this.utilToolsService.CloseTimer();
        this.listSubtopics = data;
      },
      err => {
        // this.utilToolsService.CloseTimer();

        this.utilToolsService.errNotif('Feed', 'Ocurrió un error');
        console.error(err);
      }
    );
    this.utilToolsService.CloseTimer();


  }

  readPost(postId: string): void {

    this.router.navigateByUrl(`/site/feed/post/${postId}`);
  }

  selectTopic(): void {
    this.loadingSpinner = true;
    this.flagPosts = false;
    this.spinner.show('feed-spinner');

    let topicId = this.redactPostFormGroup.get('redactPostTopic').value;
    console.log(topicId);

    this.postService.getPostsByTopicId(topicId).subscribe(
      data => {
        this.listPosts = data;

        this.flagPosts = true;
        this.spinner.hide('feed-spinner');
        this.loadingSpinner = false;
      },
      err => {
        this.utilToolsService.errNotif('Feed', 'Ocurrió un error');
        console.error(err);
        this.spinner.hide('feed-spinner');
        this.loadingSpinner = false;
      }
    );

    this.utilToolsService.Timer();
    this.categoriesService.getCategoriesByTopic(topicId).subscribe(
      data => {
        this.listSubtopics = data;

        this.listSubtopics = this.listSubtopics.map((e) => {
          e.description = `assets/${e.description}.png`
          return e;
        })

        if (this.listSubtopics.length > 0) {
          this.redactPostFormGroup.get('redactPostCategory').enable();
        } else {
          this.utilToolsService.errNotif('Feed', 'Ocurrió un error');
        }
        this.utilToolsService.CloseTimer();
      },
      err => {

        this.utilToolsService.errNotif('Feed', 'Ocurrió un error');
        console.error(err);
      }
    )
  }

  selectSubTopic(): void {
    this.loadingSpinner = true;
    this.flagPosts = false;
    this.spinner.show('feed-spinner');

    let subTopicId = this.redactPostFormGroup.get('redactPostCategory').value;
    console.log(subTopicId);

    this.postService.getPostsBySubTopicId(subTopicId).subscribe(
      data => {
        this.listPosts = data;

        this.flagPosts = true;
        this.spinner.hide('feed-spinner');
        this.loadingSpinner = false;
      },
      err => {
        this.utilToolsService.errNotif('Feed', 'Ocurrió un error');
        console.error(err);
        this.spinner.hide('feed-spinner');
        this.loadingSpinner = false;
      }
    );
  }

}
