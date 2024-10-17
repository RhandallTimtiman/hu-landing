import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  constructor(private http: HttpClient) {}

  /**
   * Get Regions
   *
   * @memberof LandingService
   */
  getRegions(): Observable<any> {
    return this.http.get(`${environment.huApiUrl}/api/v1/region`);
  }

  /**
   * Get Province
   *
   * @memberof LandingService
   */
  getProvince(regCode: string): Observable<any> {
    return this.http.get(
      `${environment.huApiUrl}/api/v1/province?regCode=${regCode}`
    );
  }

  /**
   * Get City
   *
   * @memberof LandingService
   */
  getCities(provCode: string): Observable<any> {
    return this.http.get(
      `${environment.huApiUrl}/api/v1/city?provCode=${provCode}`
    );
  }

  /**
   * Get Programs
   *
   * @return {*}  {Observable<any>}
   * @memberof LandingService
   */
  getPrograms(): Observable<any> {
    return this.http.get(`${environment.huApiUrl}/api/v1/program`);
  }

  /**
   * Submit Student Information
   *
   * @param {*} payload
   * @return {*}  {Observable<any>}
   * @memberof LandingService
   */
  submitStudentInformation(payload: any): Observable<any> {
    return this.http.post(
      `${environment.huApiUrl}/api/public/enrollee`,
      payload
    );
  }
}
