import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'hu-landing';

  isOpen: boolean = false;
  isOpenMobileMenu: boolean = false;

  @ViewChild('mainbody', { static: true }) mainbody: ElementRef<HTMLDivElement>

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.initialAnimations();
  }

  initialAnimations(): void {
    // gsap.from(this.mainbody.nativeElement.childNodes, {
    //   duration: 0.5,
    //   opacity: 0,
    //   y: -20,
    //   stagger: 0.2,
    //   delay: 0.5,
    // })
  }
}
