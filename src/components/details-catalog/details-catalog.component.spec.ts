import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCatalogComponent } from './details-catalog.component';

describe('DetailsCatalogComponent', () => {
  let component: DetailsCatalogComponent;
  let fixture: ComponentFixture<DetailsCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsCatalogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
