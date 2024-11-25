import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokeProgressComponent } from './poke-progress.component';

describe('PokeProgressComponent', () => {
  let component: PokeProgressComponent;
  let fixture: ComponentFixture<PokeProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokeProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokeProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
