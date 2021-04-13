import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegeditComponent } from './regedit.component';

describe('RegeditComponent', () => {
  let component: RegeditComponent;
  let fixture: ComponentFixture<RegeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegeditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
