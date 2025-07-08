import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcsiiPortraitComponent } from './acsii-portrait.component';

describe('AcsiiPortraitComponent', () => {
  let component: AcsiiPortraitComponent;
  let fixture: ComponentFixture<AcsiiPortraitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcsiiPortraitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcsiiPortraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
