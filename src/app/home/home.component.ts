import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ageValue = 0;
  searchValue = '';
  items: Array<any>;
  age_filtered_items: Array<any>;
  name_filtered_items: Array<any>;

  constructor(private router: Router) {}

  ngOnInit() {}
}
