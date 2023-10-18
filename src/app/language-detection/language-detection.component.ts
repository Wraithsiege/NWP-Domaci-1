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
    confidence: 0,
    final: ''
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

      const paragraph = document.getElementById("paragraph");
      const remover = document.createElement("del");

      if(paragraph?.innerHTML != undefined) {
        paragraph.innerHTML = "";
      }

      for(let i = 0; i < this.langDetection.detectedLangs.length; i++) {

        let breakLine = document.createElement("br");
        breakLine.id = i.toString();


        paragraph?.append(`Language ${i+1}: ` + langDetection.detectedLangs[i].lang.toUpperCase() +
          " - Confidence Level: " + (langDetection.detectedLangs[i].confidence * 100).toFixed(2) + "%");

        paragraph?.appendChild(breakLine);



        /*langDetection.final += `Language${i+1}: ` + langDetection.detectedLangs[i].lang.toUpperCase() +
          " Confidence level: " + (langDetection.detectedLangs[i].confidence * 100).toFixed(2) + "%";*/
      }

      //langDetection.final = langDetection.final.replace('undefined', '');

    })
  }

  protected readonly JSON = JSON;
}
