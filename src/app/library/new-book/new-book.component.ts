import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { LibraryFirebaseService } from "../services/library.firebase.service";
import { ThirdPartyAPIService } from "./../services/thirdparty-api.service";

@Component({
  selector: "library-new-book",
  templateUrl: "./new-book.component.html",
  styleUrls: ["./new-book.component.scss"]
})
export class NewBookComponent implements OnInit {
  addBookForm: FormGroup;
  thumbnailImageURL = "";
  validation_messages = {
    isbn: [{ type: "required", message: "ISBN is required." }],
    title: [{ type: "required", message: "Title is required." }],
    author: [{ type: "required", message: "Author is required." }],
    category: [{ type: "required", message: "Category is required." }],
    description: [{ type: "required", message: "Description is required." }],
    shelfNumber: [
      {
        type: "required",
        message: "Please mention where the book is keput in the library."
      }
    ],
    thumbnailImageURL: [
      { type: "required", message: "Thumbnail image url is needed." }
    ],
    rating: [{ type: "required", message: "Rating is required." }],
    copies: [{ type: "required", message: "Copies is required." }]
  };

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    public firebaseService: LibraryFirebaseService,
    public thirdPartyAPIService: ThirdPartyAPIService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addBookForm = this.fb.group({
      isbn: ["", Validators.required],
      title: ["", Validators.required],
      author: ["", Validators.required],
      category: ["", Validators.required],
      description: ["", Validators.required],
      shelfNumber: ["", Validators.required],
      thumbnailImageURL: ["", Validators.required],
      rating: ["", Validators.required],
      copies: ["", Validators.required]
    });
  }

  /*  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.avatarLink = result.link;
      }
    });
  }
*/
  resetFields() {
    this.addBookForm = this.fb.group({
      isbn: new FormControl("", Validators.required),
      title: new FormControl("", Validators.required),
      author: new FormControl("", Validators.required),
      category: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      shelfNumber: new FormControl("", Validators.required),
      thumbnailImageURL: ["", Validators.required],
      rating: new FormControl("", Validators.required),
      copies: new FormControl("", Validators.required)
    });
  }

  onSubmit(value) {
    this.firebaseService.createBook(value).then(res => {
      this.resetFields();
      this.router.navigate(["/library"]);
    });
  }

  getBookDetailsFromThirdparty(isbn) {
    this.thirdPartyAPIService.getBookDetails(isbn).subscribe(data => {
      if (data.items.length > 0) {
        const book = data.items[0];
        this.addBookForm.patchValue({
          title: book["volumeInfo"]["title"],
          author: book["volumeInfo"]["authors"],
          description: book["volumeInfo"]["description"],
          thumbnailImageURL: book["volumeInfo"]["imageLinks"]["thumbnail"],
          rating: book["volumeInfo"]["averageRating"],
          category: book["volumeInfo"]["categories"][0]
        });
        this.thumbnailImageURL = book["volumeInfo"]["imageLinks"]["thumbnail"];
      }
      console.log(data);
    });
  }
}
