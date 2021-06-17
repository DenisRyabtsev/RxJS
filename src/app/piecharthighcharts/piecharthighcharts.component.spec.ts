import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiecharthighchartsComponent } from './piecharthighcharts.component';

describe('PiecharthighchartsComponent', () => {
  let component: PiecharthighchartsComponent;
  let fixture: ComponentFixture<PiecharthighchartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PiecharthighchartsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiecharthighchartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
