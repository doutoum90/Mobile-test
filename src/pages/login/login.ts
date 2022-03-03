import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, ToastController } from "ionic-angular";

import { User } from "../../providers";
import { MainPage } from "../";
import { FormControl, FormGroup } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html",
})
export class LoginPage implements OnInit {
  signinformGroup: FormGroup;
  private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService
  ) {
    this.translateService.get("LOGIN_ERROR").subscribe((value) => {
      this.loginErrorString = value;
    });
  }
  
  ngOnInit() {
    this.signinformGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.signinformGroup.value).subscribe(
      (resp) => {
        this.navCtrl.push(MainPage);
      },
      (err) => {
        this.navCtrl.push(MainPage);
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: "top",
        });
        toast.present();
      }
    );
  }
}
