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
  ModalHeader = '';
  ModalBody = '';

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
    this.open();

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.UserID = parseInt(params.get('id'));
    });

    if (this.UserID > 0) {
      this.userService
        .ConfirmEmail(this.UserID)
        .pipe(take(1))
        .subscribe(
          () => {
            this.ModalBody =
              'Your account has been verified. We hope you enjoy the experience.';
            this.ModalHeader = 'Hooorayyyyy!!!!';
            this.ShowModal();
          },
          (error) => {
            if (error.statusText == 'Unknown Error') {
              this.ModalHeader = 'Oh No!';
              this.ModalBody =
                'Something is wrong with our servers, we cant verify your account at the moment. Please come back and try again later.';
              this.ShowModal();
            }
            if (error.statusText == 'Conflict') {
              this.ModalHeader = 'This must be a mistake';
              this.ModalBody =
                'You have aready confirmed your email address, you are all set to log in.';
              this.ShowModal();
            }
          }
        );
    }
  } // ngOnInit

  open() {
    var modal = new ModalModel();
    modal.modalBody = 'Body';
    modal.modalHeader = 'Tester';
    modal.modalMode = 'Login Screen';

    const ref = this.overlayService.open(modal, null);

    ref.afterClosed$.subscribe((res) => {});
  }

  ShowModal() {
    var modal = document.getElementById('LogInModal');
    modal.style.removeProperty('z-index');
    var myModal = new Bootstrap.Modal(document.getElementById('LogInModal'));
    myModal.show();
  }

  CloseModal() {
    var modal = document.getElementById('LogInModal');
    modal.style.setProperty('z-index', '-1');
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
            this.ModalHeader = 'Oops!';
            this.ModalBody =
              'Your email or password is incorrect. Please check them and try again';
            this.ShowModal();
          } else if (error.statusText == 'Conflict') {
            this.ModalHeader = 'There is a slight problem';
            this.ModalBody =
              'You need to have confirmed your email in order to logIn';
            this.ShowModal();
          } else {
            this.ModalHeader = 'We are very sorry.';
            this.ModalBody =
              'Our servers are down and we are working on getting them back up, please try logging in later';
            this.ShowModal();
          }
        }
      );
  } // Login Method
}
