import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTraiteurComponent } from './profile-traiteur.component';

describe('ProfileTraiteurComponent', () => {
  let component: ProfileTraiteurComponent;
  let fixture: ComponentFixture<ProfileTraiteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileTraiteurComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileTraiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
