import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ThirdPartyAPIService {
  apiEndpoint = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
  constructor(private http: Http) {}
  getBookDetails(isbn) {
    const encodedURI = encodeURI(
      'https://www.googleapis.com/books/v1/volumes?q=isbn:' +
        isbn +
        '&maxResults=1'
    );
    return this.http
      .get(encodedURI)
      .map((response: Response) => response.json());
  }
}
