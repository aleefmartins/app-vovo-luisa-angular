import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { UserAccountService } from '../../../service/user-account.service';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule } from "@angular/common/http";
import { UserAccount } from '../../../models/user-account.model';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatCardModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatSnackBarModule, 
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule],
  providers: [HttpClientModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css'
})
export class UserCreateComponent {

  userAccount: UserAccount = {
    userName: '',
    userPhone: undefined,
    userCpf: undefined,
    userEndereco: '',
    userDataNascimento:'' ,
    userEmail: '',
  };

  constructor(private userAccountService: UserAccountService ,
              private router: Router, private dateAdapter: DateAdapter<Date>) { 
    this.dateAdapter.setLocale('en-US');
  }

  createUser(): void {

    if (this.userAccount.userDataNascimento instanceof Date) {
      this.userAccount.userDataNascimento = formatDate(this.userAccount.userDataNascimento, 'yyyy-MM-dd', 'en-US');
    }

    this.userAccountService.create(this.userAccount).subscribe(() => {
      this.userAccountService.showMessage('Cadastro realizado com sucesso!')
      this.router.navigate(['/userAccount'])
    })

  }

  cancel(): void {
    this.router.navigate(['/userAccount'])
  }

}
