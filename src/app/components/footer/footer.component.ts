import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentRoute: String;

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document,) { }

  ngOnInit(): void {
    this.router.events.subscribe(value => {
      this.currentRoute = this.router.url.toString();
    });
  }

  scrollTo(id, route) {
    console.log(this.currentRoute)
    if (this.currentRoute != '/form' && this.currentRoute != '/pay') {
      let scroll = document.getElementById(id);

      scroll.scrollIntoView({behavior: 'smooth', block: 'start'});
  
      if (this.router.url === '/') {
        // this.currentRoute = route;
      }
    } else {
      this.router.navigate([
        'landing'
      ]).then((result) => {
        setTimeout(() => {
          let scroll = document.getElementById(id);

          this.currentRoute = '/'

          scroll.scrollIntoView({behavior: 'smooth'});
        }, 500)
      })
    }
  }

}
