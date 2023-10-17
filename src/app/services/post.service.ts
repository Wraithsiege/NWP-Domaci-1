import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators"
import {environment} from "../../environments/environment"


@Injectable({
  providedIn: 'root'
})

export class PostService {

  valueFromServer: any = null;

  private readonly apiUrl = environment.postApi;

  constructor(private httpClient: HttpClient) { }

  checkTextSimilarity(text1: string, text2: string, token: string): Observable<any> {
    //console.log(text1);
    //console.log(text2);

    return this.httpClient.get<any>(`https://api.dandelion.eu/datatxt/sim/v1/?text1=${text1}&text2=${text2}&token=${token}`);

  }

}
