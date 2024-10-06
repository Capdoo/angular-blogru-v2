import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewPostComponent } from './new-post/new-post.component';
import { MyPostsComponent } from './my-posts/my-posts.component';

const routes: Routes = [
  {
    path: 'new-post',
    component: NewPostComponent
  },
  {
    path: 'my-posts',
    component: MyPostsComponent,
  },
  {
    path: '**',
    redirectTo: 'my-posts'
  }
];

@NgModule({
  declarations: [
    NewPostComponent,
    MyPostsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: []
})
export class PostsRoutingModule { }
