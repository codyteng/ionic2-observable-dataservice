import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, RequestMethod, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

/*
  Interface class for callback purpose
*/
export interface PostResponse {
  successCallback(postResult: String);
  failCallback(error: any);
}

/*
  Generated class for the DataService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataService {
  postResponse: PostResponse;

  constructor(private http: Http) { }

  //replace the restURL to your HTTP POST URL
  private restURL = 'http://yourRestServiceURL/method';
  private restHeader = { 'Content-Type': 'application/json' };

  connectHttpPost(body: Object, postResponse: PostResponse) {
    this.postResponse = postResponse;

    this.callService(body)
      .subscribe(
      response => { this.postResultHandler(response) },
      error => { this.postErrorHandler(error) }
      );
  }

  private callService(body: Object): Observable<Comment[]> {
    let bodyString = JSON.stringify(body);
    let headers = new Headers(this.restHeader);
    let options = new RequestOptions({
      headers: headers,
      method: RequestMethod.Post
    });

    return this.http.post(this.restURL, bodyString, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error));
  }

  private postResultHandler(response: any) {
    //handle your http response here
    this.postResponse.successCallback(JSON.stringify(response));
  }

  private postErrorHandler(error: any) {
    //handle your error here
    this.postResponse.failCallback(error);
  }
}

