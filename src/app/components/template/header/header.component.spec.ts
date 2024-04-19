import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        RouterTestingModule,
        NoopAnimationsModule,
        HeaderComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the logo with correct routing', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const logo = compiled.querySelector('a[routerLink="/"] img') as HTMLImageElement;
    expect(logo).toBeTruthy('Logo element should be present');
    if (logo) {
      expect(logo.src).toContain('assets/img/logo-vovo-luisa.png');
    }
  });

  it('should display welcome message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const message = compiled.querySelector('.title-group a');
    expect(message).toBeTruthy('Message element should be present');
    if (message) {
    expect(message.textContent).toContain('Seja bem vindo ao app Delicias da Vovó Luisa');
  }
  });
});
