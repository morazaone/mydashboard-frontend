// src/app/pages/external-api/external-api.component.ts

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment as env } from '../../../environments/environment';

interface Message {
  message: string;
  content: string;
}
 
@Component({
  selector: 'app-external-api',
  templateUrl: './external-api.component.html',
})
export class ExternalApiComponent implements OnInit {
  message: string = null;
  content: string = null;
  contentInput: string = null;
 
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  callApi(): void {
    let options = {
      headers: new HttpHeaders().set("Access-Control-Allow-Origin", "*"),
    };

let r;
    this.http
      .get(`${env.dev.serverUrl}/messages/public-message`,  options )
      .subscribe((result: Message) => {
        this.message = result.message;
        console.log("entered");

        r = result;
      });
      console.log("entered");
      setTimeout(() => {     
        console.log(r);
      }, 2000)
 
  }

  callSecureApi(): void {
    this.http
      .get(`${env.dev.serverUrl}/messages/protected-message`)
      .subscribe((result: Message) => {
        this.message = result.message;
      });
  }

}
 