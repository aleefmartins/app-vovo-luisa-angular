import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialogActions } from '@angular/material/dialog';
import { UserAccountService } from '../../../service/user-account.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-delete',
  standalone: true,
  templateUrl: './user-delete.component.html',
  imports: [MatDialogModule, MatButtonModule, MatSnackBarModule, MatDialogActions, CommonModule]
})
export class UserDeleteComponent {

  constructor(
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userAccountService: UserAccountService,
    private router: Router,
  ) {}

  deleteUser(): void {
    this.userAccountService.deleteUser(this.data.userId).subscribe({
      next: () => {
        this.userAccountService.showMessage('Registro excluido com sucesso.');
        this.router.navigate(['/users']);
      },
      error: () => {
        this.userAccountService.showMessage('Erro ao excluir o registro.');
      }
    });
  }
}
