import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfigurationComponent} from "./configuration/configuration.component";
import {EntityExtractionComponent} from "./entity-extraction/entity-extraction.component";
import {LanguageDetectionComponent} from "./language-detection/language-detection.component";
import {SentimentAnalysisComponent} from "./sentiment-analysis/sentiment-analysis.component";
import {TextSimilarityComponent} from "./text-similarity/text-similarity.component";
import {AuthGuard} from "./auth.guard";

const routes: Routes = [
  {
    path: "configuration",
    component: ConfigurationComponent
  },
  {
    path: "entityExtraction",
    component: EntityExtractionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "languageDetection",
    component: LanguageDetectionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "sentimentAnalysis",
    component: SentimentAnalysisComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "textSimilarity",
    component: TextSimilarityComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
