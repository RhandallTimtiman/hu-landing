import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get Regions
   *
   * @memberof LandingService
   */
  getRegions(): Observable<any> {
    return this.http.get(`${environment.huApiUrl}/api/landing/regions`);
  }

  /**
   * Get Province
   *
   * @memberof LandingService
   */
  getProvince(regCode: string): Observable<any> {
    return this.http.get(`${environment.huApiUrl}/api/landing/provinces?regCode=${regCode}|exact`);
  }

  /**
   * Get City
   *
   * @memberof LandingService
   */
  getCities(provCode: string): Observable<any> {
    return this.http.get(`${environment.huApiUrl}/api/landing/cities?provCode=${provCode}|exact`);
  }

  /**
   * Get Programs
   *
   * @return {*}  {Observable<any>}
   * @memberof LandingService
   */
  getPrograms(): Observable<any> {
    return this.http.get(`${environment.huApiUrl}/api/public/programs`);
  }

  /**
   * Submit Student Information
   *
   * @param {*} payload
   * @return {*}  {Observable<any>}
   * @memberof LandingService
   */
  submitStudentInformation(payload: any): Observable<any> {
    return this.http.post(`${environment.huApiUrl}/api/public/enrollee`, payload);
  }
}
