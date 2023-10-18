import {Component, OnInit} from '@angular/core';
import {PostService} from "../services/post.service";
import {PostTextSimilarity} from "../model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-text-similarity',
  templateUrl: './text-similarity.component.html',
  styleUrls: ['./text-similarity.component.css']
})
export class TextSimilarityComponent implements OnInit {

  postTX: PostTextSimilarity = {
    text1: '',
    text2: '',
    token: '',
    similarity: 0
  };

  textForm: FormGroup;

  constructor(private route: ActivatedRoute, private postService: PostService, private formBuilder: FormBuilder) {
    this.textForm = this.formBuilder.group({
      text1: ['', Validators.required],
      text2: ['', Validators.required],
      token: [localStorage.getItem('token'), Validators.required]
    })
  }

  ngOnInit() {
    console.log("Text Similarity Access Granted");
  }

  checkTextSimilarity() {
    this.postService.checkTextSimilarity(this.textForm.get('text1')?.value, this.textForm.get('text2')?.value, this.textForm.get('token')?.value).subscribe((postTX) => {
      this.postTX = postTX;
    })
  }


}
