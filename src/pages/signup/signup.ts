import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { IonicPage, NavController, ToastController } from "ionic-angular";

import { User } from "../../providers";
import { MainPage } from "../";
import { FormControl, FormGroup } from "@angular/forms";

@IonicPage()
@Component({
  selector: "page-signup",
  templateUrl: "signup.html",
})
export class SignupPage implements OnInit {
  signupformGroup: FormGroup;
  private signupErrorString: string;

  constructor(
    public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService
  ) {
    this.translateService.get("SIGNUP_ERROR").subscribe((value) => {
      this.signupErrorString = value;
    });
  }

  ngOnInit() {
    this.signupformGroup = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
      username: new FormControl(),
      passwordConfirm: new FormControl(),
    });
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.signupformGroup.value).subscribe(
      (resp) => {
        this.navCtrl.push(MainPage);
      },
      (err) => {
        this.navCtrl.push(MainPage);
        // Unable to sign up
        let toast = this.toastCtrl.create({
          message: this.signupErrorString,
          duration: 3000,
          position: "top",
        });
        toast.present();
      }
    );
  }
}
