import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HashtagService } from '../hashtag.service';
import { Post } from '../post';

@Component({
  selector: 'app-hashtag-list',
  templateUrl: './hashtag-list.component.html',
  styleUrls: ['./hashtag-list.component.scss']
})
export class HashtagListComponent implements OnInit {

  subscription: Subscription;
  posts: Post[];

  constructor(private hashtagService: HashtagService) { }

  ngOnInit() {
    this.subscription = this.hashtagService.getPosts()
    .subscribe(list => {
        this.posts = list;
    });
  }
}
