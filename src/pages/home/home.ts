import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

APIurl:string = 'https://api.github.com/'
search:any = 'softstackfactory'
out:any

  searchOrgs() {

    fetch(this.APIurl + 'orgs/' + this.search + '/repos?sort=created')
    .then(response => response.json())
    .then(json => {
        this.out = json
        console.log(this.out)
        })
  }

}
