<template>
  <div class="max-w-6xl mx-auto p-6 bg-gray-800 text-white rounded-2xl shadow-md">
    <h2 class="text-2xl font-semibold mb-6">Historique des revenus</h2>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js'

// Enregistrement des composants Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement)

// Données fictives
const fakeExpenses = [
  { month: '2025-01', total: 120 },
  { month: '2025-02', total: 80 },
  { month: '2025-03', total: 150 },
  { month: '2025-04', total: 200 },
  { month: '2025-05', total: 90 },
  { month: '2025-06', total: 130 },
  { month: '2025-07', total: 170 },
  { month: '2025-08', total: 110 },
  { month: '2025-09', total: 140 },
  { month: '2025-10', total: 160 },
  { month: '2025-11', total: 180 },
  { month: '2025-12', total: 200 }
]

// Données pour Chart.js
const chartData = {
  labels: fakeExpenses.map(e => e.month),
  datasets: [
    {
      label: 'Revenus par mois (€)',
      data: fakeExpenses.map(e => e.total),
      borderColor: '#6366F1', // Indigo Tailwind
      backgroundColor: '#6366F1',
      fill: false,
      tension: 0.4,
      pointBackgroundColor: 'white',
      pointBorderColor: '#6366F1'
    }
  ]
}

// Options du graphique
const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: '#E5E7EB', // gris clair Tailwind
        font: {
          size: 14,
          weight: '500'
        }
      },
      position: 'top'
    },
    title: {
      display: false
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#D1D5DB', // gris plus clair
        font: {
          size: 12
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    },
    y: {
      ticks: {
        color: '#D1D5DB',
        font: {
          size: 12
        }
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.1)'
      }
    }
  }
}
</script>
