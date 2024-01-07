import { Chart } from 'chart.js/auto'
import { months, numbers, transparentize, CHART_COLORS } from './utils'
import colorLib from '@kurkle/color'

function createGradient(ctx, stops, coords = [0, 50, 0, 300]) {
  const gradient = ctx.createLinearGradient(...coords)

  gradient.addColorStop(0, stops[0])
  gradient.addColorStop(1, stops[1])

  return gradient
}

export default () => {
  // const x = numbers({ count: 12, min: 0, max: 75 })
  const sparkLines = [
    {
      id: document.querySelector('#spark-line-0'),
      data: [
        24.27640604, 94.39557613, 2.68347051, 50.37465706, 79.44444444, 17.05332647, 86.65809328,
        85.78960905, 30.49725652, 66.46004801, 46.76440329, 76.34859396,
      ],
      labels: months({ count: 12 }),
      borderColor: '#517bf3',
      tension: 0.5,
    },
    {
      id: document.querySelector('#spark-line-1'),
      data: [
        31.19, 31.96, 32.46, 30.14, 27.48, 27.72, 29.04, 28.39, 29.21, 29.62, 30.4, 29.71, 28.13,
        27.37, 27.31, 29.51, 29.7, 31.78, 32.39, 33.42, 32.23, 33.33, 33.2, 33.73, 35.12, 34.74,
        34.81, 35.08, 32.12, 31.87, 30.25, 28.31, 29.31, 29.88, 29.53, 30.53, 30.89, 30.5, 30.47,
        30.79, 30.57, 31.69, 29.59, 28.96, 29.09, 28.86, 28.1, 28.83, 30.35, 29.48, 30.34, 28.16,
        27.07, 27.53, 25.95, 25.01, 23.5, 24.24, 24.11, 24.84, 23.4, 25.29, 26.56, 27.25, 28.01,
        29.6, 29.44, 29.17, 27.29, 27.99, 28.12, 27.7, 28.24, 28.14, 30.59, 33.5, 33.64, 35.51,
        36.11, 37.09, 35.81, 37.73, 40.43, 38.71, 41.93, 39.31, 39, 40.41, 38.93, 37.12, 36.61,
      ],
      labels: months({ count: 91 }),
      borderColor: '#517bf3',
    },
    {
      id: document.querySelector('#spark-line-2'),
      data: [
        30.49, 31.52, 31.61, 32.75, 33.44, 33.61, 34.73, 31.87, 30.4, 31.24, 32.97, 33.36, 34.09,
        35.62, 33.59, 33.42, 34.57, 31.74, 29.8, 30.4, 32.68, 32.22, 30.77, 29.23, 28.83, 30.59,
        32.26, 33.99, 35.55, 34.88, 35, 37.51, 34.8, 33.47, 34.2, 31.53, 33.41, 32.24, 30.83, 31.24,
        30.96, 32.56, 34.54, 34.88, 31.94, 30.9, 30.52, 30.17, 31.63, 31.84, 31.58, 33.57, 33.27,
        34.13, 36.22, 39.42, 41.04, 39.72, 37.52, 38.68, 36.58, 36.54, 37.79, 36.04, 34.92, 36.08,
        37.74, 37.35, 37.99, 36.71, 35.92, 36.55, 35.37, 34.97, 35.1, 34.77, 34.59, 33.27, 32.74,
        33.28, 33.03, 31.56, 29.75, 29.84, 31.48, 32.66, 33.93, 34.29, 33.49, 36.22, 34.55,
      ],
      labels: months({ count: 91 }),
      borderColor: '#F56565',
    },
    {
      id: document.querySelector('#spark-line-3'),
      data: [
        30.9, 29.47, 31.47, 31.14, 31.26, 33.13, 33.53, 34.07, 35.53, 34.86, 33.43, 32.56, 32.59,
        31.69, 31.02, 33.23, 31.69, 33.12, 33.44, 32.56, 32.15, 31.79, 33.55, 36.08, 36.15, 35.7,
        33.88, 36.09, 35.29, 36.56, 37.03, 39.27, 39.33, 40.26, 40.81, 37.96, 35.33, 35.21, 34.23,
        34.25, 34.59, 34.69, 35.74, 34.54, 35.82, 37.41, 40.48, 39.03, 39.01, 39.53, 41.76, 43.54,
        47.1, 46.21, 47.35, 46.36, 46.32, 48.63, 50.49, 49.24, 50.6, 47.98, 46.84, 48.74, 48.29,
        45.41, 43.08, 43.03, 46.69, 48.2, 48.2, 47.31, 49.08, 46.06, 44.87, 43.99, 46.17, 44.08,
        43.77, 41.95, 43.26, 44.01, 43.76, 40.57, 40.96, 39.86, 37.27, 38.14, 38.34, 37.75, 40.26,
      ],
      labels: months({ count: 91 }),
      borderColor: '#1f2937',
      fill: true,
      backgroundColor: (id, c) => {
        return createGradient(
          id.getContext('2d'),
          [colorLib(c).alpha(0.375).rgbString(), colorLib(c).alpha(0).rgbString()],
          [0, 0, 0, 75]
        )
      },
    },
    {
      id: document.querySelector('#spark-line-diff'),
      data: [
        60.00385802, 40.52533436, 8.93261317, 46.70717593, 74.219393, 9.061857, 49.38271605,
        32.2190072, 41.82998971, 18.0304784, 14.52417695, 57.23701132,
      ],
      labels: months({ count: 12 }),
      borderColor: '#F56565',
      fill: true,
      backgroundColor: (id, c) => {
        return createGradient(
          id.getContext('2d'),
          [colorLib(c).alpha(0.25).rgbString(), colorLib(c).alpha(0).rgbString()],
          [0, 0, 0, 320]
        )
      },
      tension: 0.05,
    },
    {
      id: document.querySelector('#spark-line-4'),
      data: [
        30.49, 31.52, 31.61, 32.75, 33.44, 33.61, 34.73, 31.87, 30.4, 31.24, 32.97, 33.36, 34.09,
        35.62, 33.59, 33.42, 34.57, 31.74, 29.8, 30.4, 32.68, 32.22, 30.77, 29.23, 28.83, 30.59,
        32.26, 33.99, 35.55, 34.88, 35, 37.51, 34.8, 33.47, 34.2, 31.53, 33.41, 32.24, 30.83, 31.24,
        30.96, 32.56, 34.54, 34.88, 31.94, 30.9, 30.52, 30.17, 31.63, 31.84, 31.58, 33.57, 33.27,
        34.13, 36.22, 39.42, 41.04, 39.72, 37.52, 38.68, 36.58, 36.54, 37.79, 36.04, 34.92, 36.08,
        37.74, 37.35, 37.99, 36.71, 35.92, 36.55, 35.37, 34.97, 35.1, 34.77, 34.59, 33.27, 32.74,
        33.28, 33.03, 31.56, 29.75, 29.84, 31.48, 32.66, 33.93, 34.29, 33.49, 36.22, 34.55,
      ],
      labels: months({ count: 91 }),
      borderColor: '#517bf3',
      fill: true,
      backgroundColor: (id, c) => {
        return createGradient(
          id.getContext('2d'),
          [colorLib(c).alpha(0.25).rgbString(), colorLib(c).alpha(0).rgbString()],
          [0, 0, 0, 320]
        )
      },
    },
    {
      id: document.querySelector('#spark-line-5'),
      data: [
        30.9, 29.47, 31.47, 31.14, 31.5, 33.13, 33.53, 34.07, 35.53, 34.86, 33.43, 32.56, 32.59,
        31.69, 31.02, 33.23, 31.69, 33.12, 33.44, 32.56, 32.15, 31.79, 33.55, 36.08, 36.15, 35.7,
        33.88, 36.09, 35.29, 36.56, 37.03, 39.27, 39.33, 40.26, 40.81, 37.96, 35.33, 35.21, 34.23,
        34.25, 34.59, 34.69, 35.74, 34.54, 35.82, 37.41, 40.48, 39.03, 39.01, 39.53, 41.76, 43.54,
        47.1, 46.21, 47.35, 46.36, 46.32, 48.63, 50.49, 49.24, 50.6, 47.98, 46.84, 48.74, 48.29,
        45.41, 43.08, 43.03, 46.69, 48.2, 48.2, 47.31, 49.08, 46.06, 44.87, 43.99, 46.17, 44.08,
        43.77, 41.95, 43.26, 44.01, 35.76, 40.57, 40.96, 39.86, 37.27, 38.14, 38.34, 37.75, 40.26,
      ],
      labels: months({ count: 91 }),
      borderColor: '#F56565',
      fill: true,
      backgroundColor: (id, c) => {
        return createGradient(
          id.getContext('2d'),
          [colorLib(c).alpha(0.25).rgbString(), colorLib(c).alpha(0).rgbString()],
          [0, 0, 0, 320]
        )
      },
    },
  ]

  sparkLines.forEach(({ id, data, labels, borderColor, fill, backgroundColor, tension }) => {
    new Chart(id, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data,
            borderColor,
            fill,
            backgroundColor: fill ? backgroundColor(id, borderColor) : null,
            tension,
          },
        ],
      },
      options: {
        // This type of charts holds a lot of data, so for performance reasons, It would be wise if we disable animations
        // https://www.chartjs.org/docs/latest/general/performance.html#disable-animations
        animation: { duration: 0 },
        hover: { animationDuration: 0 },
        responsiveAnimationDuration: 0,
        responsive: false,
        // maintainAspectRatio: false,
        // aspectRatio: 3.5,

        plugins: {
          legend: {
            display: false,
          },
        },

        // Elements
        elements: {
          line: {
            borderWidth: 1.5,
          },
          point: {
            radius: 0,
          },
        },

        // Scales
        scales: {
          // YAxes
          x: {
            display: false,
          },

          // XAxes
          y: {
            display: false,
          },
        },
      },
    })
  })
}
