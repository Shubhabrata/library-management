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
import { SocialAuthService } from '../../core/services/social-auth.service';


@Component({
  selector: "library-edit-book",
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
      let data = routeData["data"];
      if (data) {
        this.item = data.payload.data();
        this.item.id = data.payload.id;
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
      copies: [this.item.copies, Validators.required],
      
      
    });
  }
  /*
  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
      height: '400px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.item.avatar = result.link;
      }
    });
  }
*/
  onSubmit(value) {
    value.avatar = this.item.avatar;
    value.age = Number(value.age);
    this.firebaseService.updateBook(this.item.id, value).then(res => {
      this.router.navigate(["/library"]);
    });
  }

  delete() {
    this.firebaseService.deleteBook(this.item.id).then(
      res => {
        this.router.navigate(["/library"]);
      },
      err => {
        console.log(err);
      }
    );
  }

  cancel() {
    this.router.navigate(["/library"]);
  }
  issueBook(){
    console.log(this.authService.name);
    
  }
}
