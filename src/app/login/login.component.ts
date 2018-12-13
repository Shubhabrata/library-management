import { Component } from '@angular/core';
import { SocialAuthService } from '../core/services/social-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: SocialAuthService) {}

  signInWithGoogle(): void {
    this.authService.signInWithGoogle().then(user => {
      this.authService.userEmail = user.email;
      this.authService.name = user.name;
    });
  }

  signOut(): void {
    this.authService.signOut();
  }
}
