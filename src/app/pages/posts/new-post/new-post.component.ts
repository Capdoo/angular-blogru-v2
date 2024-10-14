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

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
  providers: [DatePipe]
})
export class NewPostComponent implements OnInit {

  createPostFormGroup!: FormGroup;
  readonly panelOpenState = signal(false);

  listSections: SectionDto[] = [];
  matcher = new MyErrorStateMatcher();

  listTopics: TopicDto[];
  listSubtopics: SubtopicDto[];

  post: PostDto = {} as PostDto;

  flagActivateSave: boolean = false;
  flagActivatePreview: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private postsService: PostsService,
    private utilToolsService: UtilToolsService,
    private datePipe: DatePipe,
    private router: Router,
    private topicService: TopicsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.enInicio();

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

    this.createPostFormGroup = this._formBuilder.group({
      createPostTitle: ['', Validators.required],
      createPostResume: ['', Validators.required],
      createPostTopic: ['', Validators.required],
      createPostCategory: ['', Validators.required],
      createPostListSections: [this.listSections,],
    });


  }

  isValidForm(): boolean {
    let res: boolean = false;

    if (this.createPostFormGroup.get('createPostTitle').valid &&
      this.createPostFormGroup.get('createPostResume').valid &&
      this.createPostFormGroup.get('createPostTopic').valid &&
      this.createPostFormGroup.get('createPostCategory').valid) {
      res = true;
    }

    return res;
  }

  addSection(): void {
    // this.createPostFormGroup.markAsUntouched();

    let section: SectionDto = {} as SectionDto;
    this.listSections.push(section);
  }

  previewPost(): void {
    this.createRequest();
  }

  createRequest(): void {
    // const post: PostDto = {} as PostDto;
    this.post.title = this.createPostFormGroup.get('createPostTitle').value;
    this.post.summary = this.createPostFormGroup.get('createPostResume').value;
    this.post.topicId = this.createPostFormGroup.get('createPostTopic').value;
    this.post.subtopicId = this.createPostFormGroup.get('createPostCategory').value;

    this.post.listSectionsDto = this.createPostFormGroup.get('createPostListSections').value;

    // return post;
    console.log(this.post);
  }

  savePost(): void {
    this.flagActivateSave = true;
    this.createPostFormGroup.markAllAsTouched();
    console.log(this.createPostFormGroup.valid);
    
    if (!this.isValidForm()) {
      this.utilToolsService.errNotif('Nuevo Post', 'Campos incorrectos');
      this.flagActivateSave = false;
      return;
    }


    this.createRequest();
    this.utilToolsService.Timer();
    this.postsService.createPost(this.post).subscribe(
      data => {
        console.log(data);
        this.utilToolsService.CloseTimer();
        this.flagActivateSave = false;
        this.router.navigate(['/dashboard/posts/my-posts']);
        this.utilToolsService.successNotif('Nuevo Post', 'Post registrado con exito');

      },
      err => {
        this.utilToolsService.CloseTimer();
        this.flagActivateSave = false;
        this.utilToolsService.errNotif('Nuevo Post', 'Ocurrió un error');
        console.error(err);
      }
    );
  }
}