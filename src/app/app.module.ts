import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './Components/Auth/log-in/log-in.component';
import { RegisterComponent } from './Components/Auth/register/register.component';
import { ProjectsComponent } from './Components/projects/projects.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForbiddenComponent } from './Components/Auth/forbidden/forbidden.component';

import { AuthGuard } from './Services/Auth/auth.guard';
import { JwtInterceptor } from './Services/Auth/jwt.interceptor';
import { ErrorInterceptor } from './Services/Auth/error.interceptor';
import { SpinnerInterceptor } from './Services/Spinner/spinner.interceptor';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StoreModule } from '@ngrx/store';
import { Reducers } from './app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OverlayComponent } from './Services/Overlay/overlay/overlay.component';
import { SpinnerComponent } from './Services/Spinner/spinner/spinner.component';
import { ForgotPasswordComponent } from './Components/Auth//forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    ProjectsComponent,
    ForbiddenComponent,
    OverlayComponent,
    SpinnerComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    OverlayModule,
    // NgbModule,
    StoreModule.forRoot(Reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
  entryComponents: [OverlayComponent, LogInComponent],
})
export class AppModule { }
