import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoalModel } from 'src/app/interface/goal-model';
import { User } from 'src/app/interface/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-goal-onboarding',
  templateUrl: './goal-onboarding.component.html',
  styleUrls: ['./goal-onboarding.component.scss']
})
export class GoalOnboardingComponent implements OnInit {

  constructor(private route: Router, private apiservice: ApiService) { }

  trueGoals: any[] = [];
  goal: any
  userid: User
  goalid: GoalModel
  duration: number = new Date().getFullYear();
  financialGoalValue: Number
  selectgoal: any
  currentgoalindex = 0;
  currentgoal: any

  originaldate: Date
  // getImageSource(): string {
  //   const imageSources: string[] = [
  //     'assets/images/marriage.png',
  //     'assets/images/ceducation.png',
  //     'assets/images/car.png',
  //     'assets/images/villa.png',
  //     'assets/images/apartment.png',
  //     'assets/images/buyland.png',
  //     'assets/images/anniversary.png',
  //     'assets/images/marrige.png',
  //     'assets/images/bike.png',
  //     'assets/images/enterprenuer.jpg',
  //     'assets/images/family.png',
  //     'assets/images/car.png',
  //     'assets/images/bike.png',
  //     'assets/images/buyland.png',
  //     'assets/images/ceducation.png',
  //     'assets/images/tour.png',


  //     // ... add more image paths as needed
  //   ];

  //   // Ensure currentgoalindex is within the valid range
  //   const index = Math.min(this.currentgoalindex, imageSources.length - 1);

  //   return imageSources[index];
  // }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = (date.getDate() + 1).toString().padStart(2, '0');
    return `${year}`;
  }
  formatteddate: string
  newone: any

  ngOnInit(): void {

    const selectedgoal = localStorage.getItem('goalsSelect');

    this.selectgoal = JSON.parse(selectedgoal)
    console.log('Hello', (this.selectgoal));

    this.currentgoalindex = 0;
    this.currentgoal = this.selectgoal[this.currentgoalindex]

  }
  routerto() {
    this.route.navigate(['login'])
  }

  save() {

    const currentGoalId = this.currentgoal.goalId;
    const userId = localStorage.getItem('userId');
    const formattedDate = this.formatDate(new Date(this.duration));
    this.trueGoals.push(this.currentgoal);
    this.apiservice.retrievegoals(userId, currentGoalId, formattedDate, this.financialGoalValue, {
      user: { userId: userId },
      goals: this.trueGoals
    }).subscribe((data) => {
      console.log(data);
      console.log(JSON.stringify(data.numberOfGoals));
      this.newone = JSON.stringify(data.numberOfGoals);
      console.log(this.newone);
    });
    this.currentgoalindex++;
    if (this.currentgoalindex >= this.selectgoal.length) {
      this.routerto();
    } else {

      this.currentgoal = this.selectgoal[this.currentgoalindex];
    }
  }

}
