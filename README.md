# Ionic2 - Observable Dataservice

Author: CodeDee

Contributor: sktw666

This repository is built on top ionic2-template-nav-menu repository, it consists of a data service class and a sample callback function. If you would like to learn how to implement this into your Ionic2 projects, please continue to the section below.

## Getting started

1. Change directory to your ionic2 project
    ```
    cd ionic2-project
    ```

2. Create a provider with the name "data-service", you could name it to your preference
    ```
    ionic g provider data-service
    ```
    This is how your project repository looks like:
    
        |-- ionic2-project
            |-- app
                |-- pages
                |-- providers
                    |-- data-service
                        |-- data-service.ts    <-- you will get this
                ...
            ...
    
3. Import relevant dependencies to your data-service.ts
    ```
        import { Injectable } from '@angular/core';
        import { Http, Headers, RequestOptions, RequestMethod, Response } from '@angular/http';
        import { Observable } from 'rxjs/Rx';
        import 'rxjs/add/operator/map';
    ```

4. Define an interface class for callback purpose, put this code outside of your class
    ```
        export interface PostResponse {
            successCallback(postResult: String);
            failCallback(error: any);
        }
    ```

5. In DataService class, add following codes:

    1. initialise PostResponse
        ```
            postResponse: PostResponse;
        ```
        
    2. call service method that will return  you with Observable
        ```
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
        ```
        
    3. add handler for success and fail scenario
        ```
            private postResultHandler(response: any) {
                 //handle your http response here
                this.postResponse.successCallback(JSON.stringify(response));
            }
            
            private postErrorHandler(error: any) {
                //handle your error here
                this.postResponse.failCallback(error);
            }
        ```
        
    4. expose a method named "connectHttpPost" to make available to all classes to use
        ```
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
        ```
    
    You are now completed your data service providers ready to be called in other pages.

6. To use Providers in Page, follow the steps here:

    1. Import DataService & PostResponse to your <page>.ts
        ```
            import { DataService, PostResponse } from '../../providers/data-service/data-service';
        ```
        
    2. Add your DataService into @Component
        ```
            @Component({
                templateUrl: 'build/pages/service/service.html',
                providers: [DataService]
            })
        ```
        
    3. Your page should implement RestResponse for callback function
        ```
            export class ServicePage implements PostResponse {
        ```
        
    4. Implement interface classes here
        ```java
            successCallback(result: String) {
                //handle your result here
                alert("Result :: " + result);
            }
            
            failCallback(error: any) {
                //handle failed http post scenario
                alert("Error :: " + error);
            }
        ```
        
    5. Add your dataservice to your page's constructor
        ```java
            constructor(private navCtrl: NavController, private dataService:DataService) {}
        ```
        
    6. Create a method to be triggered from UI action or for class to consume
        ```
            connect() {
<<<<<<< HEAD
                //this is the JSON body that of your request
                let bodyObj = { 'lastModifiedDt': '0' };
=======
                //this is the JSON body of your request
                let bodyObj = {
                    //your HTTP POST request body here
                };
>>>>>>> 6a5290e44c47ac91c0e0e0af20f4037bd0b4b58d
                
                //establish connection and register callback method into it
                this.dataService.connectHttpPost(bodyObj, this);
            }
        ```
        
7. Now you would like to trigger it from a button
    ```html
    <button block primary outline (click)='connect()'>HTTP POST</button>
    ```

8. HTTP POST do not function if you are using ionic serve, deploy the project to your device to test it.
    ```
    ionic run android
    ```

To hands-on, clone this repo then replace the HTTP POST parameters to yours then run it.

You should be able to expand your awesome-app development from here.

