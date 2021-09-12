import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionBarThemeModeComponent } from './option-bar-theme-mode.component';

describe('OptionBarThemeModeComponent', () => {
  let component: OptionBarThemeModeComponent;
  let fixture: ComponentFixture<OptionBarThemeModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionBarThemeModeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionBarThemeModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
