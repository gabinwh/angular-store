import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProudct } from './create-edit-proudct';

describe('CreateEditProudct', () => {
  let component: CreateEditProudct;
  let fixture: ComponentFixture<CreateEditProudct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditProudct]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditProudct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
