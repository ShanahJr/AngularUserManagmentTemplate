import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService, TOKEN_NAME } from 'src/app/Services/User/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OverlayService } from 'src/app/Services/Overlay/overlay.service';
import { take } from 'rxjs/operators';
import { ModalModel } from 'src/app/Models/Modal/modal-model';
import { ForgotPasswordModel } from 'src/app/Models/LogIn/forgot-password';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  model: any = {};
  errorMessage: string = '';
  token = '';
  ConfirmPassword: string = '';
  ConfirmationError: string;

  ChangePasswordForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private overlayService: OverlayService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.token = params.get('token');
    });
  } // ngOnInit

  CheckPassword(Password: string, ConfirmationPassword: string): boolean {
    if (Password == ConfirmationPassword) {
      this.ConfirmationError = '';
      return true;
    } else {
      if (this.ConfirmPassword != '') {
        this.ConfirmationError =
          'Password and confirmation password do not match';
        return false;
      }

      this.ConfirmationError = '';
      return false;
    }
  } // Check password function

  open(modal: ModalModel) {
    const ref = this.overlayService.open(modal, null);

    ref.afterClosed$.pipe(take(1)).subscribe((res) => {
      if (res.data == 'Change Password Success') {
        this.router.navigate(['/LogIn']);
      }
    });
  }

  ChangePassword() {
    var password = this.ChangePasswordForm.value.password;
    this.userService
      .ChangePassword(password, this.token)
      .pipe(take(1))
      .subscribe(
        (res) => {
          var modal = new ModalModel();
          modal.modalHeader = 'Successs!!!';
          modal.modalBody = 'You have successfully changed your pssword.';
          modal.modalMode = 'Normal Message';
          modal.modalSubMode = 'Change Password Success';
          this.open(modal);
        },
        (error) => {
          if (error.status == 500) {
            var modal = new ModalModel();
            modal.modalHeader = 'oops, it seems the link you used is expired';
            modal.modalBody =
              'Please request a password change again and click on the link in the email withi 2 hours.';
            modal.modalMode = 'Normal Message';
            this.open(modal);
          } else {
            var modal = new ModalModel();
            modal.modalHeader = 'Oh no, something is wrong';
            modal.modalBody =
              'Our servers are down and we are working on getting them back up, please try logging in later';
            modal.modalMode = 'Normal Message';
            this.open(modal);
          }
        }
      );

    // var LogIn: LogInModel = this.LoginForm.value;
    // this.userService
    //   .Login(LogIn)
    //   .pipe(take(1))
    //   .subscribe(
    //     (res) => {
    //       if (res.token) {
    //         localStorage.setItem(TOKEN_NAME, res.token);
    //         const helper = new JwtHelperService();
    //         const decodedToken = helper.decodeToken(
    //           localStorage.getItem(TOKEN_NAME)
    //         );
    //         localStorage.setItem('UserRole', decodedToken.Role);
    //         this.router.navigate(['/Projects']);
    //       }
    //     },
    //     (error) => {
    //       if (error.statusText == 'Unauthorized') {
    //         var modal = new ModalModel();
    //         modal.modalHeader = 'Oops!';
    //         modal.modalBody =
    //           'Your email or password is incorrect. Please check them and try again';
    //         modal.modalMode = 'Normal Message';
    //         this.open(modal);
    //       } else if (error.statusText == 'Conflict') {
    //         var modal = new ModalModel();
    //         modal.modalHeader = 'There is a slight problem';
    //         modal.modalBody =
    //           'You need to have confirmed your email in order to logIn.';
    //         modal.modalMode = 'Normal Message';
    //         modal.modalSubMode = 'Confirm Email';
    //         this.open(modal);
    //       } else {
    //         var modal = new ModalModel();
    //         modal.modalHeader = 'We are very sorry.';
    //         modal.modalBody =
    //           'Our servers are down and we are working on getting them back up, please try logging in later';
    //         modal.modalMode = 'Normal Message';
    //         this.open(modal);
    //       }
    //     }
    //   );
  } // Login Method
}
