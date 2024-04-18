import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserAccountService } from '../../../service/user-account.service';
import { UserDeleteComponent } from '../user-delete/user-delete.component';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userAccountServiceMock: any;
  let dialogMock: any;
  let routerMock: any;

  beforeEach(async () => {
    userAccountServiceMock = jasmine.createSpyObj('UserAccountService', ['getUsersByDateRange', 'downloadPDF', 'showMessage', 'read']);
    userAccountServiceMock.getUsersByDateRange.and.returnValue(of({content: [], totalElements: 0}));
    userAccountServiceMock.downloadPDF.and.returnValue(of(new Blob()));
    userAccountServiceMock.showMessage.and.returnValue();
    userAccountServiceMock.read.and.returnValue(of([]));

    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterTestingModule,
        UserListComponent
      ],
      providers: [
        { provide: UserAccountService, useValue: userAccountServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter users correctly', () => {
    component.onSubmitFilter();
    expect(userAccountServiceMock.getUsersByDateRange).toHaveBeenCalled();
  });

  it('should handle PDF download', () => {
    component.downloadPDF();
    expect(userAccountServiceMock.downloadPDF).toHaveBeenCalled();
  });

  it('should open delete dialog and navigate on result', () => {
    const dialogRef = { afterClosed: () => of(true) };
    dialogMock.open.and.returnValue(dialogRef);
    component.openDeleteDialog({
      userId: '1', userName: 'Alef',
      userEndereco: '',
      userEmail: ''
    });
    expect(dialogMock.open).toHaveBeenCalledWith(UserDeleteComponent, {
      width: '300px',
      data: { userId: '1', userName: 'Alef' }
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/users']);
  });
});
