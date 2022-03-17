import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from './blog';
import { PostPayload } from './postpayload';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
 token!:string;
  private baseURL = "http://localhost:8080/api/posts";
  private baseURL1 = "http://localhost:8080/test/all";
  constructor(private httpClient: HttpClient, private localStoraqeService: LocalStorageService) { 
    // this.token = this.localStoraqeService.retrieve('authenticationToken');
  }


  addPost(postPayload: PostPayload){
    // this.token = this.localStoraqeService.retrieve('authenticationToken');
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*',
    //   'Access-Control-Allow-Headers': 'Content-Type',
    //   'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    //   'Authorization': 'Bearer '+ this.token,
    // });
    // console.log(headers);
    return this.httpClient.post('http://localhost:8080/api/posts/', postPayload);
  }
  
  getAllBlogs(): Observable<Blog[]>{
  
   
    return this.httpClient.get<Blog[]>(`${this.baseURL}`+"/all");
  }

  getPost(permaLink: Number):Observable<PostPayload>{
    return this.httpClient.get<PostPayload>('http://localhost:8080/api/posts/get/' + permaLink);
  }
  
  // getBlogById(id: number): Observable<Blog>{

  //   return this.httpClient.get<Blog>(`${this.baseURL}/${id}`);
  // }
}
