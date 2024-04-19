import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router'

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  constructor(private router: Router) { }

  navigateToProductCreate(): void {
    this.router.navigate(['/userAccount/createuser'])
  }

}
