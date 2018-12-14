import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ThirdPartyAPIService {
  apiEndpoint = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
  constructor(private http: HttpClient) { }
  getBookDetails(isbn) {
    const URL = `${this.apiEndpoint}${isbn}&maxResults=1`;
    return this.http.get(URL);
  }
}
