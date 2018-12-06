import { Injectable } from '@angular/core';

import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {
  GoogleLoginProvider
} from "angularx-social-login";


@Injectable()
export class SocialAuthService {
  userEmail : string;
  name: string;
  user: SocialUser;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });
  }

  signInWithGoogle() {
    return this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut() {
    return this.authService.signOut();
  }
}
