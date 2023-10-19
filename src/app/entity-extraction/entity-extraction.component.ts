import {Component, OnInit} from '@angular/core';
import {GetEntityExtraction} from "../model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../services/post.service";

@Component({
  selector: 'app-entity-extraction',
  templateUrl: './entity-extraction.component.html',
  styleUrls: ['./entity-extraction.component.css']
})
export class EntityExtractionComponent implements OnInit{

  entityExtraction: GetEntityExtraction = {
    text: '',
    min_confidence: 0,
    include: '',
    annotations: [],
    label: '',
    image: '',
    categories: '',
    abstract: ''
  }

  images: boolean = false;
  abstract: boolean = false;
  categories: boolean = false;

  entityExtractionForm: FormGroup;

  includeOptions: string = '';

  constructor(private route: ActivatedRoute, private postService: PostService, private formBuilder: FormBuilder) {
    this.entityExtractionForm = this.formBuilder.group( {
      text: ['', Validators.required],
      //include: [this.checkboxValues()],
      token: [localStorage.getItem('token'), Validators.required]
    })
  }

  ngOnInit(): void {
    console.log("Entity Extraction Access Granted!");
  }

  getEntityExtraction(): void {
    console.log(this.entityExtraction.min_confidence);
    this.postService.getEntityExtraction(this.entityExtractionForm.get('text')?.value, this.rangeValue(), this.checkboxValues(), this.entityExtractionForm.get('token')?.value).subscribe( (entityExtraction => {
      this.entityExtraction = entityExtraction;

      console.log(this.entityExtraction.annotations.length);

      const paragraph = document.getElementById("paragraph");

      if(paragraph?.innerHTML != undefined) {
        paragraph.innerHTML = "";
      }

      for(let i = 0; i < this.entityExtraction.annotations.length; i++) {

        let breakLineA = document.createElement("br");
        breakLineA.id = i.toString() + "A";
        let breakLineB = document.createElement("br");
        breakLineB.id = i.toString() + "B";
        let breakLineC = document.createElement("br");
        breakLineC.id = i.toString() + "C";
        let breakLineD = document.createElement("br");
        breakLineD.id = i.toString() + "D";
        let breakLineE = document.createElement("br");
        breakLineE.id = i.toString() + "E";
        let breakLineF = document.createElement("br");
        breakLineF.id = i.toString() + "F";
        let breakLineG = document.createElement("br");
        breakLineG.id = i.toString() + "G";
        let breakLineH = document.createElement("br");
        breakLineH.id = i.toString() + "H";

        let horizontalLineA = document.createElement("hr");
        horizontalLineA.id = i.toString() + "AHR";
        let horizontalLineB = document.createElement("hr");
        horizontalLineB.id = i.toString() + "BHR";

        let image = document.createElement("img");
        image.id = i.toString() + "IMG";

        paragraph?.append(horizontalLineA);

        if(this.abstract == true) {
          paragraph?.append(entityExtraction.annotations[i].label.toUpperCase() + ": " + "(Abstract Definition) " + entityExtraction.annotations[i].abstract);
          paragraph?.appendChild(breakLineA);
          if(this.categories == true || this.images == true) {
            paragraph?.appendChild(breakLineB);
          }
        }

        if(this.categories == true) {
          paragraph?.append(entityExtraction.annotations[i].label.toUpperCase() + ": " + "(Categories) " + entityExtraction.annotations[i].categories);
          paragraph?.appendChild(breakLineC);
          if(this.images == true) {
            paragraph?.appendChild(breakLineD);
          }
        }

        if(this.images == true) {
          image.src = entityExtraction.annotations[i].image.thumbnail;
          paragraph?.appendChild(image);
          paragraph?.appendChild(breakLineE);
          paragraph?.appendChild(breakLineF)
          paragraph?.append(entityExtraction.annotations[i].label.toUpperCase())
        }

        paragraph?.append(breakLineG);
        paragraph?.append(horizontalLineB);
        paragraph?.append(breakLineH);

      }
    }))
  }

  rangeValue() {
    return this.entityExtraction.min_confidence
  }

  checkboxValues() {
    if(this.images == true) {
      if(!this.includeOptions.includes("image")) {
        this.includeOptions += "image,";
      }
    }
    else if(this.images == false) {
      if(this.includeOptions.includes("image")) {
        this.includeOptions = this.includeOptions.replace("image,", "");
      }
    }
    if(this.abstract == true) {
      if(!this.includeOptions.includes("abstract")) {
        this.includeOptions += "abstract,";
      }
    }
    else if(this.abstract == false) {
      if(this.includeOptions.includes("abstract")) {
        this.includeOptions = this.includeOptions.replace("abstract,", "");
      }
    }
    if(this.categories == true) {
      if(!this.includeOptions.includes("categories")) {
        this.includeOptions += "categories,"
      }
    }
    else if(this.categories == false) {
      if(this.includeOptions.includes("categories")) {
        this.includeOptions = this.includeOptions.replace("categories,", "");
      }
    }


    return this.includeOptions;


  }

}
