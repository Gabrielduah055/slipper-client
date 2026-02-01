import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareGuideComponent } from './care-guide.component';

describe('CareGuideComponent', () => {
  let component: CareGuideComponent;
  let fixture: ComponentFixture<CareGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CareGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CareGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
