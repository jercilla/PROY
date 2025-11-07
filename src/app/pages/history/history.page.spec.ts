import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HistoryPage } from './history.page';

describe('HistoryPage', () => {
  let component: HistoryPage;
  let fixture: ComponentFixture<HistoryPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HistoryPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
