import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapsberryComponent } from './rapsberry.component';

describe('RapsberryComponent', () => {
  let component: RapsberryComponent;
  let fixture: ComponentFixture<RapsberryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapsberryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapsberryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
