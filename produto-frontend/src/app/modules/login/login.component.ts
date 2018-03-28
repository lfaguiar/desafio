import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.verificarUser();
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.verificarUser();
  }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit() {
    this.verificarUser();
  }

  verificarUser(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (user != null){
        this.router.navigate(['/principal']);
      }
      console.info(this.user);
    });
  }
}