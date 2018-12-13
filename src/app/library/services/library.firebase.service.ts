import { Observable } from "rxjs";
import { IBook } from "./../../core/core.interface";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class LibraryFirebaseService {
  endPoint = "http://localhost:8080";
  constructor(public db: AngularFirestore, private http: HttpClient) {}

  createBook(value) {
    const url = this.endPoint + "/addBook";
    return this.http.post(url, value);
  }

  getBooks(): Observable<IBook[]> {
    const url = this.endPoint + "/listBook";
    return this.http.get<IBook[]>(url);
  }

  getBook(bookKey): Observable<IBook> {
    const url = this.endPoint + "/getBook?id=" + bookKey;
    return this.http.get<IBook>(url);
  }

  updateBook(value) {
    const url = this.endPoint + "/updateBook";
    return this.http.post(url, value);
  }

  deleteBook(bookKey) {
    const url = this.endPoint + "/deleteBook?id=" + bookKey;
    return this.http.get<IBook>(url);
  }


  searchBookByTitle(searchValue) {
    const url = this.endPoint + "/searchTitle?title=" + searchValue;
    return this.http.get<IBook[]>(url);
  }

  searchBooksByAuthor(searchValue) {
    const url = this.endPoint + "/searchAuthor?author=" + searchValue;
    return this.http.get<IBook[]>(url);
  }


  searchBooksByCategory(searchValue) {
    const url = this.endPoint + "/searchCategory?category=" + searchValue;
    return this.http.get<IBook[]>(url);
  }


  issueBook(book_id, user_email) {
    const url = this.endPoint + "/issueBook?book_id=" + book_id + '&user_email=' + user_email;
    return this.http.get<IBook[]>(url);
  }

}
