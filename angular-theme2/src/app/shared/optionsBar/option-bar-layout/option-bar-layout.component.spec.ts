import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionBarLayoutComponent } from './option-bar-layout.component';

describe('OptionBarLayoutComponent', () => {
  let component: OptionBarLayoutComponent;
  let fixture: ComponentFixture<OptionBarLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionBarLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionBarLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
