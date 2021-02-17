import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UtilitiesService {

  constructor() {
  }

  /**
   * Prints Error Message
   *
   * @param {*} errors
   * @memberof Utilities
   */
  parseError(errors: any) {
    if (errors) {
      let errorMessage = ''
  
      for (const [key, value] of Object.entries(errors)) {
        let entryValue: any = []
  
        entryValue = value
  
        if (entryValue.length !== 0) {
          for (let i = 0; i < entryValue.length; i++) {
            errorMessage += entryValue[i] + '<br>'
          }
        }
      }
  
      return errorMessage;
    } else {
      return 'Something Went Wrong!'
    }

  }
}