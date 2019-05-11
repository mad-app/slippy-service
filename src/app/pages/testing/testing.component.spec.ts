import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicTestComponent } from './basic-test.component';

describe('BasicTestComponent', () => {
  let component: BasicTestComponent;
  let fixture: ComponentFixture<BasicTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
