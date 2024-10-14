import { Injectable } from '@angular/core';
import { PostDto } from '../../pages/posts/interfaces/post-dto';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public postId: number;
  public post: PostDto;
  public flagEdit: boolean;
  
  constructor() { }

  public setPostId(postId): void {
    this.postId = postId;
  }

  public setPost(post: PostDto): void {
    this.post = post;
  }

  public getPostId(): number {
    return this.postId;
  }

  public getPost(): PostDto {
    return this.post;
  }

  public setFlagEdit(flagEdit: boolean): void {
    this.flagEdit = flagEdit;
  }

  public getFlagEdit(): boolean {
    return this.flagEdit;
  }


}
