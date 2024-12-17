import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostDto } from '../../pages/posts/interfaces/post-dto';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url: string = environment.urlAddress;

  constructor(private httpClient: HttpClient) { }

  public getPosts(): Observable<PostDto[]> {
    const url = `${this.url}/api/posts/read`;
    return this.httpClient.get<PostDto[]>(url);
  }

  public getPostsByUser(): Observable<PostDto[]> {
    const url = `${this.url}/api/posts/read/user`;

    return this.httpClient.get<PostDto[]>(url);
  }

  public getPostsByTopicId(topicId: string): Observable<PostDto[]> {
    const url = `${this.url}/api/posts/read/topic/${topicId}`;

    return this.httpClient.get<PostDto[]>(url);
  }

  public getPostsBySubTopicId(subTopicId: string): Observable<PostDto[]> {
    const url = `${this.url}/api/posts/read/subtopic/${subTopicId}`;

    return this.httpClient.get<PostDto[]>(url);
  }

  public deletePost(id: number): Observable<PostDto> {
    const url = `${this.url}/api/posts/delete/${id}`;
    return this.httpClient.delete<PostDto>(url);
  }

  public createPost(postDto: PostDto): Observable<PostDto> {
    const url = `${this.url}/api/posts/create`;
    return this.httpClient.post<PostDto>(url, postDto);
  }

  public updatePost(postDto: PostDto): Observable<PostDto> {
    const url = `${this.url}/api/posts/update/${postDto.id}`;
    return this.httpClient.put<PostDto>(url, postDto);
  }

  public getPostById(postId: string): Observable<PostDto> {
    const url = `${this.url}/api/posts/read/${postId}`;
    return this.httpClient.get<PostDto>(url);
  }


}
