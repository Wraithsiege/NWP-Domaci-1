import {Component, OnInit} from '@angular/core';
import {getSentimentAnalysis} from "../model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-sentiment-analysis',
  templateUrl: './sentiment-analysis.component.html',
  styleUrls: ['./sentiment-analysis.component.css']
})
export class SentimentAnalysisComponent implements OnInit{

  sentimentAnalysis: getSentimentAnalysis = {
    text: '',
    timestamp: '',
    sentiment: []
  }

  sentimentAnalysisForm: FormGroup

  radioButton: string = "";
  score: number = 0;
  type: string = '';

  dateAndTime: string = '';

  constructor(private route: ActivatedRoute, private postService: PostService, private formBuilder: FormBuilder) {
    this.sentimentAnalysisForm = this.formBuilder.group( {
      text: ['', Validators.required],
      token: [localStorage.getItem('token'), Validators.required]
    })
  }

  ngOnInit(): void {
    console.log("Sentiment Analysis Access Granted!");
  }

  returnSentimentAnalysis() {
    this.postService.returnSentimentAnalysis(this.sentimentAnalysisForm.get('text')?.value, this.sentimentAnalysisForm.get('token')?.value, this.radioButton).subscribe( (sentimentAnalysis) => {
      this.sentimentAnalysis = sentimentAnalysis;

      this.score = sentimentAnalysis.sentiment.score;
      this.type = sentimentAnalysis.sentiment.type;

      let paragraph = document.getElementById('history');
      let newLine = document.createElement("br");

      this.dateAndTime = sentimentAnalysis.timestamp;

      let customDateAndTime = this.customDateTime(this.dateAndTime);

      paragraph?.append(customDateAndTime + " GET " + `https://api.dandelion.eu/datatxt/sent/v1/?lang=${this.radioButton}&text=${this.sentimentAnalysisForm.get('text')?.value}&token=${this.sentimentAnalysisForm.get('token')?.value}`);

      paragraph?.appendChild(newLine);

    })
  }

  showHistory() {
    // @ts-ignore
    if(!document.getElementById('history').hidden){
      // @ts-ignore
      document.getElementById('history').hidden = true;
      // @ts-ignore
      document.getElementById('btnHistory').textContent = "Show History";
    }
    // @ts-ignore
    else if(document.getElementById('history').hidden) {
      // @ts-ignore
      document.getElementById('history').hidden = false;
      // @ts-ignore
      document.getElementById('btnHistory').textContent = "Hide History";
    }
  }

  customDateTime(dateAndTime: string) {
    let dateAndTimeSeparated = dateAndTime.split("T");
    let timeHundredthSeparated = dateAndTimeSeparated[1].split(".");
    let dateSeparated = dateAndTimeSeparated[0].split("-");
    let customDateAndTime ="[" + dateSeparated[2] + "." + dateSeparated[1] + "." + dateSeparated[0] + ". " + timeHundredthSeparated[0] + " (GMT)]";
    return customDateAndTime;
  }

  protected readonly JSON = JSON;
}
