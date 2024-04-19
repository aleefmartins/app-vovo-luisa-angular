import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { UserUpdateComponent } from './user-update.component';
import { UserAccountService } from '../../../service/user-account.service';

describe('UserUpdateComponent', () => {
  let component: UserUpdateComponent;
  let fixture: ComponentFixture<UserUpdateComponent>;
  let userAccountServiceMock: any;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(async () => {
    userAccountServiceMock = jasmine.createSpyObj('UserAccountService', ['readById', 'update', 'showMessage']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    activatedRouteMock = { snapshot: { paramMap: { get: () => '123' } } };

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        BrowserAnimationsModule,
        UserUpdateComponent
      ],
      providers: [
        { provide: UserAccountService, useValue: userAccountServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserUpdateComponent);
    component = fixture.componentInstance;

    const mockUserAccount = {
      userId: '1', userName: 'Alef Yan Martins da Rocha',
      userEmail: 'alef.mrh@gmail.com',
      userPhone: 21979843608,
      userCpf: 15477049774,
      userEndereco: 'Rua Motorista',
      userDataNascimento: '1994-01-01'
    };

    userAccountServiceMock.readById.and.returnValue(of(mockUserAccount));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on init', () => {
    expect(userAccountServiceMock.readById).toHaveBeenCalledWith('123');
  });

  it('should update user and navigate on successful update', () => {
    userAccountServiceMock.update.and.returnValue(of({}));
    component.editUser();
    expect(userAccountServiceMock.update).toHaveBeenCalledWith(component.userAccount);
    expect(userAccountServiceMock.showMessage).toHaveBeenCalledWith('Registro atualizado com sucesso!');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('should navigate to users page on cancel', () => {
    component.cancel();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users']);
  });
});
