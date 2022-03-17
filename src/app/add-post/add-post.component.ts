import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostblogService } from '../postblog.service';
import { PostPayload } from '../postpayload';
import { FormGroup, FormControl } from '@angular/forms';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {

  form: any = {
    title: null,
    body: null
  };
  addPostForm!: FormGroup;
  postPayload!: PostPayload;
  title = new FormControl('');
  body = new FormControl('');

  constructor(private blogService: BlogService, private router: Router) {
    this.addPostForm = new FormGroup({
      title: this.title,
      body: this.body
    })
    this.postPayload = {
      id: '',
      content: '',
      title: '',
      username: ''
    }
   }
   

  ngOnInit(): void {
  }

  addPost() {
  
    this.postPayload.title = this.form.title;
    this.postPayload.content = this.form.body;
    this.blogService.addPost(this.postPayload).subscribe(data =>{

      this.router.navigateByUrl('/');
    }, error =>{
      console.log('Failure Response');
    })
  }
}
