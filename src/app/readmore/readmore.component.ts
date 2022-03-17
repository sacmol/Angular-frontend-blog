import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from '../blog.service';
import { PostPayload } from '../postpayload';

@Component({
  selector: 'app-readmore',
  templateUrl: './readmore.component.html',
  styleUrls: ['./readmore.component.scss']
})
export class ReadmoreComponent implements OnInit {

  blog!: PostPayload;
  permaLink!: Number;
  constructor(private blogService: BlogService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.blog = {
      id: '',
      title: '',
      content:'',
      username:''
    };
    this.router.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.blogService.getPost(this.permaLink).subscribe((data:PostPayload) => {
      this.blog = data;
    },(err: any) => {
      console.log('Failure Response');
    })
    
  }  
}
