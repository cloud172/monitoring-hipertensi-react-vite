import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const BloodPressureChart = ({ records, period = '7days' }) => {
  // Sort records by date
  const sortedRecords = [...records].sort((a, b) => {
    const dateA = new Date(`${a.measurement_date} ${a.measurement_time}`)
    const dateB = new Date(`${b.measurement_date} ${b.measurement_time}`)
    return dateA - dateB
  })

  // Filter based on period
  const now = new Date()
  const filteredRecords = sortedRecords.filter((record) => {
    const recordDate = new Date(record.measurement_date)
    const daysDiff = Math.floor((now - recordDate) / (1000 * 60 * 60 * 24))

    switch (period) {
      case '7days':
        return daysDiff <= 7
      case '30days':
        return daysDiff <= 30
      case '90days':
        return daysDiff <= 90
      case 'all':
      default:
        return true
    }
  })

  // Prepare chart data
  const labels = filteredRecords.map((record) =>
    format(new Date(record.measurement_date), 'dd MMM', { locale: id })
  )

  const systolicData = filteredRecords.map((record) => record.systolic)
  const diastolicData = filteredRecords.map((record) => record.diastolic)

  const data = {
    labels,
    datasets: [
      {
        label: 'Systolic',
        data: systolicData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        tension: 0.3,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgb(239, 68, 68)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Diastolic',
        data: diastolicData,
        borderColor: 'rgb(20, 184, 166)',
        backgroundColor: 'rgba(20, 184, 166, 0.1)',
        tension: 0.3,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgb(20, 184, 166)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            weight: 'bold'
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.parsed.y} mmHg`
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        min: 60,
        max: 180,
        ticks: {
          stepSize: 20,
          font: {
            size: 11
          },
          callback: function (value) {
            return value + ' mmHg'
          }
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        ticks: {
          font: {
            size: 11
          },
          maxRotation: 45,
          minRotation: 0
        },
        grid: {
          display: false
        }
      }
    },
    interaction: {
      mode: 'index',
      intersect: false
    }
  }

  // Calculate statistics
  const avgSystolic =
    systolicData.length > 0
      ? (systolicData.reduce((a, b) => a + b, 0) / systolicData.length).toFixed(
          0
        )
      : 0
  const avgDiastolic =
    diastolicData.length > 0
      ? (
          diastolicData.reduce((a, b) => a + b, 0) / diastolicData.length
        ).toFixed(0)
      : 0
  const maxSystolic = Math.max(...systolicData, 0)
  const minSystolic = systolicData.length > 0 ? Math.min(...systolicData) : 0
  const maxDiastolic = Math.max(...diastolicData, 0)
  const minDiastolic = diastolicData.length > 0 ? Math.min(...diastolicData) : 0

  if (filteredRecords.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="text-gray-300 text-6xl mb-4">📊</div>
        <p className="text-gray-500 text-lg mb-2">
          Tidak ada data untuk ditampilkan
        </p>
        <p className="text-gray-400 text-sm">
          Mulai dengan menambahkan data tekanan darah
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Grafik Tekanan Darah
        </h3>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-red-50 rounded-lg p-3 border border-red-200">
            <p className="text-red-600 text-xs font-medium mb-1">
              Rata-rata Systolic
            </p>
            <p className="text-2xl font-bold text-gray-800">{avgSystolic}</p>
            <p className="text-xs text-gray-500">mmHg</p>
          </div>

          <div className="bg-teal-50 rounded-lg p-3 border border-teal-200">
            <p className="text-teal-600 text-xs font-medium mb-1">
              Rata-rata Diastolic
            </p>
            <p className="text-2xl font-bold text-gray-800">{avgDiastolic}</p>
            <p className="text-xs text-gray-500">mmHg</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
            <p className="text-blue-600 text-xs font-medium mb-1">Tertinggi</p>
            <p className="text-xl font-bold text-gray-800">
              {maxSystolic}/{maxDiastolic}
            </p>
            <p className="text-xs text-gray-500">mmHg</p>
          </div>

          <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
            <p className="text-purple-600 text-xs font-medium mb-1">Terendah</p>
            <p className="text-xl font-bold text-gray-800">
              {minSystolic}/{minDiastolic}
            </p>
            <p className="text-xs text-gray-500">mmHg</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80">
        <Line data={data} options={options} />
      </div>

      {/* Legend Info */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-700">
              <strong>Systolic</strong> - Tekanan saat jantung memompa
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-teal-500"></div>
            <span className="text-gray-700">
              <strong>Diastolic</strong> - Tekanan saat jantung beristirahat
            </span>
          </div>
        </div>
      </div>

      {/* Data Summary */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 text-center">
          Menampilkan <strong>{filteredRecords.length}</strong> data pengukuran
          {period === '7days' && ' (7 hari terakhir)'}
          {period === '30days' && ' (30 hari terakhir)'}
          {period === '90days' && ' (90 hari terakhir)'}
        </p>
      </div>
    </div>
  )
}

export default BloodPressureChart
