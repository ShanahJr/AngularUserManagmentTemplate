import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OverlayService } from 'src/app/Services/Overlay/overlay.service';

import { UserService, TOKEN_NAME } from '../../../Services/User/user.service';
import { LogInModel } from '../../../Models/LogIn/log-in-model';
import { take } from 'rxjs/operators';
import { UserModel } from 'src/app/Models/User/user-model';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import * as Bootstrap from '../../../../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import { ModalModel } from 'src/app/Models/Modal/modal-model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  model: any = {};
  errorMessage: string = '';
  UserID = 0;

  LoginForm = new FormGroup({
    userEmail: new FormControl('', [Validators.required, Validators.email]),
    userPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.UserID = parseInt(params.get('id'));
    });

    if (this.UserID > 0) {
      this.userService
        .ConfirmEmail(this.UserID)
        .pipe(take(1))
        .subscribe(
          () => {
            var modal = new ModalModel();
            modal.modalHeader = 'Hooorayyyyy!!!!';
            modal.modalBody =
              'Your account has been verified. We hope you enjoy the experience.';
            modal.modalMode = 'Normal Message';
            this.open(modal);
          },
          (error) => {
            if (error.statusText == 'Unknown Error') {
              var modal = new ModalModel();
              modal.modalHeader = 'Oh No!';
              modal.modalBody =
                'Something is wrong with our servers, we cant verify your account at the moment. Please come back and try again later.';
              modal.modalMode = 'Normal Message';
              this.open(modal);
            }
            if (error.statusText == 'Conflict') {
              var modal = new ModalModel();
              modal.modalHeader = 'This must be a mistake';
              modal.modalBody =
                'You have aready confirmed your email address, you are all set to log in.';
              modal.modalMode = 'Normal Message';
              this.open(modal);
            }
          }
        );
    }
  } // ngOnInit

  open(modal: ModalModel) {
    const ref = this.overlayService.open(modal, null);

    ref.afterClosed$.subscribe((res) => {});
  }

  LogIn() {
    var LogIn: LogInModel = this.LoginForm.value;
    this.userService
      .Login(LogIn)
      .pipe(take(1))
      .subscribe(
        (res) => {
          if (res.token) {
            localStorage.setItem(TOKEN_NAME, res.token);
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(
              localStorage.getItem(TOKEN_NAME)
            );
            localStorage.setItem('UserRole', decodedToken.Role);
            this.router.navigate(['/Projects']);
          }
        },
        (error) => {
          if (error.statusText == 'Unauthorized') {
            var modal = new ModalModel();
            modal.modalHeader = 'Oops!';
            modal.modalBody =
              'Your email or password is incorrect. Please check them and try again';
            modal.modalMode = 'Normal Message';
            this.open(modal);
          } else if (error.statusText == 'Conflict') {
            var modal = new ModalModel();
            modal.modalHeader = 'There is a slight problem';
            modal.modalBody =
              'You need to have confirmed your email in order to logIn.';
            modal.modalMode = 'Normal Message';
            modal.modalSubMode = 'Confirm Email';
            this.open(modal);
          } else {
            var modal = new ModalModel();
            modal.modalHeader = 'We are very sorry.';
            modal.modalBody =
              'Our servers are down and we are working on getting them back up, please try logging in later';
            modal.modalMode = 'Normal Message';
            this.open(modal);
          }
        }
      );
  } // Login Method

  ForgotPassword() {
    console.log('Cheese');

    var modal = new ModalModel();
    modal.modalHeader =
      'You will get an email to confirm password reset, link expires in two hours';
    modal.modalMode = 'Forgot Password';
    modal.modalSubMode = '';
    this.open(modal);
  }
}
