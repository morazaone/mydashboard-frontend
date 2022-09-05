import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';

interface updateLinkRes {
  message: string,
  status: number,
  oldLink: string,
  updatedText: string,
  html_url: string;

}

@Component({
  selector: 'app-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.css']
})

export class QuickLinksComponent implements OnInit {
 
  recentVideo = true;
  customLink: string = '';
  message :string;
  content :string;
  html_url: string ;

  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {
  }
  onChange(event) {
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    this.recentVideo = (value == 'recentVideo');
    // console.log( this.optionLink);
 }
  getlatestVideo(): void{

    let params = new HttpParams();
    let headers = new HttpHeaders();
    if(!this.recentVideo){// send custom link in params to api call as recentVideo
      params = new HttpParams().set('recentVideo', this.customLink);
    }
    console.log('call to upda-video endpoint');
    this.http
    .get(`${env.dev.serverUrl}/updateVideo/update-video`, {  headers, params })
    .subscribe( ( result:updateLinkRes ) => {
      console.log(result);
      this.message =  `${result.message}`;
      this.content =`Changed: ${result.oldLink} -> ${result.updatedText}`;
      this.html_url = result.html_url;
    });


   }
}
