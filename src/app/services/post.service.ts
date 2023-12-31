import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment"


@Injectable({
  providedIn: 'root'
})

export class PostService {

  private readonly apiUrl = environment.postApi;

  constructor(private httpClient: HttpClient) { }

  checkTextSimilarity(text1: string, text2: string, token: string): Observable<any> {

    return this.httpClient.get<any>(`https://api.dandelion.eu/datatxt/sim/v1/?text1=${text1}&text2=${text2}&token=${token}`);
  }

  detectLanguage(text: string, textCleaner: boolean, token: string): Observable<any> {

    return this.httpClient.get<any>(`https://api.dandelion.eu/datatxt/li/v1/?text=${text}&clean=${textCleaner}&token=${token}`)

  }

  getEntityExtraction(text: string, min_confidence: number, include: string, token: string): Observable<any> {

    return this.httpClient.get<any>(`https://api.dandelion.eu/datatxt/nex/v1/?text=${text}&min_confidence=${min_confidence}&include=types%2C${include}&token=${token}`);

  }

  returnSentimentAnalysis(text: string, token: string, language: string): Observable<any> {

    return this.httpClient.get<any>(`https://api.dandelion.eu/datatxt/sent/v1/?lang=${language}&text=${text}&token=${token}`);


  }


}
