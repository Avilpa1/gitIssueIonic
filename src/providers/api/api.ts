import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
  }

  githubURL:string = 'https://api.github.com/'
  search:any = 'softstackfactory'
  out:any
  client_Id:any = '77b4f0d9a42a38fe7949'
  client_Secret:any = 'bb041c31307f2b955ccc0a62a5022fea2b9185fa'

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
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa('avilpa1:4130032Qa1!') 
    })
  };

  signInWithGithub() {
    // window.location.href='https://github.com/login/oauth/authorize' + '?client_id=' + this.client_Id + '&scope=repo';
    console.log('sign in')
    return this.http.get( 'https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/authorize' + '?client_id=' + this.client_Id + '&scope=repo')
  }

  getAccessTokenFromGithub() {

  }


  postIssueURL:string = 'repos/organization/repo/issues'

  postIssueToUsersRepo() { 
    return this.http.post( this.githubURL + this.postIssueURL, this.body, this.httpOptions )
  };
  
  postIssue() {
    console.log(this.body)
      this.signInWithGithub()
        .subscribe( (response) =>  {
          let signUpResult = response
          console.log(signUpResult)
        
    })
  }



}
