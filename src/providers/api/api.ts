import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  githubURL:string = 'https://api.github.com/'
  githubTokenUrl:string = 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token?client_id='
  search:any = 'softstackfactory'
  results:any = {
    access_token: ''
  }
  client_Id:any = '77b4f0d9a42a38fe7949'
  client_Secret:any = 'bb041c31307f2b955ccc0a62a5022fea2b9185fa'
  code:any = {}
  token:any 
  
  user:string = 'Avilpa1';
  repo:string = 'gitIssueIonic';

  body:any = {
    "title": "Found a bug",
    "body": "I'm having a problem with this.",
    "assignees": [
      "octocat"
    ],
    "milestone": 1,
    "labels": [
      "bug"
    ]
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Accept':  'application/json',
      'Origin': 'X-Requested-With'
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
  githubURL1:string = 'https://cors-anywhere.herokuapp.com/https://api.github.com/user'

  postIssueToUsersRepo() { 
    console.log(this.githubURL1 + '?access_token=' + this.token)
    return this.http.post( this.githubURL1 + this.postIssueURL + '?access_token=' + this.token , this.body, this.httpOptions )
  };

  postIssue() {
    this.postIssueToUsersRepo()
      this.getAccessTokenFromGithub()
        .subscribe( (response) =>  {
          let out = response
          console.log(out)   
    })
  }

}
