import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { ReCaptcha2Component } from 'ngx-captcha';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LandingService } from 'src/app/services/landing/landing.service';
import { UtilitiesService } from 'src/app/services/utilities/utilities.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  @ViewChild('mainform', { static: true }) mainform: ElementRef<HTMLDivElement>;
  attachments: File[] = [];
  profile_picture: File[] = [];

  attachments_holder = [];
  profile_picture_holder = [];

  regions: any[] = [];
  provinces: any[] = [];
  cities: any[] = [];

  programs: any[] = [];
  courses: any[] = [];

  attachments_final = [];
  profile_picture_final = [];

  studentEnrollmentForm: FormGroup;

  fileSize = 4194304;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _formBuilder: FormBuilder,
    private router: Router,
    private landingService: LandingService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private utilities: UtilitiesService,
    private cdr: ChangeDetectorRef
  ) {
    // this.spinner.show()
    // setTimeout(() => {
    //   this.spinner.hide()
    // }, 3000)
  }

  ngOnInit(): void {
    this.initialAnimations();

    this.studentEnrollmentForm = this._formBuilder.group({
      first_name: ['', Validators.required],
      middle_name: [''],
      last_name: ['', Validators.required],
      birth_date: ['', Validators.required],
      age: ['', Validators.required],
      primary_email: ['', [Validators.required, Validators.email]],
      current_employment: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      years_in_government: ['', Validators.required],
      contact_number: ['', Validators.required],
      address: ['', Validators.required],
      registration_code: ['', Validators.required],
      regCode: ['', Validators.required],
      provCode: ['', Validators.required],
      psgcCode: ['', Validators.required],
      zip: ['', Validators.required],
      profile_picture: ['', Validators.required],
      program_id: ['', Validators.required],
      course_id: ['', Validators.required],
      professional_license: [''],
      secondary_email: [''],
      hs_name: ['', Validators.required],
      hs_year_graduated: ['', Validators.required],
      hs_address: ['', Validators.required],
      college_name: [''],
      college_year_graduated: [''],
      college_address: [''],
      masters_name: [''],
      masters_year_graduated: [''],
      masters_address: [''],
      attachments: ['', Validators.required],
    });

    this.landingService.getRegions().subscribe((result) => {
      this.regions = result;
    });

    this.landingService.getPrograms().subscribe((result) => {
      this.programs = result;
    });
  }

  /**
   * Load Initial Animation
   *
   * @memberof FormComponent
   */
  initialAnimations(): void {
    gsap.from(this.mainform.nativeElement.childNodes, {
      duration: 0.5,
      opacity: 0,
      y: -20,
      stagger: 0.2,
      delay: 0.5,
    });
  }

  /**
   * On Select
   *
   * @param {*} event
   * @memberof FormComponent
   */
  onSelect(event) {
    console.log(event);
    this.profile_picture = [...event.addedFiles];

    this.profile_picture_holder = this.profile_picture.map((prof) => {
      return prof && prof.name;
    });

    this.studentEnrollmentForm
      .get('profile_picture')
      .setValue(this.profile_picture_holder);

    this.readFile(this.profile_picture[0]).then((fileContents) => {
      // Put this string in a request body to upload it to an API.
      this.profile_picture_final.push(fileContents);
    });
  }

  /**
   * Remove Data
   *
   * @param {*} event
   * @memberof FormComponent
   */
  onRemove(event) {
    console.log(event);
    this.profile_picture.splice(this.profile_picture.indexOf(event), 1);
    this.profile_picture_holder.splice(this.profile_picture.indexOf(event), 1);
    this.profile_picture_final.splice(this.profile_picture.indexOf(event), 1);
    this.studentEnrollmentForm
      .get('profile_picture')
      .setValue(this.profile_picture_holder);
  }

  /**
   * On Select
   *
   * @param {*} event
   * @memberof FormComponent
   */
  onSelectCredentials(event) {
    this.attachments.push(...event.addedFiles);
    this.attachments_holder = this.attachments.map((attachment) => {
      return attachment && attachment.name;
    });
    event.addedFiles.forEach((file) => {
      this.readFile(file).then((fileContents) => {
        // Put this string in a request body to upload it to an API.
        this.attachments_final.push(fileContents);
      });
    });
    this.studentEnrollmentForm
      .get('attachments')
      .setValue(this.attachments_holder);
  }

  /**
   * Remove Data
   *
   * @param {*} event
   * @memberof FormComponent
   */
  onRemoveCredentials(event) {
    console.log(event);
    this.attachments.splice(this.attachments.indexOf(event), 1);
    this.attachments_holder.splice(this.attachments.indexOf(event), 1);
    this.attachments_final.splice(this.attachments.indexOf(event), 1);
    this.studentEnrollmentForm
      .get('attachments')
      .setValue(this.attachments_holder);
  }

  /**
   * On Change Region
   *
   * @param {*} regionValue
   * @memberof FormComponent
   */
  onChangeRegion(regionValue) {
    this.provinces = [];
    this.cities = [];

    this.landingService.getProvince(regionValue).subscribe((result) => {
      this.provinces = result;
    });
  }

  /**
   * On Change Province
   *
   * @param {*} provinceValue
   * @memberof FormComponent
   */
  onChangeProvince(provinceValue) {
    this.cities = [];

    this.landingService.getCities(provinceValue).subscribe((result) => {
      this.cities = result;
    });
  }

  /**
   * On Change Program
   *
   * @param {*} programValue
   * @memberof FormComponent
   */
  onChangeProgram(programValue) {
    this.courses = [];

    var program = this.programs.find(
      (program) => program['id'].toString() == programValue.toString()
    );

    this.courses = program['courses'];
  }

  /**
   * On Change City
   *
   * @param {*} CityValue
   * @memberof FormComponent
   */
  onChangeCity(cityValue) {}

  /**
   * Submit Data
   *
   * @memberof FormComponent
   */
  submit() {
    this.spinner.show();
    // console.log(this.studentEnrollmentForm.getRawValue())
    // this.toastr.success('Hello world!', 'Toastr fun!');
    const formData = new FormData();

    const studentInfo = this.studentEnrollmentForm.getRawValue();

    // studentInfo['profile_picture'] = this.profile_picture_final[0]
    // studentInfo['attachments'] = this.attachments_final
    delete studentInfo['profile_picture'];
    delete studentInfo['attachments'];
    delete studentInfo['secondary_email'];

    Object.keys(studentInfo).forEach((key) =>
      formData.append(key, studentInfo[key])
    );

    formData.append(
      'profile_picture',
      this.profile_picture[0] ? this.profile_picture[0] : ''
    );

    if (this.attachments.length !== 0) {
      for (var i = 0; i < this.attachments.length; i++) {
        formData.append('attachments[]', this.attachments[i]);
      }
    } else {
      formData.append('attachments', '');
    }

    this.landingService.submitStudentInformation(formData).subscribe(
      (result) => {
        this.spinner.hide();
        this.studentEnrollmentForm.reset();
        this.attachments = [];
        this.attachments_final = [];
        this.attachments_holder = [];
        this.profile_picture = [];
        this.profile_picture_final = [];
        this.attachments_holder = [];
        this.toastr.success(
          'You have successfully submitted your application to U-ED Portal.<br> We will process your application and we will get back to you once we completed the validation',
          'Success!',
          {
            enableHtml: true,
          }
        );
      },
      (error) => {
        this.spinner.hide();

        let message = this.utilities.parseError(error.errors);

        this.toastr.error(message, 'Please fill up the missing fields!', {
          enableHtml: true,
        });
      }
    );
  }

  /**
   * Returns file result
   *
   * @private
   * @param {File} file
   * @return {*}  {(Promise<string | ArrayBuffer>)}
   * @memberof FormComponent
   */
  private async readFile(file: File): Promise<string | ArrayBuffer> {
    return new Promise<string | ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        return resolve((e.target as FileReader).result);
      };

      reader.onerror = (e) => {
        console.error(`FileReader failed on file ${file.name}.`);
        return reject(null);
      };

      if (!file) {
        console.error('No file to read.');
        return reject(null);
      }

      reader.readAsDataURL(file);
    });
  }
}
