import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chart } from 'chart.js';
import { ChartService } from '../services/chart.service';
import * as myGlobals from 'src/app/common/globals'
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  labelsList: string[] = myGlobals.allDepartments;
  data: number[] = [];
  chartname = 'Data Charts';
  singleChart: Chart;
  allEmployees: any;
  countDepartments: number[] = [];
  userSub: Subscription;

  constructor(
    private chart: ChartService,
    private firestore: AngularFirestore,
    private elementRef: ElementRef,
    private authService: AuthService) { }

  ngOnInit() {
    // this.firestore
    //   .collection('employees')
    //   .valueChanges()
    //   .subscribe((changes: any) => {
    //     this.resetArrays();
    //     this.allEmployees = changes;
    //     this.getAllDepartments();
    //     this.countDistinctDepartments();
    //     this.chartInit();
    //   });

    this.userSub = this.authService.user.subscribe(user => {
      console.log('observerB: ' + JSON.stringify(user))
    })
  }

  chartInit() {
    const htmlRef = this.elementRef.nativeElement.querySelector('#line-chart');
    this.singleChart = this.chart.single(this.chartname, 'Employees per Department', this.labelsList, this.data, htmlRef, 'bar');
  }

  getAllDepartments() {
    for (const filteredData of this.allEmployees) {
      const value = filteredData.employment.department
      this.countDepartments.push(filteredData.employment.department);
    }
  }

  // without resetting there is an arrow if the user is not on the component/
  // but user will be deleted on firebase
  resetArrays() {
    this.countDepartments = [];
    this.data = [];
    if (this.singleChart) {
      this.singleChart.destroy();
    }
  }

  countDistinctDepartments() {
    let uniqueElements = [...new Set(this.countDepartments)];
    const elementCounts = uniqueElements.map(value => [value, this.countDepartments.filter(str => str === value).length]);

    for (const elementCount of elementCounts) {
      const element = elementCount[1];
      this.data.push(element)
    }
  }
}
