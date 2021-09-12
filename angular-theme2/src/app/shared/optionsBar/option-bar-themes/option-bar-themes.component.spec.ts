import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionBarThemesComponent } from './option-bar-themes.component';

describe('OptionBarThemesComponent', () => {
  let component: OptionBarThemesComponent;
  let fixture: ComponentFixture<OptionBarThemesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionBarThemesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionBarThemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
