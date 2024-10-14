import { Component, OnInit } from '@angular/core';
import { PostDto } from '../interfaces/post-dto';
import { PostsService } from '../../../shared/services/posts.service';
import { UtilToolsService } from '../../../shared/services/util-tools.service';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { DataService } from '../../../shared/services/data.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];


@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class MyPostsComponent implements OnInit{
  
  listPostsDto: PostDto[];
  flagPosts: boolean = false;
  flagNoPosts: boolean = false;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'view', 'edit'];
  columnas: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  postEdit: PostDto;

  // dataSourcePost: MatTableDataSource;

  constructor(private postsService: PostsService,
    private utilToolsService: UtilToolsService,
    public dialog: MatDialog,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.cargarPosts();
  }

  cargarPosts(): void {
    this.utilToolsService.Timer();
    this.postsService.getPostsByUser().subscribe(
      data => {
        this.listPostsDto = data;
        if (this.listPostsDto.length > 0) {
          this.flagPosts = true;
        } else {
          this.flagNoPosts = true;
        }
        this.utilToolsService.CloseTimer();
      },
      err => {
        this.flagNoPosts = true;
        this.utilToolsService.CloseTimer();
        console.error(err);
        this.utilToolsService.errNotif('Mis Posts', err.error.message);
      }
    );
  }

  deleteMessage(id: number): void {
    Swal.fire({
      title: 'Eliminar Post',
      text: '¿Está seguro(a)?',
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.deletePet(id);
      }
    });
  }

  deletePet(id: number): void {
    this.utilToolsService.Timer();
    this.postsService.deletePost(id).subscribe(
      data => {
        console.log(data);
        this.utilToolsService.CloseTimer();
        this.utilToolsService.successNotif('Eliminar Post', 'Post eliminado correctamente');
        this.cargarPosts();
      },
      err => {
        this.utilToolsService.CloseTimer();
        console.error(err);
        this.utilToolsService.errNotif('Eliminar Post', 'Ocurrió un error');
        return;
      }
    )
  }

  viewPost(postId: string): void {



  }

  editPost(postId: string): void {
    console.log("Start edit post ---> ", postId);
    console.log("Post id ---> ", postId);

    this.utilToolsService.Timer();
    this.postsService.getPostById(postId).subscribe(
      data => {
        this.postEdit = data;
        this.dataService.setPost(this.postEdit);
        this.dataService.setFlagEdit(true);
        console.log("do ---> redirect")
        this.router.navigate(['/dashboard/posts/redact']);
        this.utilToolsService.CloseTimer();
      },
      err => {
        this.utilToolsService.CloseTimer();
        this.utilToolsService.errNotif('ditar Post', 'Ocurrió un error');
        console.error(err);
      }
    )

  }


}
