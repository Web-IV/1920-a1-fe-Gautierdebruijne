import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerkoperComponent } from './verkoper.component';

describe('VerkoperComponent', () => {
  let component: VerkoperComponent;
  let fixture: ComponentFixture<VerkoperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerkoperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerkoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
