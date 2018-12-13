import { BookListComponent } from './book-list/book-list.component';
import { Routes } from '@angular/router';
import { NewBookComponent } from './new-book/new-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { EditBookResolver } from './edit-book/edit-book.resolver';


export const rootRouterConfig: Routes = [
  { path: '', component: BookListComponent },
  { path: 'new-book', component: NewBookComponent },
  {
    path: 'details/:id',
    component: EditBookComponent,
    resolve: { data: EditBookResolver }
  }
];
