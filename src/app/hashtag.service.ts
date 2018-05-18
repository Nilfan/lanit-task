import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class HashtagService {


    posts: Post[];
    obsPosts: Observable<Post[]>;
    private objObserver: any;
    public hashtags: string[];

    constructor(private httpClient: HttpClient) {
        // tslint:disable-next-line:max-line-length
        this.hashtags = ['sport', 'life', 'space', 'math', 'music', 'business', 'art', 'science', 'computers', 'photo'];
        this.httpClient.get<Post[]>('https://jsonplaceholder.typicode.com/comments').subscribe(value => {
            this.posts = value;
            this.posts.map(post => post.body = post.body + ' #' + this.hashtags[(new Date()).getMilliseconds() % 10]);
        });
        this.obsPosts = new Observable<Post[]>();
    }

    setPosts(hashtag: string): void {
        this.obsPosts = new Observable((localObserver) => {
            this.objObserver = localObserver; // Convert this.objObserver from any to an observer object
            this.objObserver.next(this.posts.filter(post => post.body.includes(hashtag)));
        });
    }
    getPosts(): Observable<Post[]> {
        return this.obsPosts;
    }

}
