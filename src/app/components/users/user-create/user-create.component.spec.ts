import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCreateComponent } from './user-create.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserAccountService } from '../../../service/user-account.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { UserAccount } from '../../../models/user-account.model';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;
  let service: UserAccountService;
  let router: Router;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([]),
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        UserCreateComponent
      ],
      providers: [UserAccountService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UserAccountService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createUser and navigate on success', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const showMessageSpy = spyOn(service, 'showMessage').and.callThrough();
    const mockUserAccount: UserAccount = {
      userName: 'Alef',
      userEmail: 'alef.mrh@gmail.com',
      userPhone: 21979843608,
      userCpf: 15477049774,
      userEndereco: 'Rua Motorista Luis de Abreu',
      userDataNascimento: '1994-01-01'
    };
    spyOn(service, 'create').and.returnValue(of(mockUserAccount));
  
    component.createUser();
  
    expect(service.create).toHaveBeenCalled();
    expect(showMessageSpy).toHaveBeenCalledWith('Cadastro realizado com sucesso!');
    expect(navigateSpy).toHaveBeenCalledWith(['/userAccount']);
  });

  it('should navigate to "/userAccount" when cancel is called', () => {
    const navigateSpy = spyOn(router, 'navigate');

    component.cancel();

    expect(navigateSpy).toHaveBeenCalledWith(['/userAccount']);
  });
});
