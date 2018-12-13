import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './library.routes';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditBookResolver } from './edit-book/edit-book.resolver';
import { NewBookComponent } from './new-book/new-book.component';
import { BookListComponent } from './book-list/book-list.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../environments/environment';
import { LibraryFirebaseService } from './services/library.firebase.service';
import { ThirdPartyAPIService } from './services/thirdparty-api.service';

import {
  MatButtonModule,
  MatInputModule,
  MatSliderModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  declarations: [EditBookComponent, NewBookComponent, BookListComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(rootRouterConfig),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    MatButtonModule,
    MatInputModule,
    MatSliderModule,
    MatDialogModule,
    CommonModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [LibraryFirebaseService, EditBookResolver, ThirdPartyAPIService],
  bootstrap: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryModule {}

export interface IBook {
  isbn: string;
  title: string;
  author: string;
  description: string;
  category: string;
  thumbnailImage: string;
  shelfNumber: number;
  rating: number;
}

