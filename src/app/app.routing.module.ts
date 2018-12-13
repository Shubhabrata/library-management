import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  PreloadAllModules,
  NoPreloading
} from '@angular/router';

import { HomeComponent } from './home/home.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'library', loadChildren: './library/library.module#LibraryModule' },
  {
    path: 'library/new-book',
    loadChildren: './library/library.module#LibraryModule'
  },
  { path: 'login', loadChildren: './login/login.module#LoginModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(app_routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
