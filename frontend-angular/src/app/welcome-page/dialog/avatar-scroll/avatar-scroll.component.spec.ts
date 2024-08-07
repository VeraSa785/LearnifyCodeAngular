import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarScrollComponent } from './avatar-scroll.component';

describe('AvatarScrollComponent', () => {
  let component: AvatarScrollComponent;
  let fixture: ComponentFixture<AvatarScrollComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarScrollComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
