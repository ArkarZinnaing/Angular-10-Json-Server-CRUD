import { Injectable, Input } from '@angular/core';
import { SharedService } from './sharedservice.service';
import { Product } from 'src/app/modal/product.modal';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//api header
// const headerOption = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };


@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  /*
   -----------------------------------------------------
   ---------------  Product Service  -------------------
   -----------------------------------------------------
 */

  patch = this._shared.getApiServer()

  allProduct: Product[];
  productData: Product[];
  alert;




  constructor(
    private _shared: SharedService,
    public http: HttpClient,
  ) { }

  //get all product form api
  getAllProduct() {
    this._shared.ngxSpinnerService.show();
    return this.http.get<any>(this.patch).subscribe(
      (data) => {
        this.allProduct = data;
        console.table(data)
        setTimeout(() => {
          this._shared.ngxSpinnerService.hide();
        }, 500);
      });
  }


  //add new product
  createProduct(product: Product) {
    return this.http.post<Product>(this.patch + "/api-create.php", product);
  }

  //update product
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.patch + '/api-update.php' , product);
  }

  //delete product
  deleteProduct(id) {
    return this.http.delete(this.patch + '/api-delete.php' , id);
  }

  //Check product name duplicate or not from api
  checkData(Inputname, InputId, action) {

    this.getAllProduct()

    // from manage-product (edit form)
    if (action == "edit") {
    
      //remove existing data from manage-product
      let indexForId = this.allProduct.findIndex(x => x.product_id == InputId);
      this.allProduct.splice(indexForId, 1)
      this.allProduct.push()

    }

    //check product name is duplicate or not
    let indexForProductName = this.allProduct.findIndex(x => x.product_name.toLowerCase().replace(/\s/g, "") == Inputname.toLowerCase().replace(/\s/g, ""));


    if (indexForProductName < 0) {  // data is not duplicate
      return true
    } else {
      if (indexForProductName > -1) {          //data is duplicate
        this.alert = { description: 'Product already exist!', color: 'text-danger' }
      }
      return false
    }

  }







}
