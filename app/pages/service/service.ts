import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService, PostResponse } from '../../providers/data-service/data-service';

/*
  Generated class for the ServicePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/service/service.html',
  providers: [DataService]
})
export class ServicePage implements PostResponse {

  constructor(private navCtrl: NavController, private dataService:DataService) {}

  successCallback(result: String) {
    //handle your result here
    alert("Result :: " + result);
  }

  failCallback(error: any) {
    //handle failed http post scenario
    alert("Error :: " + error);
  }

  connect() {
    //this is the JSON body of your request
    let bodyObj = {
      //your HTTP POST request body here
    };

    //establish connection
    this.dataService.connectHttpPost(bodyObj, this);
  }

}
