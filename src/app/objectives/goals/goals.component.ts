import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalModel } from 'src/app/interface/goal-model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  currentHeading: number = 1;
  heading: string = 'Short Term';
  private colors = ['#A291EE', '#f4f7e6', '#91EED2'];
  private currentIndex = 0;
  currentColor = this.colors[this.currentIndex];
  rotationAngle: number = 0;

  get rotateStyle(): string {
    return `rotate(${this.rotationAngle}deg)`;
  }

  rotateImage(): void {
    this.rotationAngle += 90;
  }


  goals: GoalModel[] = [];
  getImagePath(goalName: string): string {
    const imageMapping: { [key: string]: string } = {
      'marriage': 'marriage.png',
      'honeymoon': 'honeymoon.png',
      'kids': 'kids.png',
      'vaccation': 'vaccation.png',
      'car': 'car.png',
      'super cars': 'car.png',
      'children education': 'ceducation.png',
      'villa': 'villa.png',
      'buy land': 'buyland.png',
      'apartment': 'apartment.png',
      'marriage anniversary': 'marriage.png',
      'tomorrowland': 'buyland.png',
      'parent marriage anniversary': 'marrige.png',
      'super bikes': 'bike.png',
      'enterpreneurship': 'enterprenuer.jpg',
      'superbike': 'bike.png',
      'higher education': 'higher.png',
      'family foreign tour': 'tour.png'



    };
    const imageFilename = imageMapping[goalName.toLowerCase()];
    return `./assets/images/${imageFilename}`;

  }

  goForward() {
    if (this.currentHeading < 3) {
      this.currentHeading++;
    this.route.params.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.updateUrl(category);
        this.loadGoals(category);
        this.updateColorBasedOnCategory(category);
      }
    });
    }
  }

  goBackward() {
    if (this.currentHeading > 1) {
      this.currentHeading--;
      this.route.params.subscribe(params => {
        const category = params['category'];
        if (category) {
          this.updateUrl(category);
          this.loadGoals(category);
          this.updateColorBasedOnCategory(category);
        }
      });
    }
  }
  
  private updateUrl(category: string): void{
    const nextCategory = this.getCategoryByHeading(this.currentHeading);
    this.router.navigate(['goals', nextCategory]);
  }
  
  private getCategoryByHeading(headingNumber: number): string {
    switch (headingNumber) {
      case 1:
        return 'short-term';
      case 2:
        return 'mid-term';
      case 3:
        return 'long-term';
      default:
        return ''; 
    }
  }
 
  onForwardClick() {
    if (this.currentIndex < this.colors.length - 1) {
      this.currentIndex++;
      this.currentColor = this.colors[this.currentIndex];
    }
    return this.currentIndex === this.colors.length - 1;
  }

  onBackwardClick() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentColor = this.colors[this.currentIndex];
    }
    return this.currentIndex === 0;
  }
  forwardButton() {
    this.goForward();
    this.onForwardClick();

  }
  backwardButton() {
    this.goBackward();
    this.onBackwardClick();
  }
  
  //adding changes 
  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
   // this.loadGoals();
   this.route.params.subscribe(params => {
    const category = params['category'];
    if (category) {
      this.loadGoals(category);
      this.updateColorBasedOnCategory(category);
    }
  });
  }
  loadGoals(category: string): void{
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.apiService.setUserId(userId);
      this.heading = this.getHeadingByCategory(category);

      switch (category.toLowerCase()) {
        case 'short-term':
          this.currentHeading = 1;
          this.loadShortTermGoals();
          break;
        case 'mid-term':
          this.currentHeading = 2;
          this.loadMidTermGoals();
          break;
        case 'long-term':
          this.currentHeading = 3;
          this.loadLongTermGoals();
          break;
        default:
          
          break;
      }
    }else {
      console.log('User ID not found in localStorage');
    }
  }
  private loadShortTermGoals(): void {
    this.apiService.goalDurationS().subscribe(
      data => {
        this.goals = data;
      },
      error => {
        console.log('Error fetching short-term goals:', error);
      }
    );
  }
  private loadMidTermGoals(): void {
    this.apiService.goalDurationM().subscribe(
      data => {
        this.goals = data;
      },
      error => {
        console.log('Error fetching mid-term goals:', error);
      }
    );
  }
  private loadLongTermGoals(): void {
    this.apiService.goalDurationL().subscribe(
      data => {
        this.goals = data;
      },
      error => {
        console.log('Error fetching long-term goals:', error);
      }
    );
  }
  private getHeadingByCategory(category: string): string {
    switch (category.toLowerCase()) {
      case 'short-term':
        return 'Short Term';
      case 'mid-term':
        return 'Mid Term';
      case 'long-term':
        return 'Long Term';
      default:
        return 'Goals'; 
    }
  }
  private updateColorBasedOnCategory(category: string): void {
    // Update color based on category
    switch (category.toLowerCase()) {
      case 'short-term':
        this.currentIndex = 0;
        break;
      case 'mid-term':
        this.currentIndex = 1;
        break;
      case 'long-term':
        this.currentIndex = 2;
        break;
      default:
        this.currentIndex = 0;
        break;
    }
    this.currentColor = this.colors[this.currentIndex];
  }

  
  /*
  loadGoals() {
    const userId = localStorage.getItem('userId');

    if (userId) {
      this.apiService.setUserId(userId);
      if (this.currentHeading === 1) {
        this.apiService.goalDurationS().subscribe(
          data => {
            this.goals = data
            imageUrl: './assets/images/'

          },
          error => {
            console.log('Error fetching:', error);
          }
        );
      }
      else if (this.currentHeading === 2) {
        this.apiService.goalDurationM().subscribe(
          data => {
            this.goals = data
          },
          error => {
            console.log('Error fetching:', error);
          }
        );
      }
      else if (this.currentHeading === 3) {
        this.apiService.goalDurationL().subscribe(
          data => {
            this.goals = data
          },
          error => {
            console.log('Error fetching:', error);
          }
        );
      }
    } else {
      console.log('User ID not found in localStorage');
    }
  }
  */
}
