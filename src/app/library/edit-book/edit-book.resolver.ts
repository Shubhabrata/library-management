import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { LibraryFirebaseService } from '../services/library.firebase.service';

@Injectable()
export class EditBookResolver implements Resolve<any> {

  constructor(public firebaseService: LibraryFirebaseService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let bookId = route.paramMap.get('id');
      this.firebaseService.getBook(bookId)
      .subscribe(
        data => {
          resolve(data);
        }
      );
    })
  }
}
