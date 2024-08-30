import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Fund } from 'src/app/interface/fund';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss']
})
export class FundComponent implements OnInit {

  constructor(private fb: FormBuilder, private apiService: ApiService) { }
  fundForm: FormGroup;
  dropDownValue: Fund[] = [];
  selectedValue: string;
  ngOnInit(): void {
    this.fundForm = this.fb.group({
      dropdown1: ['', Validators.required],
      dropdown2: ['', Validators.required],
      numberInput: [null, [Validators.required, Validators.pattern(/^[0-9]+$/)]]
    });
    this.apiService.getFundValue().subscribe(
      (values) => {
        this.dropDownValue = values;
      },
      (error) => {
        console.error('Error fetching dropdown values:', error);
      }
    );
  }
  onSubmit() {
    console.log(this.fundForm.value);
  }
  onFundSelection(event: any) {
    const selectedValue = event.target.value;
    console.log('Selected Fund Id:', selectedValue);
  }

}
