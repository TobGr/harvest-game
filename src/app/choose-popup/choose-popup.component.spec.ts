import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoosePopupComponent } from './choose-popup.component';

describe('ChoosePopupComponent', () => {
  let component: ChoosePopupComponent;
  let fixture: ComponentFixture<ChoosePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoosePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoosePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
