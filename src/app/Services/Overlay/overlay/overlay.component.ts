import { Component, OnInit, TemplateRef, Type } from '@angular/core';
import { MyOverlayRef } from '../my-overlay-ref';
import { ModalModel } from 'src/app/Models/Modal/modal-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/User/user.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
})
export class OverlayComponent implements OnInit {
  modalData: ModalModel;
  contentType: 'template' | 'string' | 'component' | 'modal';
  confirmEmail = false;
  SwitchToConfirmForm = false;
  errorMessage: string = '';

  ConfirmEmailForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private ref: MyOverlayRef, private userService: UserService) {}

  ngOnInit(): void {
    this.modalData = this.ref.content;

    if (typeof this.modalData === 'string') {
      this.contentType = 'string';
    } else if (this.modalData instanceof TemplateRef) {
      this.contentType = 'template';
      // this.modalData = {
      //   close: this.ref.close.bind(this.ref)
      // };
    } else {
      this.contentType = 'modal';
      if (this.modalData.modalMode == 'Forgot Password') {
        this.SwitchToConfirmForm = true;
      }
    }
  }

  ConfirmForm() {
    this.SwitchToConfirmForm = true;
    this.modalData.modalHeader = 'Type In Your Confirmation Email Below';
  }

  SendConfrimationEmail() {
    var email: string = this.ConfirmEmailForm.value.userEmail;
    if (this.modalData.modalSubMode == 'Confirm Email') {
      this.userService
        .ResendConfirmationEmail(email)
        .pipe(take(1))
        .subscribe(
          (res) => {
            this.close();
          },
          (error) => {
            if (error.status == 409) {
              this.errorMessage =
                'This email address has already been confirmed. You are good to log in.';
            } else if (error.status == 401) {
              this.errorMessage =
                'Sorry, this email has not been found in our system';
            } else {
              this.errorMessage =
                'Sorry, there is an issue with your servers, please try resending the confirmatio email later';
            }
          }
        );
    } else if (this.modalData.modalMode == 'Forgot Password') {
      this.userService
        .ForgotPassword(email)
        .pipe(take(1))
        .subscribe(
          (res) => {
            this.close();
          },
          (error) => {
            if (error.status == 404) {
              this.errorMessage =
                'Sorry, this email has not been found in our system';
            } else {
              this.errorMessage =
                'Sorry, there is an issue with your servers, please try resending the confirmatio email later';
            }
          }
        );
    }
  }

  close() {
    if (this.modalData.modalSubMode == 'Change Password Success') {
      this.ref.close('Change Password Success');
    } else {
      this.ref.close(null);
    }
  }
}
