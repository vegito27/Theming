import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestLightComponent } from './test-light.component';

describe('TestLightComponent', () => {
  let component: TestLightComponent;
  let fixture: ComponentFixture<TestLightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestLightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestLightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
