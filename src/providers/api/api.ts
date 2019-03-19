import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from '@angular/core/src/render3/util';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
  }

  cors:string = 'https://cors-anywhere.herokuapp.com/'
  githubURL:string = 'https://api.github.com/'
  githubTokenUrl:string = this.cors + 'https://github.com/login/oauth/access_token?client_id='
  search:any = 'softstackfactory'
  results:any = {
    access_token: ''
  }
  client_Id:any = '77b4f0d9a42a38fe7949'
  client_Secret:any = 'bb041c31307f2b955ccc0a62a5022fea2b9185fa'
  code:any = {}
  token:any 
  
  user:string = 'Avilpa1';
  repo:string = 'gitIssue';

  body:any = {
    "title": "",
    "body": "",
    "assignees": [ "" ],
    "labels": [ "" ]
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Accept':  'application/json'
    })
  };

  signInWithGithub() {
    window.location.href='https://github.com/login/oauth/authorize' + '?client_id=' + this.client_Id + '&scope=repo,user';
  }

  getCodeFromGithub() {
    let url = window.location.href

    let getParams = function (url) {
      let params = {};
      let parser = document.createElement('a');
      parser.href = url;
      let query = parser.search.substring(1);
      let vars = query.split('&');
      for (let i = 0; i < vars.length; i++) {
        let pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
      }
      return params;
    };
    
    this.code = getParams(url)
    console.log(this.code.code)
  }
  
  getAccessTokenFromGithub() {
    return this.http.post( this.githubTokenUrl + this.client_Id + '&client_secret=' + this.client_Secret + '&code=' + this.code.code, {}, this.httpOptions )
  }

  accessToken() {
    this.getCodeFromGithub()
      this.getAccessTokenFromGithub()
        .subscribe( (response) =>  {
          this.results = response
          this.token = this.results.access_token
          console.log(this.token)  
          // this.postIssue()
    })
  }
 
  postIssueURL:string = 'repos/' + this.user + '/' + this.repo + '/' + 'issues'

  postIssueToUsersRepo() { 
    console.log(this.githubURL + this.postIssueURL + '?access_token=' + this.token)
    return this.http.post( this.githubURL + this.postIssueURL + '?access_token=' + this.token , this.body, this.httpOptions )
  };

  postIssue() {
    this.postIssueToUsersRepo()
        .subscribe( (response) =>  {
          let out = response
          console.log(out)   
    })
  }


  textArea:any

  getHashTags(inputText) {  
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(inputText))) {
        matches.push(match[1]);
    }

    return matches;
  }

  getAtTags(inputText) {  
    var regex = /(?:^|\s)(?:@)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(inputText))) {
        matches.push(match[1]);
    }

    return matches;
  }

  removeAtAndHashTag(inputText) {
    let at = /(?:^|\s)(?:@)([a-zA-Z\d]+)/gm;
    let hash = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    let out1 = inputText.replace(at, "");
    let out2 = out1.replace(hash, "");
    let res = out2.split(",");

    return res;
  }

  test() {
    this.body.title = this.removeAtAndHashTag(this.textArea)[0]
    this.body.body = this.removeAtAndHashTag(this.textArea)[1]
    this.body.labels = this.getHashTags(this.textArea)
    this.body.assignees = this.getAtTags(this.textArea)

    console.log(this.body)
  }
}
