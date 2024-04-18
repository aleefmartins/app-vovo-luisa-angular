import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav.component';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSidenavModule,
        MatListModule,
        NoopAnimationsModule,
        NavComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have links in the list', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('mat-nav-list a[mat-list-item]');
    expect(listItems.length).toBeGreaterThan(0, 'Expected to find at least one mat-list-item link in the nav list');
    expect(listItems[0].getAttribute('routerLink')).toEqual('');
    expect(listItems[1].getAttribute('routerLink')).toEqual('/userAccount');
    expect(listItems[2].getAttribute('routerLink')).toEqual('/users');
  });
});
