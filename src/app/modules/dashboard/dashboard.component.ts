import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  //name : string = 'Hola, Sam';
  name: string | undefined;
  numberOfGoals!: number;
  title!: string;
  titleS!: string;
  titleM!: string;
  titleL!: string;
  holding: string = 'holding amout: $ 0.0'
  percentage!: number;
  percentageS: number = 0;
  percentageM: number = 0;
  percentageL: number = 0;
  goals: any[] = [];
  response: any;
  constructor(private ApiService: ApiService, private router: Router) { }

  ngOnInit(): void {

    this.ApiService.getUsername().subscribe(
      (data: any) => {

        this.name = data.user.username;
       // console.log(this.name);
        this.numberOfGoals = data.numberOfGoals;
      }
    );

    this.ApiService.getUsername().subscribe(
      (data: any) => {
        const goal = data.goals;
        this.goals = goal;
        this.numberOfGoals = data.numberOfGoals;
        const number1: number = this.numberOfGoals;
        let sumOfFinancialValue = 0;
        for (let i = 0; i < number1; i++) {
          sumOfFinancialValue = this.goals[i].financialGoalValue + sumOfFinancialValue;
        }

        let totalAmount = 0;
        for (let i = 0; i < 5; i++) {
          totalAmount = this.goals[i].totalAmount + totalAmount;
        }

        let percent: number = (totalAmount / sumOfFinancialValue) * 100;

        let floatPercnt: number = parseFloat(percent.toFixed(2));
        this.percentage = floatPercnt;
        const holding_amount = "Holding amount: $" + totalAmount;
        this.holding = holding_amount; //holding amount =  total funds - invested amount(means total amount here)
        const title1 = " " + this.percentage;
        this.title = title1;

        const totalamountSTG = data.totalAmountOfShortTermGoals;

        const totalamountMTG = data.totalAmountOfMidTermGoals;

        const totalamountLTG = data.totalAmountOfLongTermGoals;

        const totalFGVofSTG = data.totalFinancialGoalValuesOfShortTermGoals;

        const totalFGVofMTG = data.totalFinancialGoalValuesOfMidTermGoals;

        const totalFGVofLTG = data.totalFinancialGoalValuesOfLongTermGoals;

        let percentS: number = (totalamountSTG / totalFGVofSTG) * 100;
        let floatPercentS: number = parseFloat(percentS.toFixed(0));
        this.percentageS = floatPercentS;
        this.titleS = "" + this.percentageS;

        let percentM: number = (totalamountMTG / totalFGVofMTG) * 100;
        let floatPercentM: number = parseFloat(percentM.toFixed(0));
        this.percentageM = floatPercentM;
        this.titleM = "" + this.percentageM;

          let percentL: number = (totalamountLTG/totalFGVofLTG)*100;
          let floatPercentL: number = parseFloat(percentL.toFixed(0));
          this.percentageL = floatPercentL;
          this.titleL =""+this.percentageL;
          if(Number.isNaN(this.percentageL)){
            this.percentageL = 0;
            this.titleL =""+this.percentageL;
          }
          if(Number.isNaN(this.percentageM)){
            this.percentageM = 0;
            this.titleM =""+this.percentageM;
          }
          if(Number.isNaN(this.percentageS)){
            this.percentageS = 0;
            this.titleS =""+this.percentageS;
          }
         

      }
    );

  }
  //for short mid and long goals
  navigateToGoals(category: string) {
    this.router.navigate(['/goals', category]);
  }

}




