import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})

export class PagesComponent {
  pagesData = [
    { page: '340B Monitor', count: 10 },
    { page: 'Qualification Filters', count: 20 },
    { page: 'Dispense Fee Management', count: 15 },
    { page: 'Order Builder', count: 25 },
    { page: 'Dashboard', count: 22 },
    { page: 'Prescriber List', count: 30 },
  ];

  usersData = [
    { day: 'Monday', count: 10 },
    { day: 'Tuesday', count: 20 },
    { day: 'Wednesday', count: 15 },
    { day: 'Thursday', count: 25 },
    { day: 'Friday', count: 22 },
    { day: 'Saturday', count: 30 },
    { day: 'Sunday', count: 30 },
  ];

  errorData = [
    { day: 'Monday', count: 10 },
    { day: 'Tuesday', count: 20 },
    { day: 'Wednesday', count: 15 },
    { day: 'Thursday', count: 25 },
    { day: 'Friday', count: 22 },
    { day: 'Saturday', count: 30 },
    { day: 'Sunday', count: 10 },
  ];

  constructor(private router: Router) {
    
  }

  ngOnInit(): void {
    this.loadPagesChart();
    this.loadUsersChart();
    this.loadErrorChart();
  }

  loadPagesChart() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('pages'),
      {
        type: 'doughnut',
        data: {
          labels: this.pagesData.map(row => row.page),
          datasets: [
            {
              label: 'Page Views',
              data: this.pagesData.map(row => row.count)
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    );
  }

  loadUsersChart() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('users'),
      {
        type: 'line',
        data: {
          labels: this.usersData.map(row => row.day),
          datasets: [
            {
              label: 'User Count',
              data: this.usersData.map(row => row.count)
            }
          ]
        }
      }
    );
  }

  loadErrorChart() {
    new Chart(
      <HTMLCanvasElement>document.getElementById('errors'),
      {
        type: 'bar',
        data: {
          labels: this.errorData.map(row => row.day),
          datasets: [
            {
              label: 'Error Count',
              data: this.errorData.map(row => row.count),
              backgroundColor: '#DC3545',
            }
          ]
        }
      }
    );
  }

  openPages() {
    
  }

  openUsers() {
    
  }

  openErrors() {
    
  }
  
}
