import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserAccountService } from './user-account.service';
import { UserAccount } from '../models/user-account.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Page } from '../models/page.model';

describe('UserAccountService', () => {
  let service: UserAccountService;
  let httpMock: HttpTestingController;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        UserAccountService,
        { provide: MatSnackBar, useValue: snackBarSpy } 
      ]
    });
    service = TestBed.inject(UserAccountService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('create', () => {
    it('should return a new user account on success', () => {
      const newUser: UserAccount = { userId: '1', userName: 'Alef',
      userEmail: 'alef.mrh@gmail.com',
      userPhone: 21979843608,
      userCpf: 15477049774,
      userEndereco: 'Rua Motorista Luis de Abreu',
      userDataNascimento: '1994-01-01' };
      service.create(newUser).subscribe(user => {
        expect(user).toEqual(newUser);
      });

      const req = httpMock.expectOne(`${service.baseUrl}`);
      expect(req.request.method).toBe('POST');
      req.flush(newUser);
    });

    it('should handle errors when creating a user account', () => {
      const newUser: UserAccount = { userId: '1', userName: 'Alef',
      userEmail: 'alef.mrh@gmail.com',
      userPhone: 21979843608,
      userCpf: 15477049774,
      userEndereco: 'Rua Motorista Luis de Abreu',
      userDataNascimento: '1994-01-01' };
      const mockErrorResponse = { status: 500, statusText: 'Internal Server Error', error: { message: 'Error occurred' } };
      const errorResponse = new HttpErrorResponse(mockErrorResponse);
    
      service.create(newUser).subscribe({
        next: () => {},
        error: error => {
          expect(error).toBe(errorResponse.message);
        }
      });
    
      const req = httpMock.expectOne(`${service.baseUrl}`);
      req.flush(mockErrorResponse.error, mockErrorResponse);
    });
  });

  it('should display an error message when there is a network error', () => {
    const errorResponse = new HttpErrorResponse({
      error: 'test error',
      status: 404, statusText: 'Not Found'
    });
  
    service.read().subscribe({
      next: () => {},
      error: (error) => {
        expect(error).toBe('Erro 404: Not Found');
      }
    });
  
    const req = httpMock.expectOne(`${service.baseUrl}/all`);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

  describe('read', () => {
    it('should fetch all user accounts successfully', () => {
      const users: UserAccount[] = [{ userId: '1', userName: 'Alef',
      userEmail: 'alef.mrh@gmail.com',
      userPhone: 21979843608,
      userCpf: 15477049774,
      userEndereco: 'Rua Motorista Luis de Abreu',
      userDataNascimento: '1994-01-01'}];
      service.read().subscribe((response) => {
        expect(response.length).toBe(1);
        expect(response).toEqual(users);
      });

      const req = httpMock.expectOne(`${service.baseUrl}/all`);
      expect(req.request.method).toBe('GET');
      req.flush(users);
    });

    it('should handle errors when fetching all user accounts', () => {
      service.read().subscribe({
        next: () => {},
        error: errorMessage => {
          expect(errorMessage).toContain('Erro 404: Not Found');
        }
      });

      const req = httpMock.expectOne(`${service.baseUrl}/all`);
      expect(req.request.method).toBe('GET');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('readById', () => {
    it('should fetch a single user account by ID successfully', () => {
      const user: UserAccount = { userId: '1', userName: 'Alef',
      userEmail: 'alef.mrh@gmail.com',
      userPhone: 21979843608,
      userCpf: 15477049774,
      userEndereco: 'Rua Motorista Luis de Abreu',
      userDataNascimento: '1994-01-01' };
      service.readById('1').subscribe(response => {
        expect(response).toEqual(user);
      });

      const req = httpMock.expectOne(`${service.baseUrl}/1`);
      expect(req.request.method).toBe('GET');
      req.flush(user);
    });

    it('should handle errors when fetching a user account by ID', () => {
      service.readById('999').subscribe({
        next: () => {},
        error: errorMessage => {
          expect(errorMessage).toContain('Erro 404: Not Found');
        }
      });

      const req = httpMock.expectOne(`${service.baseUrl}/999`);
      expect(req.request.method).toBe('GET');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('update', () => {
    it('should update a user account successfully', () => {
      const updatedUser: UserAccount = { userId: '1', userName: 'Alef',
      userEmail: 'alef.mrh@gmail.com',
      userPhone: 21979843608,
      userCpf: 15477049774,
      userEndereco: 'Rua Motorista Luis de Abreu',
      userDataNascimento: '1994-01-01'};
      service.update(updatedUser).subscribe(response => {
        expect(response).toEqual(updatedUser);
      });

      const req = httpMock.expectOne(`${service.baseUrl}/1`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedUser);
    });

    it('should handle errors when updating a user account', () => {
      const updatedUser: UserAccount = { userId: '1', userName: 'Alef',
      userEmail: 'alef.mrh@gmail.com',
      userPhone: 21979843608,
      userCpf: 15477049774,
      userEndereco: 'Rua Motorista Luis de Abreu',
      userDataNascimento: '1994-01-01' };
      service.update(updatedUser).subscribe({
        next: () => {},
        error: errorMessage => {
          expect(errorMessage).toContain('Erro 500: Server Error');
        }
      });

      const req = httpMock.expectOne(`${service.baseUrl}/1`);
      expect(req.request.method).toBe('PUT');
      req.flush('Server Error', { status: 500, statusText: 'Server Error' });
    });
  });

  describe('getUsersByDateRange', () => {
    it('should return users within the specified date range', () => {
      const result: Page<UserAccount> = {
        content: [{
          userId: '1', userName: 'Alef',
          userEmail: 'alef.mrh@gmail.com',
          userPhone: 21979843608,
          userCpf: 15477049774,
          userEndereco: 'Rua Motorista Luis de Abreu',
          userDataNascimento: '1994-01-01'
        }],
        totalPages: 1,
        totalElements: 1,
        last: true,
        size: 0,
        number: 0,
        first: false,
        empty: false
      };
      service.getUsersByDateRange('2020-01-01', '2020-01-31').subscribe(data => {
        expect(data).toEqual(result);
      });

      const req = httpMock.expectOne(req => req.url.includes('/byDateRange'));
      expect(req.request.method).toBe('GET');
      req.flush(result);
    });

    it('should handle errors when fetching users by date range', () => {
      service.getUsersByDateRange('2020-01-01', '2020-01-31').subscribe({
        next: () => {},
        error: errorMessage => {
          expect(errorMessage).toContain('Erro 400: Bad Request');
        }
      });

      const req = httpMock.expectOne(req => req.url.includes('/byDateRange'));
      expect(req.request.method).toBe('GET');
      req.flush('Bad Request', { status: 400, statusText: 'Bad Request' });
    });
  });

  describe('downloadPDF', () => {
    it('should successfully download a PDF file', () => {
      const dummyBlob = new Blob(['dummy pdf content'], { type: 'application/pdf' });
      service.downloadPDF('2020-01-01', '2020-01-31').subscribe(response => {
        expect(response.size).toBeGreaterThan(0);
      });
    
      const req = httpMock.expectOne(req => req.url.includes('/downloadPDF'));
      expect(req.request.method).toBe('GET');
      req.flush(dummyBlob, { status: 200, statusText: 'OK' });
    });

    it('should handle errors during PDF download', () => {
      service.downloadPDF('2020-01-01', '2020-01-31').subscribe({
        next: () => {},
        error: (errorMessage) => {
          expect(errorMessage).toContain('Erro 500: Internal Server Error');
        }
      });
    
      const req = httpMock.expectOne(req => req.url.includes('/downloadPDF'));
      req.flush(new Blob(), { status: 500, statusText: 'Internal Server Error' }); 
    });
    
  });

  describe('deleteUser', () => {
    it('should successfully delete a user account', () => {
      service.deleteUser('1').subscribe(response => {
        expect(response).toBeTruthy();  
      });
  
      const req = httpMock.expectOne(`${service.baseUrl}/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    });
  
    it('should handle errors when deleting a user account', () => {
      service.deleteUser('999').subscribe({
        next: () => {},
        error: errorMessage => {
          expect(errorMessage).toContain('Erro 404: Not Found');
        }
      });
  
      const req = httpMock.expectOne(`${service.baseUrl}/999`);
      expect(req.request.method).toBe('DELETE');
      req.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });
  

});
