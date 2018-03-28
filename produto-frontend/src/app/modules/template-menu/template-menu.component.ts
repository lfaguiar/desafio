import { Component, OnInit } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-template-menu',
  templateUrl: './template-menu.component.html',
  styleUrls: ['./template-menu.component.css']
})
export class TemplateMenuComponent implements OnInit {
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.verificarUser();
  }
  
  verificarUser(){
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.info(this.user);
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
