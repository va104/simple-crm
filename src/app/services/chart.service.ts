import { Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor() { }

  single(graphTitle: string, key: string, labels: any, data: any, context: string, charttype: any) {
    let chart = new Chart(context, {
      type: charttype,
      data: {
        labels: labels,
        datasets: [{
          label: key,
          data: data,
          borderWidth: 1
        }]
      },
      options: {
      }
    })
    return chart
  }
}
