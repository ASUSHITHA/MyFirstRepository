import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User, userForm, Role } from './users.model';
import { UsersServices } from './users.services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',

  styleUrls: ['./users.component.css'],
  providers: [UsersServices]
})
export class UsersComponent implements OnInit {
  id: any;
  public isNew: boolean;
  public isDisabled: boolean;
  public addition: string = 'AddUser';
  public deletion: string = 'Delete';
  public edit: string = 'EditUser';
  public userInfo: User;
  public Roles: Array<Role> = []
  getAddUser() {
    return this.addition;
  }

  getDelete() {

    return this.deletion;
  }
  public lstUsers: User[] = [];
  //public Role: User[] = []; //automatically get the all parameters
  //public allowNewUser = false;
  SelectedUser: Number;
  public lstAllUsers: any = [];
  public signupForm: FormGroup;

  forbiddenUserTypeID = [0];
  forbiddenRoleID = [0];
  forbiddenName = [this.lstUsers];


  // _userService: UsersServices;
  // @ViewChild('f') signupForm: NgForm;

  constructor(private _userService: UsersServices) {
    // this._userService = _userService

    //this.allowNewUser = true;
  }

  ngOnInit() {


    this._userService.getRole().subscribe((response) => {
      console.log(response);
      console.log(response.json())
      this.Roles = response.json();
      console.log(this.Roles);
    }, (error) => {
      console.log(error)
      alert(error.statusText)
    });
    console.log(this.Roles);



    this._userService.getlstUsers().subscribe((response) => {
      console.log(response);
      console.log(response.json())
      this.lstUsers = response.json();
      // console.log(this.lstUsers);
    }, (error) => {
      console.log(error)
      alert(error.statusText)
    });
    console.log(this.lstUsers);


    this.signupForm = new FormGroup({
      'UserID': new FormControl(0),
      'Name': new FormControl(null, [Validators.required, this.forbiddenUniqueName.bind(this)]),
      'UserTypeID': new FormControl('0', [Validators.required, this.forbiddenUserType.bind(this)]),
      'Email': new FormControl(null, [Validators.required, Validators.email]),
      'FirstName': new FormControl(null, Validators.required),
      'LastName': new FormControl(null, Validators.required),
      'RoleID': new FormControl('select', [Validators.required, this.forbiddenRole.bind(this)]),
      'ImagePath': new FormControl(''),
      'IsActive': new FormControl(true)
    })
  }
  //ADD USER---------------------------------------------------------

  openModal: Boolean = false;
  add() {
    console.log('add user');
    this.addition = "Add User";
    this.isNew = true;
    //this.isDisabled=false;
    this.openModal = true;
    this.signupForm.reset(new userForm());
    this.signupForm.get('UserTypeID').enable();
    this.signupForm.get('RoleID').enable();

  }
  onSubmit() {
    console.log(this.signupForm);

  };
  addUser() {
    console.log(this.signupForm);

    const control = new FormControl(null, Validators.required);
    // this.lstUsers.push(this.signupForm.getRawValue());


    console.log(this.signupForm.getRawValue());
    let sendingObject = this.signupForm.getRawValue();//for creating array
    sendingObject.Roles = [];
    console.log(this.signupForm.getRawValue().Roles);
    sendingObject.Roles.push(this.signupForm.getRawValue().RoleID);

    this._userService.postlstUsers(sendingObject).subscribe((response) => {
      
      let roleInfo = this.Roles.find(item => item.RoleID == response.json().userCustom.Roles);
      console.log(response.json());
      let userObj = response.json().userCustom;
      userObj.Roles[0] = roleInfo.Roles;;
      // response.json().userCustom.Roles[0] = roleInfo.Roles;
      this.lstUsers.push(userObj);
      console.log(response.json());

    }, (error) => {
      console.log(error)
      alert(error.statusText)
    });

    this.signupForm.reset(new userForm());
    this.openModal = false;


  }

  //DELETE USER-----------------------------------------------------------------------
  myModal: boolean = false;
  delModal: boolean = false;
  OpenModal(UserID) {
    this.myModal = true;
    // this.SelectedUser =Name;
    this.id = UserID;
    //this.deletion = "Are you sure wants to Delete?";
  }
  deleteUser() {
    let exceptDeletedItmes = this.lstUsers.find(item => item.UserID == this.id);
    console.log(exceptDeletedItmes);
    this._userService.delete(exceptDeletedItmes).subscribe((response) => {
      let index = this.lstUsers.findIndex(x => x.UserID == exceptDeletedItmes.UserID);
      this.lstUsers.splice(index, 1);


     
      this.deletion = "User Deleted Succesfully";
      this.delModal = false; 
      //alert("User Deleted Succesfully");

    }, (error) => {
      console.log(error)
      alert(error.statusText)
    });
    // console.log(this.lstUsers);
    this.myModal = false;

  }

  //EDIT USER--------------------------------------------------------------------------
  editModal: Boolean = false;
  EditOpen(UserID) {
    this.signupForm.get('UserTypeID').disable();
    this.signupForm.get('RoleID').disable();
    this.openModal = true;
    this.SelectedUser = UserID;
    //this.signupForm = "Roles" ;
    this.addition = "EditUser";
    this.isNew = false;
    this.isDisabled = true;

    let i = this.lstUsers.find(item => item.UserID == this.SelectedUser);
    this.signupForm.reset(i);


  }

  editUser() {

    console.log(this.signupForm.value);

    this.openModal = false;
    let sendingObject = this.signupForm.getRawValue();
    sendingObject.Roles = [];
    console.log(this.signupForm.getRawValue().Roles);
    sendingObject.Roles.push(this.signupForm.getRawValue().RoleID);

    this._userService.putlstUsers(sendingObject).subscribe((response) => {
      console.log(response);
      let editedUser = this.lstUsers.find(item => item.UserID == this.signupForm.value.UserID);
      editedUser.Name = this.signupForm.value.Name;
      editedUser.Email = this.signupForm.value.Email;
      editedUser.FirstName = this.signupForm.value.FirstName;
      editedUser.LastName = this.signupForm.value.LastName;
      editedUser.RoleID = this.signupForm.value.RoleID;

      editedUser.Roles = this.Roles.find(x => x.RoleID == editedUser.RoleID).Roles;
      // for (let i = 0; i < this.Roles.length; i++) {
      //   if (this.Roles[i].RoleID == editedUser.RoleID) {
      //     editedUser.Roles = this.Roles[i].Roles
      //   } 
      // }

      console.log(this.signupForm.getRawValue());
      this.signupForm.reset();

    }, (error) => {
      console.log(error)
      alert(error.statusText)
    });
  }

  forbiddenUserType(control: FormControl): { [s: string]: boolean } {

    if (this.forbiddenUserTypeID.includes(control.value)) {
      return { 'UserTypeIsForbidden': true };

    }
    return null;

  }

  forbiddenRole(control: FormControl): { [s: string]: boolean } {

    if (this.forbiddenUserTypeID.includes(control.value)) {
      return { 'RoleIsForbidden': true };

    }
    return null;

  }

  forbiddenUniqueName(control: FormControl): { [s: string]: boolean } {
    
    if (this.Roles.find(x => x.Name == control.value) && (x => x.Name.toLowerCase() == control.value.toLowerCase()) ) {
      return { 'UniqueNameIsForbidden': true };
      }
    return null;
    }

}