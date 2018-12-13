import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { MatDialog } from "@angular/material";
import { LibraryFirebaseService } from "../services/library.firebase.service";
import { Router } from "@angular/router";
import { SocialAuthService } from "../../core/services/social-auth.service";

@Component({
  selector: "app-library-edit-book",
  templateUrl: "./edit-book.component.html",
  styleUrls: ["./edit-book.component.scss"]
})
export class EditBookComponent implements OnInit {
  editBookForm: FormGroup;
  item: any;

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
    copies: [{ type: "required", message: "Rating is required." }]
  };

  constructor(
    public firebaseService: LibraryFirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private authService: SocialAuthService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      const data = routeData["data"];
      if (data) {
        this.item = data;
        this.item.id = data.id;
        this.createForm();
      }
    });
  }

  createForm() {
    this.editBookForm = this.fb.group({
      isbn: [this.item.isbn, Validators.required],
      title: [this.item.title, Validators.required],
      author: [this.item.author, Validators.required],
      category: [this.item.category, Validators.required],
      description: [this.item.description, Validators.required],
      shelfNumber: [this.item.shelfNumber, Validators.required],
      thumbnailImageURL: [this.item.thumbnailImageURL, Validators.required],
      rating: [this.item.rating, Validators.required],
      copies: [this.item.copies, Validators.required]
    });
  }

  onSubmit(value) {
    value.id = Number(this.item.id);
    this.firebaseService.updateBook(value).subscribe(res => {
      this.router.navigate(["/library"]);
    });
  }

  delete() {
    this.firebaseService.deleteBook(this.item.id).subscribe(res =>{
      this.router.navigate(["/library"]);  
    });
  }

  cancel() {
    this.router.navigate(["/library"]);
  }

  issueBook() {
    this.firebaseService.issueBook(this.item.id, this.authService.userEmail).subscribe(res=>{
      console.log(res);
      //this.router.navigate(["/library"]);
    })
  }
}
