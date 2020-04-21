import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/models/login-model';
import { Observable, throwError } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  readonly WSEndpoint = "http://localhost/MW/V01/MW_Security/MW_Security.asmx";

  postLogin(UserName: string, UserPassword: string)
  {
    // HEADER
    const loginHeaders = new HttpHeaders()
    .set('content-type', 'text/xml; charset=utf-8');

    let headerOptions = {
      headers: new HttpHeaders(
          {'content-type':'text/xml; charset=utf-8'}),
            responseType:'text' as 'text'
      }

    // BODY
    var loginBody = "<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><AuthenticateADUserRequest xmlns='http://tempuri.org/'><UserName>" + UserName + "</UserName><UserPassword>" + UserPassword + "</UserPassword></AuthenticateADUserRequest></soap:Body></soap:Envelope>";

    return this.http.post(this.WSEndpoint + '?op=AuthenticateADUser', loginBody, { 'headers': loginHeaders});
  }

  // postLogin(UserName: string, UserPassword: string)
  // {
  //   // HEADER
  //   const loginHeaders = new HttpHeaders()
  //   .set('content-type', 'text/xml; charset=utf-8');

  //   // BODY
  //   var loginBody = "<?xml version='1.0' encoding='utf-8'?><soap:Envelope xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' xmlns:xsd='http://www.w3.org/2001/XMLSchema' xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'><soap:Body><AuthenticateADUserRequest xmlns='http://tempuri.org/'><UserName>" + UserName + "</UserName><UserPassword>" + UserPassword + "</UserPassword></AuthenticateADUserRequest></soap:Body></soap:Envelope>";

  //   return this.http.post(this.WSEndpoint + '?op=AuthenticateADUser',
  //   loginBody,
  //   { 'headers': loginHeaders, responseType: 'text' as 'text' })
  //   .pipe(
  //     map((xmlString: string)=>{
  //       const asJson = this.xmlStringToJson(xmlString);
  //       return asJson;
  //     }),
  //     catchError((err)=> {
  //       console.warn('INT ERR:', err);
  //       return err;     
  //     })
  //   );
  // }

  xmlStringToJson(xml: string)
  {
    // Convert the XML string to an XML Document.
    const oParser = new DOMParser();
    const oDOM = oParser.parseFromString(xml, "application/xml");
    // Convert the XML Document to a JSON Object.
    return this.xmlToJson(oDOM);
  }

  xmlToJson(xml)
  {
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
        for (var j = 0; j < xml.attributes.length; j++) {
          var attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType == 3) { // text
      obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
      for(var i = 0; i < xml.childNodes.length; i++) {
        var item = xml.childNodes.item(i);
        var nodeName = item.nodeName;
        if (typeof(obj[nodeName]) == "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) == "undefined") {
            var old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }
    return obj;
  }

}
