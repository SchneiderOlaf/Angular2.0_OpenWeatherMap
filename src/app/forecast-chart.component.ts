import { Component, Input, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-forecast-chart',
  standalone: true,
  template: `
    <div class="chart-container">
      <canvas id="forecastChart"></canvas>
    </div>
  `,
  styles: [`
    .chart-container { transition: opacity 300ms ease-in-out; opacity: 1; }
    .chart-container.fade { opacity: 0.25; }
    canvas { max-width: 100%; }
  `]
})
export class ForecastChartComponent implements AfterViewInit, OnChanges {
  @Input() data: any[] = [];
  @Input() unit: 'metric' | 'imperial' = 'metric';
  chart: any;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    if (this.data && this.data.length) {
      this.buildChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.chart && (changes['data'] || changes['unit'])) {
      // Update existing chart with animation for smooth transitions
      const labels = this.data.map(d => d.date);
      const minTemps = this.data.map(d => this.unit === 'imperial' ? (d.min * 9/5 + 32) : d.min);
      const maxTemps = this.data.map(d => this.unit === 'imperial' ? (d.max * 9/5 + 32) : d.max);
      const pops = this.data.map(d => d.pop);
      // UI hint: fade container slightly while UX animates
      const container: HTMLElement = this.el.nativeElement.querySelector('.chart-container');
      if (container) container.classList.add('fade');

      // update chart data
      this.chart.data.labels = labels;
      if (this.chart.data.datasets && this.chart.data.datasets.length >= 3) {
        this.chart.data.datasets[0].data = minTemps;
        this.chart.data.datasets[0].label = `Min Temp (${this.unit === 'metric' ? '°C' : '°F'})`;
        this.chart.data.datasets[1].data = maxTemps;
        this.chart.data.datasets[1].label = `Max Temp (${this.unit === 'metric' ? '°C' : '°F'})`;
        this.chart.data.datasets[2].data = pops;
      }
      // update axis label to new unit
      if (this.chart.options && (this.chart.options as any).scales && (this.chart.options as any).scales.y) {
        (this.chart.options as any).scales.y.title.text = `Temperature (${this.unit === 'metric' ? '°C' : '°F'})`;
      }

      // ensure Chart.js animates changes
      if (this.chart.options) (this.chart.options as any).animation = { duration: 700, easing: 'easeOutQuart' };
      this.chart.update();
      // remove fade after a small delay to let animation play
      setTimeout(() => { if (container) container.classList.remove('fade'); }, 600);
    }
  }

  buildChart() {
    const ctx = this.el.nativeElement.querySelector('#forecastChart');
    const labels = this.data.map(d => d.date);
    const minTemps = this.data.map(d => this.unit === 'imperial' ? (d.min * 9/5 + 32) : d.min);
    const maxTemps = this.data.map(d => this.unit === 'imperial' ? (d.max * 9/5 + 32) : d.max);
    const pops = this.data.map(d => d.pop);
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            type: 'line',
            label: `Min Temp (${this.unit === 'metric' ? '°C' : '°F'})`,
            data: minTemps,
            borderColor: '#1976d2',
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            yAxisID: 'y',
            fill: false
          },
          {
            type: 'line',
            label: `Max Temp (${this.unit === 'metric' ? '°C' : '°F'})`,
            data: maxTemps,
            borderColor: '#ff9800',
            backgroundColor: 'rgba(255, 152, 0, 0.1)',
            yAxisID: 'y',
            fill: false
          },
          {
            type: 'bar',
            label: 'Precipitation Probability (%)',
            data: pops,
            backgroundColor: 'rgba(76, 175, 80, 0.5)',
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            title: { display: true, text: `Temperature (${this.unit === 'metric' ? '°C' : '°F'})` }
          },
          y1: {
            type: 'linear',
            position: 'right',
            title: { display: true, text: 'Precipitation (%)' },
            grid: { drawOnChartArea: false },
            min: 0,
            max: 100
          }
        }
      }
    });
  }
}
