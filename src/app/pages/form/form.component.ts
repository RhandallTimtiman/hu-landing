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
  profilePicture: File[] = [];

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
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      primaryEmail: ['', [Validators.required, Validators.email]],
      currentEmployment: ['', Validators.required],
      position: ['', Validators.required],
      department: ['', Validators.required],
      yearsInGovernment: ['', Validators.required],
      contactNumber: ['', Validators.required],
      address: ['', Validators.required],
      registrationCode: ['', Validators.required],
      regCode: ['', Validators.required],
      provCode: ['', Validators.required],
      psgcCode: ['', Validators.required],
      zip: ['', Validators.required],
      profilePicture: ['', Validators.required],
      programId: ['', Validators.required],
      courseId: ['', Validators.required],
      professionalLicense: [''],
      secondaryEmail: [''],
      hsName: ['', Validators.required],
      hsYearGraduated: ['', Validators.required],
      hsAddress: ['', Validators.required],
      collegeName: [''],
      collegeYearGraduated: [''],
      collegeAddress: [''],
      mastersName: [''],
      mastersYearGraduated: [''],
      mastersAddress: [''],
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
    // Ensure there are files added
    if (event.addedFiles.length > 0) {
      this.profilePicture = [...event.addedFiles];

      // Map to get the names of the files
      this.profile_picture_holder = this.profilePicture.map(
        (prof) => prof?.name
      );

      // Read the first file (if exists)
      this.readFile(this.profilePicture[0])
        .then((fileContents) => {
          // Create payload for upload
          const payload = { fileContents };

          // Upload file using the service
          this.landingService.uploadFile(payload).subscribe(
            (result) => {
              // Push the uploaded file path to the final array
              this.profile_picture_final.push(result?.path);

              // Set the value in the form after successful upload
              this.studentEnrollmentForm
                .get('profilePicture')
                .setValue(this.profile_picture_final);
            },
            (error) => {
              console.error('Upload error:', error);
            }
          );
        })
        .catch((error) => {
          console.error('File read error:', error);
        });
    } else {
      console.warn('No files were selected.');
    }
  }

  /**
   * Remove Data
   *
   * @param {*} event
   * @memberof FormComponent
   */
  onRemove(event) {
    console.log(event);
    this.profilePicture.splice(this.profilePicture.indexOf(event), 1);
    this.profile_picture_holder.splice(this.profilePicture.indexOf(event), 1);
    this.profile_picture_final.splice(this.profilePicture.indexOf(event), 1);
    this.studentEnrollmentForm
      .get('profilePicture')
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
        let payload = {
          fileContents: fileContents,
        };

        this.landingService.uploadFile(payload).subscribe(
          (result) => {
            this.attachments_final.push(result?.path);
          },
          (error) => {
            console.log(error);
          }
        );
      });
    });
    this.studentEnrollmentForm
      .get('attachments')
      .setValue(this.attachments_final);
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
    const enrolleeDetails = this.studentEnrollmentForm.getRawValue();
    const enrolleeSchools = [
      {
        name: enrolleeDetails.hsName,
        yearGraduated: enrolleeDetails.hsYearGraduated,
        address: enrolleeDetails.hsAddress,
        type: 'HS',
      },
      {
        name: enrolleeDetails.collegeName,
        yearGraduated: enrolleeDetails.collegeYearGraduated,
        address: enrolleeDetails.collegeAddress,
        type: 'CL',
      },
      {
        name: enrolleeDetails.mastersName,
        yearGraduated: enrolleeDetails.mastersYearGraduated,
        address: enrolleeDetails.mastersAddress,
        type: 'MS',
      },
    ];
    let payload = {
      attachments: this.attachments_final,
      enrolleeSchools,
      ...enrolleeDetails,
      profilePicture: this.profile_picture_final[0],
    };
    console.log(payload);

    this.landingService.submitStudentInformation(payload).subscribe(
      (result) => {
        this.spinner.hide();
        this.studentEnrollmentForm.reset();
        this.attachments = [];
        this.attachments_final = [];
        this.attachments_holder = [];
        this.profilePicture = [];
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
