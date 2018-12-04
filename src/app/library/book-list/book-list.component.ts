import { Component, OnInit } from '@angular/core';
import { LibraryFirebaseService } from '../services/library.firebase.service';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'library-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  categoryValue: number = 0;
  searchValue: string = "";
  items: Array<any>;
  category_filtered_items: Array<any>;
  title_filtered_items: Array<any>;
  author_filtered_items: Array<any>;

  constructor(
    public firebaseService: LibraryFirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getBooks()
    .subscribe(result => {
      this.items = result;
      this.category_filtered_items = result;
      this.title_filtered_items = result;
      this.author_filtered_items = result;
    })
  }

  viewDetails(item){
    this.router.navigate(['/library/details/'+ item.payload.doc.id])
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByTitle(){
    let value = this.searchValue;
    this.firebaseService.searchBookByTitle(value)
    .subscribe(result => {
      this.title_filtered_items = result;
      this.items = this.combineLists(result, this.title_filtered_items);
    })
  }

  searchByAuthor(){
    let value = this.searchValue;
    this.firebaseService.searchBooksByAuthor(value)
    .subscribe(result => {
      this.title_filtered_items = result;
      this.items = this.combineLists(result, this.author_filtered_items);
    })
  }

  searchByCategory(){
    let value = this.searchValue;
    this.firebaseService.searchBooksByCategory(value)
    .subscribe(result => {
      this.title_filtered_items = result;
      this.items = this.combineLists(result, this.category_filtered_items);
    })
  }
  
  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    console.log(result);
    
    return result;
  }

}
