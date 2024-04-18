import { Component } from '@angular/core';
import { MatSidenavModule} from '@angular/material/sidenav';
import { RouterOutlet, RouterModule } from '@angular/router';
import { MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterOutlet, RouterModule, MatSidenavModule, MatListModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
