import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chart } from 'chart.js';
import { ChartService } from '../common/chart.service';
import * as myGlobals from 'src/app/common/globals'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  labelsList: string[] = myGlobals.allDepartments
  data: number[] = []
  chartname = 'Data Charts'
  singleChart: Chart
  allEmployees: any
  countDepartments: number[] = []

  constructor(
    private chart: ChartService,
    private firestore: AngularFirestore,
    private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.firestore
      .collection('employees')
      .valueChanges()
      .subscribe((changes: any) => {
        this.resetArrays();
        this.allEmployees = changes;
        this.getAllDepartments();
        this.countDistinctDepartments();
        this.chartInit();
      });
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
