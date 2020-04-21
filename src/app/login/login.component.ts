import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { Login } from '../models/login-model';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { xml2js } from 'xml2js';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Login Fields
  UserName: string;
  UserPassword: string;
  jsonData: any;
  ObjectKeys: any = Object.keys;
  resultCode: string;
  // Password Masking
  hide = true;

  public xmlItems: any; 

  readonly WSEndpoint = "http://localhost/MW/V01/MW_Security/MW_Security.asmx";

  constructor(private router: Router, private service: LoginService, private http:HttpClient) { }

  ngOnInit(): void {
  }

  portalLogin()
  {
    // HEADER
    const loginHeaders = new HttpHeaders()
    .set('content-type', 'text/xml; charset=utf-8');

    // BODY
    var loginBody = "<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><AuthenticateADUserRequest xmlns='http://tempuri.org/'><UserName>" + this.UserName + "</UserName><UserPassword>" + this.UserPassword + "</UserPassword></AuthenticateADUserRequest></soap:Body></soap:Envelope>";

    this.http.post(this.WSEndpoint + '?op=AuthenticateADUser', loginBody, { 'headers': loginHeaders, responseType: 'text' as 'text' }).subscribe((data) => {
      this.parseXML(data).then((data) => {
        this.xmlItems = data;
      });
    });
  }

  // portalLogin()
  // {
  //   this.service.postLogin(this.UserName, this.UserPassword).subscribe((data) => {
  //     this.parseXML(data).then((data) => {
  //       this.xmlItems = data;
  //     });
  //   });


  //   // >>>>>> OLD CODE <<<<<

  //   // this.service.postLogin(this.UserName, this.UserPassword).subscribe((data) => {
  //   //   console.warn('Json data received:', data);
  //   //   this.jsonData = data;

  //      //On Success do the routing
  //     //  this.router.navigate(['/portal'])
  //     //  .then(success => console.log('navigation success?' , success))
  //     //  .catch(console.error);
  //   // },
  //   // (err) => {
  //   //   console.warn('Login Service Error from i-Con:', err);
  //   // });
  // }

  parseXML(data) {
    console.warn("parseXML Stage: " + data);
    return new Promise(resolve => {  
      var k: string | number,  
        arr = [],  
        parser = new xml2js.Parser(  
          {  
            trim: true,  
            explicitArray: true,
            strict: false 
          });  
      parser.parseString(data, function (err, result) {  
        var obj = result.Result;  
        for (k in obj.emp) {  
          var item = obj.emp[k];  
          arr.push({  
            ResultCode: item.id[0],  
            ResultDescription: item.name[0],  
          });  
        }  
        resolve(arr);  
      });  
    }); 
  }

}
