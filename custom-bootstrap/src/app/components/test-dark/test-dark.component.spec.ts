import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDarkComponent } from './test-dark.component';

describe('TestDarkComponent', () => {
  let component: TestDarkComponent;
  let fixture: ComponentFixture<TestDarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestDarkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
