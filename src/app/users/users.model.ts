export interface User {
    UserID: number;
    Name: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Roles: string;
    RoleID: number;
    ImagePath: string;
    IsActive: Boolean;
}

export class userForm {
    UserID: number = 0;
    UserTypeID:number=0;
    Name: string = '';
    Email: string = '';
    FirstName: string = '';
    LastName: string = '';
    Roles: string = 'Developer';
    RoleID: number = 0;
    ImagePath: string = '';
    IsActive: Boolean = true;
}

export interface Role {

    Email: string;
    FirstName: string;
    LastName: string;
    Name: string;
    RoleID: number;
    Roles: string;

}