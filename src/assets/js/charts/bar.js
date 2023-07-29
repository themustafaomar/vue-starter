import { Chart } from 'chart.js/auto'
import { months, numbers, transparentize, CHART_COLORS } from './utils'

const DATA_COUNT = 12

export default () => {
  const labels = months({ count: 12 })

  /* new Chart('bar1', {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Fully Rounded',
        data: numbers({
          count: DATA_COUNT,
          min: 0,
          max: 100
        }),
        // borderColor: CHART_COLORS.red,
        // borderColor: 'transparent',
        // borderWidth: 0,
        backgroundColor: CHART_COLORS.red,
        borderRadius: 100,
        barPercentage: 0.6,
        // borderSkipped: false,
      }, {
        label: 'Fully other',
        data: numbers({
          count: DATA_COUNT,
          min: 0,
          max: 100
        }),
        // borderColor: CHART_COLORS.red,
        // borderColor: 'transparent',
        // borderWidth: 0,
        backgroundColor: CHART_COLORS.blue,
        borderRadius: 100,
        barPercentage: 0.6,
        // borderSkipped: false,
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
          text: 'Chart.js Bar Chart'
        }
      }
    },
  }) */

  const bars = [
    {
      id: 'bar-small-1',
      data: [
        4.32441701, 36.5835048, 90.96193416, 39.06464335, 15.45953361, 95.45524691, 39.54561043,
        4.5207476, 21.24485597, 39.10065158, 37.10048011, 1.66409465,
      ],
      labels: months({ count: 12 }),
    },
    {
      id: 'bar-small-2',
      data: numbers({ count: 6, min: 0, max: 100 }),
      labels: months({ count: 6 }),
    },
    {
      id: 'bar-small-3',
      data: numbers({ count: 8, min: 0, max: 100 }),
      labels: months({ count: 8 }),
    },
  ]

  bars.forEach(({ id, data, labels }) => {
    console.log(id, data, labels)
    new Chart(id, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'My First Dataset',
            data,
            backgroundColor: ['rgba(0, 148, 255, 0.15)', 'rgba(0, 148, 255, 1)'],
            barPercentage: 0.7,
            // barThickness: 3, // Width
            maxBarThickness: 10,
            // minBarLength: 2,
            // borderColor: [
            //   'rgb(255, 99, 132)',
            //   'rgb(255, 159, 64)',
            //   'rgb(255, 205, 86)',
            //   'rgb(75, 192, 192)',
            //   'rgb(54, 162, 235)',
            //   'rgb(153, 102, 255)',
            //   'rgb(201, 203, 207)'
            // ],
            // borderWidth: 1
          },
        ],
      },
      options: {
        responsive: true,
        aspectRatio: 3.5,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
            // grid: {
            //   display: false,
            // }
          },
          y: {
            display: false,
            beginAtZero: true,
            // grid: {
            //   display: false
            // }
          },
        },
      },
    })
  })
}
