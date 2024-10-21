import { Component, OnInit, signal, ChangeDetectionStrategy, inject } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { PreviewComponent } from '../components/preview/preview.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-redact',
  templateUrl: './redact.component.html',
  styleUrl: './redact.component.css',
  providers: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class RedactComponent implements OnInit {

  redactPostFormGroup!: FormGroup;
  readonly panelOpenState = signal(false);
  listSections: SectionDto[] = [];
  matcher = new MyErrorStateMatcher();
  listTopics: TopicDto[];
  listSubtopics: SubtopicDto[];
  post: PostDto;

  flagActivateSave: boolean = false;
  flagActivatePreview: boolean = false;

  flagCreate: boolean = false;

  readonly dialog = inject(MatDialog);


  constructor(private _formBuilder: FormBuilder,
    private postsService: PostsService,
    private utilToolsService: UtilToolsService,
    private datePipe: DatePipe,
    private router: Router,
    private topicService: TopicsService,
    private categoriesService: CategoriesService,
    private dataService: DataService
  ) { }

  ngOnInit(): void {



    this.utilToolsService.Timer();
    this.topicService.getAllTopics().subscribe(
      data => {
        this.listTopics = data;

        this.listTopics = this.listTopics.map( (e) => {
          e.description = `assets/${e.description}.png`
          return e;
        })

        this.utilToolsService.CloseTimer();
      },
      err => {
        this.utilToolsService.CloseTimer();

        this.utilToolsService.errNotif('Crear/Editar Post', 'Ocurrió un error');
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

        this.utilToolsService.errNotif('Crear/Editar Post', 'Ocurrió un error');
        console.error(err);
      }
    );
    this.utilToolsService.CloseTimer();


    console.log(this.flagCreate);

    this.flagCreate = this.dataService.getFlagEdit() ? false : true;
    console.log("Flag Create - Redact -->", this.flagCreate)

    //first flow -> edit

    this.post = this.dataService.getPost();
    if (this.post == null && this.post == undefined) {
      //create
      this.flagCreate = true;
      this.post = {} as PostDto;
    }

    console.log("CURRENT POST ->")
    console.log(this.post);


    if (this.flagCreate) {
      this.redactPostFormGroup = this._formBuilder.group({
        redactPostTitle: ['', Validators.required],
        redactPostResume: ['', Validators.required],
        redactPostTopic: ['', Validators.required],
        redactPostCategory: ['', Validators.required],
        redactPostListSections: [this.listSections,],
      });
    } else {
      this.redactPostFormGroup = this._formBuilder.group({
        redactPostTitle: [this.post.title, Validators.required],
        redactPostResume: [this.post.summary, Validators.required],
        redactPostTopic: [this.post.topicId, Validators.required],
        redactPostCategory: [this.post.subtopicId, Validators.required],
        redactPostListSections: [this.post.listSectionsDto,],
      });


      setTimeout(() => {

        console.log("Delayed for 1 second.");
        this.redactPostFormGroup.get('redactPostTopic').setValue(this.post.topicId);
        this.redactPostFormGroup.get('redactPostCategory').setValue(this.post.subtopicId);
        this.redactPostFormGroup.get('redactPostListSections').setValue(this.post.listSectionsDto);

        this.listSections = this.post.listSectionsDto;
      }, 1000);



    }

    //flujo create
    if (!this.isValidForm()) {
      this.redactPostFormGroup.get('redactPostCategory').disable();
    } else {
      this.selectTopic();
    }


  }

  selectTopic(): void {
    
    let topicId = this.redactPostFormGroup.get('redactPostTopic').value;
    console.log(topicId);
    
    this.utilToolsService.Timer();
    this.categoriesService.getCategoriesByTopic(topicId).subscribe(
      data => {
        this.listSubtopics = data;
        
        this.listSubtopics = this.listSubtopics.map( (e) => {
          e.description = `assets/${e.description}.png`
          return e;
        })

        if (this.listSubtopics.length > 0) {
          this.redactPostFormGroup.get('redactPostCategory').enable();
        } else {
          this.utilToolsService.errNotif('Crear/Editar Post', 'Ocurrió un error');
        }
        this.utilToolsService.CloseTimer();
      },
      err => {

        this.utilToolsService.errNotif('Crear/Editar Post', 'Ocurrió un error');
        console.error(err);
      }
    )
  }

  // updateImageSource(subtopicDto: SubtopicDto[]): SubtopicDto[] {
  //   let resSubtopicDto: SubtopicDto[];




  //   return resSubtopicDto;
  // }

  isValidForm(): boolean {
    let res: boolean = false;

    if (this.redactPostFormGroup.get('redactPostTitle').valid &&
      this.redactPostFormGroup.get('redactPostResume').valid &&
      this.redactPostFormGroup.get('redactPostTopic').valid &&
      this.redactPostFormGroup.get('redactPostCategory').valid) {
      res = true;
    }

    return res;
  }

  addSection(): void {
    let section: SectionDto = {} as SectionDto;
    this.listSections.push(section);
  }

  previewPost(): void {
    console.log("Flag Edit")
    this.createRequest();

    const dialogRef = this.dialog.open(PreviewComponent, {
      data: this.post,
      width: '90%',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  createRequest(): void {
    this.post.title = this.redactPostFormGroup.get('redactPostTitle').value;
    this.post.summary = this.redactPostFormGroup.get('redactPostResume').value;
    this.post.topicId = this.redactPostFormGroup.get('redactPostTopic').value;
    this.post.subtopicId = this.redactPostFormGroup.get('redactPostCategory').value;
    this.post.listSectionsDto = this.redactPostFormGroup.get('redactPostListSections').value;
    console.log(this.post);
  }

  runPost(): void {

    if (this.post.id == undefined || this.post.id == null) {
      //create
      console.log("Start save post");
      this.savePost();

    } else {
      //update
      console.log("Start update post");
      this.editPost();
    }
  }

  savePost(): void {
    this.flagActivateSave = true;
    this.redactPostFormGroup.markAllAsTouched();
    console.log("#save# Form valid: " + this.redactPostFormGroup.valid);

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

  editPost(): void {
    if (!this.isValidForm()) {
      this.utilToolsService.errNotif('Editar Post', 'Campos incorrectos');
      this.flagActivateSave = false;
      return;
    }

    this.postsService.updatePost(this.post).subscribe(
      data => {
        console.log(data);
        this.utilToolsService.CloseTimer();
        this.flagActivateSave = false;
        this.router.navigate(['/dashboard/posts/my-posts']);
        this.utilToolsService.successNotif('Nuevo Post', 'Post actualizado con exito');
      },
      err => {
        this.utilToolsService.CloseTimer();
        this.flagActivateSave = false;
        this.utilToolsService.errNotif('Editar Post', 'Ocurrió un error');
        console.error(err);
      }
    )
  }

  eliminarSeccion(event): void {
    this.listSections.splice(event, 1);
  }



}
