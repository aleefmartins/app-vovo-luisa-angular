import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { UserDeleteComponent } from './user-delete.component';
import { UserAccountService } from '../../../service/user-account.service';

describe('UserDeleteComponent', () => {
  let component: UserDeleteComponent;
  let fixture: ComponentFixture<UserDeleteComponent>;
  let userAccountServiceMock: any;
  let routerMock: any;
  let dialogRefMock: any;

  beforeEach(async () => {
    userAccountServiceMock = jasmine.createSpyObj('UserAccountService', ['deleteProduct', 'showMessage']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    dialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatButtonModule,
        MatDialogModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        UserDeleteComponent
      ],
      providers: [
        { provide: UserAccountService, useValue: userAccountServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: { userId: '123' } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete user and navigate on success', () => {
    userAccountServiceMock.deleteProduct.and.returnValue(of({}));
    component.deleteUser();
    expect(userAccountServiceMock.deleteProduct).toHaveBeenCalledWith('123');
    expect(userAccountServiceMock.showMessage).toHaveBeenCalledWith('Registro excluido com sucesso.');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should handle errors when deleting user', () => {
    userAccountServiceMock.deleteProduct.and.returnValue(throwError(() => new Error('Failed to delete')));
    component.deleteUser();
    expect(userAccountServiceMock.deleteProduct).toHaveBeenCalledWith('123');
    expect(userAccountServiceMock.showMessage).toHaveBeenCalledWith('Erro ao excluir o registro.');
  });
});
