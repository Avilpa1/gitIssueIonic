import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public apiProvider: ApiProvider) {

  }

APIurl:string = 'https://api.github.com/'
search:any = 'softstackfactory'
out:any
client_Id = '77b4f0d9a42a38fe7949'
client_Secret = 'bb041c31307f2b955ccc0a62a5022fea2b9185fa'

  searchOrgs() {

    fetch(this.APIurl + 'orgs/' + this.search + '/repos?sort=created')
    .then(response => response.json())
    .then(json => {
        this.out = json
        console.log(this.out)
        })
  }

  signIn() {
    window.location.href='https://github.com/login/oauth/authorize' + '?client_id=' + this.client_Id + '&scope=repo';
  }

  // postIssue() {

  //   fetch('https://api.github.com/repos/Avilpa1/gitIssue/issues?access_token=e7a9ba9905a268cfd0d45d74a429b694124bc802', {
  //     method: 'post',
  //     body: {
  //       title: 'Title',
  //       body: {body: "body", title: "title"}
  //     }
  //   })
  // }
}
