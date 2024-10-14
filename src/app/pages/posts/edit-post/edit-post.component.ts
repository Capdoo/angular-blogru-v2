import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { PostsService } from '../../../shared/services/posts.service';
import { UtilToolsService } from '../../../shared/services/util-tools.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { SectionDto, TopicDto, SubtopicDto, PostDto } from '../interfaces/post-dto';
import { ErrorStateMatcher } from '@angular/material/core';
import { TopicsService } from '../../../shared/services/topics.service';
import { CategoriesService } from '../../../shared/services/categories.service';
import { DataService } from '../../../shared/services/data.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit{

  postId: number;
  post: PostDto;
  editPostFormGroup!: FormGroup;
  listSections: SectionDto[] = [];
  listTopics: TopicDto[];
  listSubtopics: SubtopicDto[];
  matcher = new MyErrorStateMatcher();

  flagActivateUpdate: boolean = false;

  constructor(private dataService: DataService,
    private postService: PostsService,
    private _formBuilder: FormBuilder,
    private utilToolsService: UtilToolsService,
    private topicService: TopicsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.enInicio();
    //get the current edit post
    this.post = this.dataService.getPost();

    this.utilToolsService.Timer();
    this.topicService.getAllTopics().subscribe(
      data => {
        this.listTopics = data;
        this.utilToolsService.CloseTimer();
      },
      err => {
        this.utilToolsService.CloseTimer();

        this.utilToolsService.errNotif('Nuevo Post', 'Ocurrió un error');
        console.error(err);
      }
    );

    this.utilToolsService.Timer();
    this.categoriesService.getAllSubtopics().subscribe(
      data => {
        this.listSubtopics = data;
        this.utilToolsService.CloseTimer();
      },
      err => {
        this.utilToolsService.CloseTimer();

        this.utilToolsService.errNotif('Nuevo Post', 'Ocurrió un error');
        console.error(err);
      }
    );

  }

  enInicio(): void {
    this.editPostFormGroup = this._formBuilder.group({
      editPostTitle: ['', Validators.required],
      editPostResume: ['', Validators.required],
      editPostTopic: ['', Validators.required],
      editPostCategory: ['', Validators.required],
      editPostListSections: [this.listSections,],
    });
  }

  previewPost(): void {

  }

  updatePost(): void {

  }


}
