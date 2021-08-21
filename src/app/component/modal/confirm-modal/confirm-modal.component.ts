import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../../service/sharedservice.service';
import { ProductServiceService } from '../../../service/product-service.service';
import { ProductListComponent } from '../../../page/product-list/product-list.component';


/*
 ---------------  Confirm Box   -------------------
*/


@Component({
  selector: 'app-confirm-modal',
  template: `
  <div class="container">
    <!-- The Modal -->
    <div class="modal" id="confirm_modal">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h6 class="modal-title">  Are you sure want to delete?</h6>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal" (click)="deleteProduct()">Delete</button>
                    <button type="button" class="btn btn-light" data-dismiss="modal">Cancel</button>
                </div>

            </div>
        </div>
    </div>
</div>
  `,

})
export class ConfirmModalComponent implements OnInit {

  @Input('paramProduct') Product: { id: string };


  constructor(
    private _shared: SharedService,
    public _product_service: ProductServiceService,
    private _product_list : ProductListComponent
  ) {

  }


  ngOnInit(): void {

  }


  deleteProduct() {
    this._product_service.getAllProduct()
    this._product_service.deleteProduct(this.Product.id).subscribe(
      (data) => {
        this._product_service.getAllProduct();
        this._product_list.resetForm();
        this._shared.toastrService.success('Product deleted successfully !', 'Product');
      });

  }

}
