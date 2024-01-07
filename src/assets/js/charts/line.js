import { Chart } from 'chart.js/auto'
import { months, numbers, transparentize, CHART_COLORS } from './utils'

export default () => {
  const lines = [
    {
      id: document.querySelector('#line-1'),
      data: [
        24.27640604, 94.39557613, 2.68347051, 50.37465706, 79.44444444, 17.05332647, 86.65809328,
        85.78960905, 30.49725652, 66.46004801, 46.76440329, 76.34859396,
      ],
      labels: months({ count: 12 }),
      borderColor: '#517bf3',
      tension: 0.5,
    },
  ]

  lines.forEach(({ id, data, labels, borderColor, fill, backgroundColor, tension }) => {
    new Chart(id, {
      type: 'line',
      data: {
        labels: ['Desktop', 'Tablets', 'Mobile'],
        datasets: [
          {
            label: 'My First Dataset',
            data: [60, 25, 15],
            backgroundColor: ['#3498db', '#7ed6df', '#e056fd'],
            // spacing
            borderRadius: 8,
            // hoverOffset: 50,
            // borderWidth: 10,
            // hoverBorderColor: ['#3498db','#7ed6df','#e056fd'],
          },
        ],
      },
      options: {
        responsive: true,
        cutout: 135,

        // Plugins
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#2d3748',
              padding: 20,
              font: {
                // size: 14,
                // family: 'Inter',
              },
              boxHeight: 10,
              // boxWidth: 10,
              usePointStyle: true,
            },
          },
        },
      },
    })
  })
}
