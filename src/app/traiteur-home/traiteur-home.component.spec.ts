import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraiteurHomeComponent } from './traiteur-home.component';

describe('TraiteurHomeComponent', () => {
  let component: TraiteurHomeComponent;
  let fixture: ComponentFixture<TraiteurHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraiteurHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TraiteurHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
