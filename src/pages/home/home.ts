import { Component } from '@angular/core';
import { NavController, ToastController, TextInput } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public apiProvider: ApiProvider,
              public menuCtrl: MenuController,
              public toast: ToastController, 
              // public textArea: TextInput
              ) {}

  ionViewDidEnter() {
    this.apiProvider.accessToken();
    this.apiProvider.textArea = "";
  }

  async presentToast() {
    const toast = await this.toast.create({
      message: 'Signing in with Github..',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  signIn() {
    this.presentToast()
    this.apiProvider.signInWithGithub()
  }

  users:any = {
    'paul': 'Avilpa1',
    'alex': 'AlexRingrose',
    'benji': 'bdarey',
    'khoa': 'khoadnguyen'
  }
  
  onChange(x:any) {
    // console.log(this.apiProvider.textArea)
    if( x == '32' || x == '13') {
      if(this.apiProvider.textArea != undefined) {
        this.textAreaUserNameCheck()
      }
    }
  }
  
  textAreaUserNameCheck() {
    let matches:any = []
    let textAreaLower = this.apiProvider.textArea.toLowerCase()
    let AtTag:any = this.apiProvider.getAtTags(textAreaLower)

    for(let x=0; x < AtTag.length; x++) {
      if (AtTag[x] in this.users) {
        matches.push(this.users[AtTag[x]])
        this.apiProvider.body.assignees = matches
      } else {
        matches.push(AtTag[x])
        this.apiProvider.body.assignees = matches
      }
      console.log(this.apiProvider.body.assignees)
    }
  }

  markdown(x) {
    this.apiProvider.textArea = this.apiProvider.textArea + ' ' + x

    let input:any = document.getElementById("textArea");
    // this.textArea.setFocus()
  }



  
  // input.addEventListener('keypress', (event) => {
  //   console.log("You have pressed key: ", event.key);
  // });

}
