import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner"
import { Location } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class SharedService {

  /*
 -----------------------------------------------------
 ---------------  Share Service  -------------------
 -----------------------------------------------------
*/

  constructor(
    public toastrService: ToastrService,
    public router: Router,
    public Location: Location,
    public ngxSpinnerService: NgxSpinnerService,
    public location: Location
  ) { }


  public getApiServer() {
    return environment.api_url   // from environment.ts
  }


}
