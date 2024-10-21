import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostDto, SubtopicDto } from '../../pages/posts/interfaces/post-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url: string = environment.urlAddress;

  constructor(private httpClient: HttpClient) { }

  public getAllSubtopics(): Observable<SubtopicDto[]> {
    const url = `${this.url}/api/subtopics`;
    return this.httpClient.get<SubtopicDto[]>(url);
  }

  public getCategoriesByTopic(topicId: string): Observable<SubtopicDto[]> {
    const url = `${this.url}/api/subtopics/read/topic/${topicId}`;
    return this.httpClient.get<SubtopicDto[]>(url);
  }

}
