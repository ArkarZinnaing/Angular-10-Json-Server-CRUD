import { Component, OnInit, Input } from '@angular/core';


/*
 ---------------  Message Box (colors : boostrap text colors)  ----------------------
 parameter : { description: 'description', color: 'text-danger' }
*/


@Component({
  selector: 'app-alert-modal',
  template: `
  <div class="container">
    <!-- The Modal -->
    <div class="modal" id="alert_modal">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content">

                <!-- Modal body -->
                <div class="modal-body" [ngClass]="message.color">
                    <h6><i class="fa fa-info-circle"></i> {{message.description}}</h6>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" #closebutton data-dismiss="modal">OK</button>
                </div>

            </div>
        </div>
    </div>
</div>
  `,
})
export class AlertModalComponent implements OnInit {

  // get param message
  @Input('paramMessage') message: { description: string, color: string };

  constructor() { }

  ngOnInit(): void {
  }

}
