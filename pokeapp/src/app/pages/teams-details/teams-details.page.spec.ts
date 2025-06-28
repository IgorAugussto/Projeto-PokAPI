import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamsDetailsPage } from './teams-details.page';

describe('TeamsDetailsPage', () => {
  let component: TeamsDetailsPage;
  let fixture: ComponentFixture<TeamsDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
