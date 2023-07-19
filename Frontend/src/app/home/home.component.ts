import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginUser(item:any)
  {
    console.log(item.roomId);
    console.log(item.name);
    this.router.navigate(['/'+item.roomId] ,{ queryParams :{user: item.name} })

  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}