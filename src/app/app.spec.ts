import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';

import { App } from './app';

const dummyText = 'Hello world';

@Component({
  standalone: true,
  template: '<p>{{ dummyText }}</p>',
})
class DummyComponent {
  protected dummyText = dummyText;
}

describe('App component', () => {
  let fixture: ComponentFixture<App>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([{ path: 'dummy', component: DummyComponent }]),
      ],
      imports: [App],
    });

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(App);
  });

  it('should be created', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should contain router-outlet', () => {
    const outlet = fixture.nativeElement.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });

  it('should render routed component', async () => {
    await router.navigateByUrl('/dummy');
    fixture.detectChanges();

    const main = fixture.nativeElement.querySelector('main');
    expect(main.textContent).toContain(dummyText);
  });
});
