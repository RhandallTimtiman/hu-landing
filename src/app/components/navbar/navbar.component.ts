import { DOCUMENT } from '@angular/common';
import { HostListener } from '@angular/core';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isOpen: boolean = false;
  isOpenMobileMenu: boolean = false;

  activeMenu: string = 'home'

  home: Number;
  programs: Number;
  schools: Number;
  aboutUs: Number;
  contactUs: Number;

  currentRoute: String;

  @ViewChild('navbar', { static: true }) navbar: ElementRef<HTMLDivElement>
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private activatedRoute : ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.initialAnimations();
    this.router.events.subscribe(value => {
      this.currentRoute = this.router.url.toString();
      console.log(this.currentRoute)
    });

    setTimeout(() => {
      this.computeOffset();
    }, 300)
  }

  computeOffset() {
    this.home = document.getElementById('landingblock').offsetTop;
    this.programs = document.getElementById('coursecards').offsetTop;
    this.schools = document.getElementById('schoolheader').offsetTop;
    this.aboutUs = document.getElementById('aboutus').offsetTop;
    this.contactUs = document.getElementById('contactus').offsetTop - 200;
  }

  initialAnimations(): void {
    gsap.from(this.navbar.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -40,
      stagger: 0.2,
      delay: 0.5,
    })
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

  routeToForm() {
    this.router.navigate([
      'form'
    ])

    window.scrollTo(0, 0);
  }

  routeToPayNow() {
    this.router.navigate([
      'pay'
    ])

    window.scrollTo(0, 0);
  }

  @HostListener('window:scroll', ['$event'])
  checkOffsetTop() {
    // console.log(this.contactUs)
    // console.log(window.pageYOffset)
    // console.log(window.pageYOffset); // this will console log our scroll position
    // if (this.currentRoute !== '/form') {
    //   if (window.pageYOffset >= this.home && window.pageYOffset < this.programs) {
    //     console.log('/')
    //     this.currentRoute = '/';
    //   } else if ((window.pageYOffset) >= this.programs && window.pageYOffset < this.schools) {
    //     console.log('/prog')
    //     this.currentRoute = '/programs';
    //   } else if (window.pageYOffset >= this.schools && window.pageYOffset < this.aboutUs) {
    //     console.log('/schools')
    //     this.currentRoute = '/schools';
    //   } else if (window.pageYOffset >= this.aboutUs && window.pageYOffset < this.contactUs) {
    //     console.log('/aboutus')
    //     this.currentRoute = '/aboutus';
    //   } else {
    //     console.log('/contactus')
    //     this.currentRoute = '/contactus';
    //   }
    // }
  }

}
