import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// page
import { AddProductComponent } from './page/add-product/add-product.component';
import { ProductListComponent } from './page/product-list/product-list.component';

// component
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { ConfirmModalComponent } from './component/modal/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './component/modal/alert-modal/alert-modal.component';

// import
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //npm i ng2-search-filter --save
import { NgxSpinnerModule } from "ngx-spinner";  //npm install ngx-spinner --save
import { ToastrModule } from 'ngx-toastr'; //npm install ngx-toastr --save | npm install @angular/animations --save
import {HttpConfigInterceptor} from './service/httpconfig.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    AddProductComponent,
    ProductListComponent,
    NavBarComponent,
    ConfirmModalComponent,
    AlertModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
