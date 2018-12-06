import { LoginComponent } from "./login.component";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { rootRouterConfig } from "./login-routing.module";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule.forChild(rootRouterConfig),
    CommonModule,
    
  ],
  providers: [
  ]
})
export class LoginModule { }
