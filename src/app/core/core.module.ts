import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { GrowlerModule } from './growler/growler.module';
import { ModalModule } from './modal/modal.module';
import { OverlayModule } from './overlay/overlay.module';

//import { DataService } from './services/data.service';
//import { NavbarComponent } from './navbar/navbar.component';
//import { FilterService } from './services/filter.service';
//import { SorterService } from './services/sorter.service';
//import { TrackByService } from './services/trackby.service';
//import { DialogService } from './services/dialog.service';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { SocialAuthService } from './services/social-auth.service';
import { EventBusService } from './services/event-bus.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      "624796833023-clhjgupm0pu6vgga7k5i5bsfp6qp6egh.apps.googleusercontent.com"
    )
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, GrowlerModule, ModalModule, OverlayModule, SocialLoginModule],
  exports: [GrowlerModule, RouterModule, HttpClientModule, ModalModule, OverlayModule],
  declarations: [],
  providers: [SocialAuthService, EventBusService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }

  ] // these should be singleton
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}