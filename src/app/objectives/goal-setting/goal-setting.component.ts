
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validator } from '@angular/forms';
import { GoalModel } from 'src/app/interface/goal-model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-goal-setting',
  templateUrl: './goal-setting.component.html',
  styleUrls: ['./goal-setting.component.scss']
})
export class GoalSettingComponent implements OnInit {

  goalModel: GoalModel[] = []
  trueGoals: any[] = [];
  maxButtons = 5;

  

  selectedgoals:any
  constructor(private apiService: ApiService, private router:Router) { }
    
  


  ngOnInit(): void {
    this.getAllGoals();
    console.log(this.goalModel)
  }

  getAllGoals() {
    console.log('insse')
    this.apiService.getAllUsers().subscribe(
      (data) => 
      { this.goalModel = data; console.log('data '+data)},
      (error)=>{
        console.log(error)
      }
    );

    console.log(this.goalModel);

  }
  addGoalsWithUserId() {
    const userId = localStorage.getItem('userId');
    this.trueGoals = this.goalModel.filter((goal) => goal.isSelected);
    const userAndGoals = {
      user: {
        userId: userId,
      },
      goals: this.trueGoals,
    };

    console.log("Goals",this.trueGoals);

    this.apiService.addGoalsByUser(userAndGoals).subscribe(
      (response) => {
        console.log(response)
        this.selectedgoals=response
        console.log("SelectedGoals",this.selectedgoals)
        // localStorage.setItem('selectedgoals', this.selectedgoals)



        console.log('Goals added successfully');
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        console.error('Error adding goals', error);
      }
    );
    localStorage.setItem('selectedgoals', JSON.stringify(userAndGoals))
    localStorage.setItem('goalsSelect',JSON.stringify(this.trueGoals));
    console.log(userAndGoals);

  }
  onCheckboxChange(goalModel: GoalModel[]) {
    for (const goal of goalModel) {
      goal.isSelected = !goal.isSelected;
      this.trueGoals.push(goal);
    }
  }
  countSelectedGoals(): number {
    console.log(this.goalModel)
    for(let i=0;i<this.goalModel.length;i++)
    {
      console.log(this.goalModel[i].goalName)
    }

    return this.goalModel.filter((goal) => goal.isSelected).length;
    console.log(this.goalModel)
  }

}
