import {Component, OnInit} from '@angular/core';
import {GetLanguage} from "../model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-language-detection',
  templateUrl: './language-detection.component.html',
  styleUrls: ['./language-detection.component.css']
})
export class LanguageDetectionComponent implements OnInit{

  langDetection: GetLanguage = {
    text: '',
    textCleaner: false,
    detectedLangs: [],
    lang: '',
    confidence: 0
  }

  langDetectionForm: FormGroup;

  constructor(private route: ActivatedRoute, private postService: PostService, private formBuilder: FormBuilder) {
    this.langDetectionForm = this.formBuilder.group( {
      text: ['', Validators.required],
      textCleaner: [false],
      token: [localStorage.getItem('token'), Validators.required]
    })
  }

  ngOnInit(): void {
    console.log("Language Detection Access Granted");
  }

  detectLanguage(): void {
    this.postService.detectLanguage(this.langDetectionForm.get('text')?.value, this.langDetectionForm.get('textCleaner')?.value, this.langDetectionForm.get('token')?.value).subscribe( (langDetection) => {
      this.langDetection = langDetection;
    })
  }


  protected readonly JSON = JSON;
}
