import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular//core';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpModule } from '@angular/http';
//import { ConfirmationDialog } from './confirm-dialog/confirmation-dialog';






@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    //ConfirmationDialog

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    FormsModule,
    HttpModule
    ],
  
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
