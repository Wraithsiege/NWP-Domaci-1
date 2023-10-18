import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators"
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

    return this.httpClient.get<any>(`https://api.dandelion.eu/datatxt/li/v1/?text=${text}&token=${token}`)
/*
    return this.httpClient.post<any>(`https://api.dandelion.eu/datatxt/li/v1/?text=${text}&token=${token}`, {

    });*/
  }


}
