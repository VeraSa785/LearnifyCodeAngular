import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DialogComponent } from './dialog.component';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let matDialogRefSpy: jasmine.SpyObj<MatDialogRef<DialogComponent>>;

  beforeEach(async () => {
    matDialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        DialogComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: matDialogRefSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create dialog component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls', () => {
    expect(component.form.contains('username')).toBeTrue();
    expect(component.form.contains('email')).toBeTrue();
    expect(component.form.contains('password')).toBeTrue();
    expect(component.form.contains('repeatPassword')).toBeTrue();
    expect(component.form.contains('avatar')).toBeTrue();
  });

  it('should display avatars and handle selection', () => {
    const avatars = fixture.debugElement.queryAll(By.css('.avatar-selection'));
    expect(avatars.length).toBe(component.avatars.length);

    avatars[0].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.selectedAvatar).toBe(0);
    expect(avatars[0].nativeElement.classList).toContain('selected');
  });



});
