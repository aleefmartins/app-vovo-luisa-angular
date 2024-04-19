import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { UserAccount } from '../../../models/user-account.model';
import { UserAccountService } from '../../../service/user-account.service';
import { MatDialog } from '@angular/material/dialog';
import { UserDeleteComponent } from '../user-delete/user-delete.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [HttpClientModule],
  imports: [
    MatButtonModule,
    MatTableModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatFormFieldModule,
    RouterModule,
    MatButtonModule, MatCardModule, MatTableModule, MatInputModule, MatPaginatorModule
  ]
})
export class UserListComponent implements OnInit {

  dataSource = new MatTableDataSource<UserAccount>();

  userAccount: UserAccount[] = [];
  displayedColumns = ['userName', 'userCpf','userPhone','userEmail', 'userDataCriacao', 'action'];
  start: Date | null = null;
  end: Date | null = null;

  totalItems = 0;
  pageSize = 10;
  currentPage = 0;
  filterSubmitted = false;
  pageSizeOptions: number[] = [5, 10, 25, 100];


  constructor(private userAccountService: UserAccountService, private dialog: MatDialog, private router: Router,) {}

  ngOnInit(): void {
    this.applyFilter();
  }

  handlePage(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyFilter(); 
  }

  downloadPDF(): void {
    if (!this.start || !this.end) {
      if (!this.start) {
        this.start = new Date(1, 0, 1);
      }
      if (!this.end) {
        this.end = new Date();
      }
    }
  
    let startISO = this.start.toISOString().split('T')[0];
    let endISO = this.end.toISOString().split('T')[0];
  
    this.userAccountService.downloadPDF(startISO, endISO)
      .subscribe(
        (pdfBlob: Blob) => {
          const blobUrl = window.URL.createObjectURL(pdfBlob);
          const anchor = document.createElement('a');
          anchor.href = blobUrl;
          anchor.download = 'lista-de-clientes-vovo-luisa.pdf';
          anchor.click();
          window.URL.revokeObjectURL(blobUrl);
        },
        error => {
          console.error('Ocorreu um erro ao baixar o PDF:', error);
        }
      );
  }
  
  
  applyFilter(): void {

    if (this.filterSubmitted && !this.start) {
      this.userAccountService.showMessage('Por favor, preencha o campo Data Inicial');
      return;
    }

    if(this.start === null){
      let dateNow = new Date();
      dateNow.setDate(dateNow.getDate()- 30);
      this.start = dateNow;
    }
  
    let startISO = this.start ? this.start.toISOString().split('T')[0] : '';
    let endISO = this.end ? this.end.toISOString().split('T')[0] : '';


    if (this.end && this.end < this.start) {
      this.userAccountService.showMessage('A Data Final não pode ser anterior à Data Inicial');
      return;
    }
  
    if (!endISO) {
      endISO = new Date().toISOString().split('T')[0];
      this.end = new Date();
    }
  
    this.userAccountService.getUsersByDateRange(startISO, endISO, this.currentPage, this.pageSize)
    .subscribe(
      response => {
        this.userAccount = response.content;
        this.totalItems = response.totalElements;
      },
      error => {
        console.error('Ocorreu um erro ao filtrar por data:', error);
      }
    );
  }
  


  onSubmitFilter(): void {
    this.filterSubmitted = true;
    this.applyFilter();
  }
  
  

  openDeleteDialog(user: UserAccount): void {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      width: '300px',
      data: { userId: user.userId, userName: user.userName }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('o Registro foi excluido com sucesso!');
        this.router.navigate(['/users']);
      }
    });
  }
}
