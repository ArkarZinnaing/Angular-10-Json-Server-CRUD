import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/sharedservice.service';
import { ProductServiceService } from '../../service/product-service.service';
import { Product } from '../../modal/product.modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var $: any;




@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  searchText;  // for search filter

  // for data show
  product_id;
  product_name;
  product_price;

  product: Product[]

  // for reset form
  submitted;
  btndisabled;
  form: FormGroup;

  alert = [];    // for alart dialog


  get f() { return this.form.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private _shared: SharedService,
    public _product_service: ProductServiceService
  ) {

    this.getAllProduct()

    //Validate all text inputs
    this.form = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      price: ['', Validators.required]
    });

    this.resetForm();

  }

  // rest form data and buttons after submit
  resetForm() {
    this.form.reset();
    this.submitted = false
    this.btndisabled = true;
    this.form.controls['name'].disable();
    this.form.controls['price'].disable();

    this.product_id = ""
    this.product_name = ""
    this.product_price = ""
  }


  // get all data from api
  getAllProduct() {
    this._product_service.getAllProduct();
  }

  editProduct(product) {
    this.product_id = product.id
    this.product_name = product.name
    this.product_price = product.price

    this.btndisabled = false;
    this.form.controls['name'].enable();
    this.form.controls['price'].enable();
  }

  deleteProduct(id) {
    this.product_id = id
  }


  updateProduct() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    let data = {
      id: this.product_id,
      name: this.f.name.value,
      price: this.f.price.value,
    }
    // Check values are blank or not
    if (this.f.name.value != '' && this.f.price.value != '') {

      //check duplicate product name 
      if (this._product_service.checkData(this.f.name.value, this.product_id , "edit")) {

        this._product_service.updateProduct(data).subscribe(
          (result: Product) => {
            $('#alert_modal').modal('hide')
            this._shared.toastrService.success('Product updated successfully !', 'Product');
            // after submitted form reset
            this.resetForm();
            this._product_service.getAllProduct();

          });

      } else {
        // show message box
        $('#alert_modal').modal('show');
        //insert message box data
        this.alert = this._product_service.alert;
      }

    }

  }


  ngOnInit(): void {
  }

}
