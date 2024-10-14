import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostDto, TopicDto } from '../../pages/posts/interfaces/post-dto';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  url: string = environment.urlAddress;

  constructor(private httpClient: HttpClient) { }

  public getAllTopics(): Observable<TopicDto[]> {
    const url = `${this.url}/api/topics`;
    return this.httpClient.get<TopicDto[]>(url);
  }
}
