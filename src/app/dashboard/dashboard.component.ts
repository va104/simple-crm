import { Component, ElementRef, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Chart } from 'chart.js';
import { ChartService } from '../common/chart.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  labelsList: string[] = []
  data: number[] = []
  chartname = 'Data Charts'
  singleChart: Chart
  allEmployees: any
  allDistinctDepartments: string[] = [];
  countDepartments: number[] = []

  constructor(
    private chart: ChartService,
    private firestore: AngularFirestore,
    private elementRef: ElementRef) { }

  async ngOnInit() {
    await this.getData();
    this.chartInit();

  }

  async getData() {
    this.firestore
    .collection('employees')
    .valueChanges()
    .subscribe((changes: any) => {
      this.resetArrays();
      this.allEmployees = changes;
      this.setDropdownMenuProperties();
      this.labelsList = this.allDistinctDepartments;
      this.countDep();
      console.log('Data')
    });
  }

  chartInit() {
    console.log('Chart')
    const htmlRef = this.elementRef.nativeElement.querySelector('#line-chart');
    this.singleChart = this.chart.single(this.chartname, 'Employees per Department', this.labelsList, this.data, htmlRef, 'bar');

  }

  setDropdownMenuProperties() {
    for (const filteredData of this.allEmployees) {
      const value = filteredData.employment.department
      if (!this.allDistinctDepartments.includes(value)) {
        this.allDistinctDepartments.push(filteredData.employment.department);
      }
      this.countDepartments.push(filteredData.employment.department);
    }
  }

  // without resetting there is an arrow if the user is not on the component/
  // but user will be deleted on firebase
  resetArrays() {
    this.allDistinctDepartments = [];
    this.countDepartments = [];
    this.data = [];
    if (this.singleChart) {
      this.singleChart.destroy();
    }
  }

  countDep() {
    let uniqueElements = [...new Set(this.countDepartments)];
    const elementCounts = uniqueElements.map(value => [value, this.countDepartments.filter(str => str === value).length]);

    for (const elementCount of elementCounts) {
      const element = elementCount[1];
      this.data.push(element)
    }
  }
}
