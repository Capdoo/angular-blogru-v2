import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PostsRoutingModule
  ]
})
export class PostsModule { }
