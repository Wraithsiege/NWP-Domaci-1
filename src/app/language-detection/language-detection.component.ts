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
    detectedLangs: []
  }

  langDetectionForm: FormGroup;

  textCleaner: boolean = false;

  constructor(private route: ActivatedRoute, private postService: PostService, private formBuilder: FormBuilder) {
    this.langDetectionForm = this.formBuilder.group( {
      text: ['', Validators.required],
      token: [localStorage.getItem('token'), Validators.required]
    })
  }

  ngOnInit(): void {
    console.log("Language Detection Access Granted");
  }

  detectLanguage(): void {
    this.postService.detectLanguage(this.langDetectionForm.get('text')?.value, this.checkboxOnClick() ,this.langDetectionForm.get('token')?.value).subscribe( (langDetection) => {
      this.langDetection = langDetection;

      const paragraph = document.getElementById("paragraph");

      if(paragraph?.innerHTML != undefined) {
        paragraph.innerHTML = "";
      }

      for(let i = 0; i < this.langDetection.detectedLangs.length; i++) {

        let breakLine = document.createElement("br");
        breakLine.id = i.toString();

        paragraph?.append(`Language ${i+1}: ` + langDetection.detectedLangs[i].lang.toUpperCase() +
          " - Confidence Level: " + (langDetection.detectedLangs[i].confidence * 100).toFixed(2) + "%");

        paragraph?.appendChild(breakLine);

      }
    })
  }

  checkboxOnClick() {
    if(this.textCleaner == false) {
      return false;
    }
    else {
      return true;
    }
  }

  protected readonly JSON = JSON;
}
