import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserAccount } from '../../../models/user-account.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAccountService } from '../../../service/user-account.service';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, DateAdapter } from '@angular/material/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-user-update',
  standalone: true,
  imports: [
    MatButtonModule, 
    MatCardModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatSnackBarModule, 
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
],
  providers: [HttpClientModule],
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent {

  title = "Atualização de Cadastro";

  userAccount!: UserAccount;

  constructor(private userAccountService: UserAccountService,
              private router: Router,
              private route: ActivatedRoute) { 
              }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('userId')!;
    this.userAccountService.readById(userId).subscribe(userAccount => {
      this.userAccount = userAccount;
    })
  }

 editUser(): void {
    this.userAccountService.update(this.userAccount).subscribe(() => {
    this.userAccountService.showMessage('Registro atualizado com sucesso!');
    this.router.navigate(['/users']);
   })
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }

}
