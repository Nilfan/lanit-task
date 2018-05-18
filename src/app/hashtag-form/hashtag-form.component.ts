import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HashtagService } from '../hashtag.service';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../post';


@Component({
    selector: 'app-hashtag-form',
    templateUrl: './hashtag-form.component.html',
    styleUrls: ['./hashtag-form.component.scss']
})
export class HashtagFormComponent implements OnInit {

    hashtagControl: FormControl;
    posts: Post[];
    currentHashtag: String;

    constructor(private hashtagService: HashtagService) {
        this.hashtagControl = new FormControl('', [
                Validators.required,
                Validators.pattern('\#[a-zA-Z0-9]*')
        ]);
        this.currentHashtag = '';
     }

    ngOnInit() {
    }

    submit() {
        if (this.hashtagControl.valid && (this.currentHashtag !== this.hashtagControl.value)) {
            this.currentHashtag = this.hashtagControl.value;
            this.hashtagService.setPosts(this.currentHashtag.toString());
            this.hashtagControl.setValue('');
            this.hashtagControl.markAsUntouched();
        }
    }
}
