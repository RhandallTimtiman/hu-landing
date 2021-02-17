import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  @ViewChild('landing', { static: true }) landing: ElementRef<HTMLDivElement>
  @ViewChild('welcome', { static: true }) welcome: ElementRef<HTMLDivElement>
  @ViewChild('course', { static: true }) course: ElementRef<HTMLDivElement>
  @ViewChild('schools', { static: true }) schools: ElementRef<HTMLDivElement>
  @ViewChild('courseoffered', { static: true }) courseoffered: ElementRef<HTMLDivElement>
  // @ViewChild('speakers', { static: true }) speakers: ElementRef<HTMLDivElement>
  @ViewChild('aboutus', { static: true }) aboutus: ElementRef<HTMLDivElement>
  @ViewChild('abouthu', { static: true }) abouthu: ElementRef<HTMLDivElement>

  isOpenModal: Boolean = false;
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.initialAnimations();
      this.initScrollAnimations();
      this.meta.addTags([
        { name: 'description', content: 'The Education Portal of Center for Leadership, Communication & Governance' },
      ], true);
    }, 200)
  }

  initScrollAnimations(): void {
    gsap.to(this.welcome.nativeElement, {
      scrollTrigger: {
        trigger: this.welcome.nativeElement,
        scrub: true,
        start: '110% center'
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.1,
      opacity: 0,
      y: 40,
    })
    gsap.to(this.abouthu.nativeElement, {
      scrollTrigger: {
        trigger: this.abouthu.nativeElement,
        scrub: true,
        start: '110% center'
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.1,
      opacity: 0,
      y: 40,
    })
    gsap.to(this.course.nativeElement, {
      scrollTrigger: {
        trigger: this.course.nativeElement,
        scrub: true,
        start: '110% center'
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.1,
      opacity: 0,
      y: 40,
    })
    gsap.to(this.courseoffered.nativeElement, {
      scrollTrigger: {
        trigger: this.courseoffered.nativeElement,
        scrub: true,
        start: '110% center'
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.1,
      opacity: 0,
      y: 40,
    })
    gsap.to(this.schools.nativeElement, {
      scrollTrigger: {
        trigger: this.schools.nativeElement,
        scrub: true,
        start: '110% center'
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.1,
      opacity: 0,
      y: 40,
    })
    // gsap.to(this.speakers.nativeElement, {
    //   scrollTrigger: {
    //     trigger: this.speakers.nativeElement,
    //     scrub: true,
    //     start: '110% center'
    //   } as gsap.plugins.ScrollTriggerInstanceVars,
    //   duration: 1.1,
    //   opacity: 0,
    //   y: 40,
    // })
    gsap.to(this.aboutus.nativeElement, {
      scrollTrigger: {
        trigger: this.aboutus.nativeElement,
        scrub: true,
        start: '110% center'
      } as gsap.plugins.ScrollTriggerInstanceVars,
      duration: 1.1,
      opacity: 0,
      y: 40,
    })
  }

  initialAnimations(): void {
    gsap.from(this.landing.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.5,
    })
  }

  redirectToRouter(route: String) {
    this.router.navigate(
      [route]
    )
  }
}
