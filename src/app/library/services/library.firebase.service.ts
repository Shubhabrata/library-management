import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class LibraryFirebaseService {

  constructor(public db: AngularFirestore) {
    
  }

  getBook(bookKey){
    return this.db.collection('books').doc(bookKey).snapshotChanges();
  }

  updateBook(bookKey, value){
    value.nameToSearch = value.name;
    return this.db.collection('books').doc(bookKey).set(value);
  }

  deleteBook(bookKey){
    return this.db.collection('books').doc(bookKey).delete();
  }

  getBooks(){
    return this.db.collection('books').snapshotChanges();
  }

  searchBookByTitle(searchValue){
    return this.db.collection('books',ref => ref.where('title', '>=', searchValue)
      .where('title', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchBooksByAuthor(searchValue){
    return this.db.collection('books',ref => ref.where('title', '>=', searchValue)
      .where('title', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }

  searchBooksByCategory(searchValue){
    return this.db.collection('books',ref => ref.where('title', '>=', searchValue)
      .where('title', '<=', searchValue + '\uf8ff'))
      .snapshotChanges()
  }



  createBook(value){
    return this.db.collection('books').add({
      isbn: value.isbn,
      title: value.title,
      author: value.author,
      category: value.category,
      description: value.description,
      shelfNumber: parseInt(value.shelfNumber),
      thumbnailImageURL: value.thumbnailImageURL,
      rating: parseFloat(value.rating),
      copies: parseFloat(value.copies)
    });
  }
}
