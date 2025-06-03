import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Tile {
  chartType: 'bar' | 'line' | 'pie';
  data: any;
  options: any;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BaseChartDirective, DragDropModule, NgIf, NgFor, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-dashboard';

  tiles: Tile[] = [
    {
      chartType: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: 'Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true },
          title: { display: true, text: 'Sample Bar Chart' }
        }
      }
    }
  ];

  showAddTile = false;
  newChartType: Tile['chartType'] = 'bar';

  addTile() {
    let data, options;
    switch (this.newChartType) {
      case 'line':
        data = {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [{ label: 'Line', data: [10, 20, 15, 30], borderColor: 'blue', fill: false }]
        };
        options = { responsive: true, plugins: { legend: { display: true }, title: { display: true, text: 'Sample Line Chart' } } };
        break;
      case 'pie':
        data = {
          labels: ['A', 'B', 'C'],
          datasets: [{ label: 'Pie', data: [30, 50, 20], backgroundColor: ['red', 'green', 'blue'] }]
        };
        options = { responsive: true, plugins: { legend: { display: true }, title: { display: true, text: 'Sample Pie Chart' } } };
        break;
      default:
        data = {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [
            {
              label: 'Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }
          ]
        };
        options = { responsive: true, plugins: { legend: { display: true }, title: { display: true, text: 'Sample Bar Chart' } } };
    }
    this.tiles.push({ chartType: this.newChartType, data, options });
    this.showAddTile = false;
  }

  drop(event: CdkDragDrop<Tile[]>) {
    moveItemInArray(this.tiles, event.previousIndex, event.currentIndex);
  }
}
