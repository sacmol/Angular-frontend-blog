import { Component, OnInit } from '@angular/core';
import { Blog } from '../blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  blogs: Blog[] = [];
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {

    this.retrieveAllBlogs();
  }

  retrieveAllBlogs(){
    this.blogService.getAllBlogs().subscribe((data: Blog[])=>{
      this.blogs = data;
    })
  }
}
