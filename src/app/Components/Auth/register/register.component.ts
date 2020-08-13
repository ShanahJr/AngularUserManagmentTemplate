import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService, TOKEN_NAME } from 'src/app/Services/User/user.service';
import { take } from 'rxjs/operators';
import { UserModel } from 'src/app/Models/User/user-model';
import { Router } from '@angular/router';

import * as Bootstrap from '../../../../../node_modules/bootstrap/dist/js/bootstrap.min.js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  ConfirmPassword: string = '';
  ConfirmationError: string;
  errorMessage: string;

  MessageHeader = '';
  MessageBody = '';
  isError = false;

  RegisterForm: any;

  ngOnInit(): void {
    this.RegisterForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      userSurname: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  RegisterUser() {
    var NewUser: UserModel = this.RegisterForm.value;
    this.userService
      .Register(NewUser)
      .pipe(take(1))
      .subscribe(
        (res) => {
          //alert('Registration was successful');
          this.isError = false;

          var modal = document.getElementById('RegistrationModal');
          modal.style.removeProperty('z-index');

          this.MessageHeader = 'Hoooooorrraaaaaaayyyyyyy';
          this.MessageBody =
            'You have been successfully registered into our system, there is one more thing you need to do though, check your email so you can verify your account.';

          this.ShowModal();
        },
        (error) => {
          //debugger;
          if (error.statusText == 'Unknown Error') {
            this.isError = true;
            this.errorMessage =
              'Sorry, the server is down at the moment. Please try again later';

            this.MessageHeader = 'Oh No, something is wrong';
            this.MessageBody =
              'Sorry, the server is down at the moment. Please try again later';
            this.ShowModal();
          } else if (error.statusText == 'Conflict') {
            this.isError = true;
            this.MessageHeader = 'There is a slight problem';
            this.MessageBody = 'The Email already exists, please Log in';
            this.ShowModal();
          } else {
            this.isError = true;
            this.MessageHeader = 'Hmmm, we have a slight issue';
            this.MessageBody =
              'Sorry, something is wrong with out system. Please try and register again' +
              'later';
          }
        }
      );
  }

  CheckPassword(Password: string, ConfirmationPassword: string): boolean {
    if (Password == ConfirmationPassword) {
      console.log('Passwords are equal');
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

  ShowModal() {
    var modal = document.getElementById('RegistrationModal');
    modal.style.removeProperty('z-index');
    var myModal = new Bootstrap.Modal(
      document.getElementById('RegistrationModal')
    );
    myModal.show();
  }
  CloseModal() {
    var modal = document.getElementById('RegistrationModal');
    modal.style.setProperty('z-index', '-1');
  }

  GoToLogIn() {
    this.router.navigate(['/LogIn']);
  }
}
