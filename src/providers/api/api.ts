import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  constructor(public http: HttpClient) {
  }

  cors:string = 'https://cors-anywhere.herokuapp.com/'
  githubURL:string = 'https://api.github.com/'
  githubTokenUrl:string = this.cors + 'https://github.com/login/oauth/access_token?client_id='
  searchRequest:any = ''
  results:any = {
    access_token: ''
  }
  client_Id:any = '77b4f0d9a42a38fe7949'
  client_Secret:any = 'bb041c31307f2b955ccc0a62a5022fea2b9185fa'
  code:any = {}
  token:any 
  out:any
  loggedIn:any = true
  user:string = 'Avilpa1';
  repo:string = 'gitIssue';
  issue:string = '';
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

  githubUserInfo:object = {}
  getUserinfoFromGithub() {
    this.http.get( this.githubURL + 'user?access_token=' + this.token )
      .subscribe( (response) =>  {
        this.githubUserInfo = response
        console.log(this.githubUserInfo)
        this.loggedIn = false
      })
  }

  getCodeFromGithubUrl() {
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
    this.getCodeFromGithubUrl()
      this.getAccessTokenFromGithub()
        .subscribe( (response) =>  {
          this.results = response
          this.token = this.results.access_token
          console.log(this.token)
          if (this.token != undefined) {
            this.getUserinfoFromGithub()
          }
    })
  }
 
  postIssueURL:string

  postIssueToUsersRepo() { 
    this.postIssueURL = 'repos/' + this.searchRequest + '/' + this.repo + '/' + 'issues'
    console.log(this.githubURL + this.postIssueURL + '?access_token=' + this.token)
    return this.http.post( this.githubURL + this.postIssueURL + '?access_token=' + this.token , this.body, this.httpOptions )
  };

  postIssue() {
    this.constructIssueObject()
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

  constructIssueObject() {
    this.body.title = this.removeAtAndHashTag(this.textArea)[0]
    this.body.body = this.removeAtAndHashTag(this.textArea)[1]
    this.body.labels = this.getHashTags(this.textArea)
    // this.body.assignees = this.getAtTags(this.textArea)

    console.log(this.body)
  }

  search(x:any) {
    if( x == '13') {
        this.searchOrg()
    }
  }

  searchOrg() {
     fetch(this.githubURL + 'orgs/' + this.searchRequest + '/repos?sort=created')
    .then(response => response.json())
    .then(json => {
        this.out = json
        console.log(this.out)
        })
  }

  repoIssuesResults:any
  searchRepoIssues(x:any) {
    this.http.get( this.githubURL + 'repos/' + this.searchRequest + '/' + this.out[x].name + '/issues' )
      .subscribe( (response) =>  {
        this.repoIssuesResults = response
        console.log(this.repoIssuesResults)
        this.setRepoAndIssue(this.searchRequest, this.out[x].name)
      })
  }

  setRepoAndIssue(user, repo) {
    this.user = user
    this.repo = repo
  }
  


}

