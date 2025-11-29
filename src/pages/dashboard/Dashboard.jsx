import { useEffect, useState } from 'react'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayRecords: 0,
    recentPatients: []
  })
  const [chartData, setChartData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setStats({
        totalPatients: 12,
        todayRecords: 5,
        recentPatients: [
          {
            id: 1,
            name: 'John Doe',
            nik: '3201010101010001',
            latest: { systolic: 120, diastolic: 80, category: 'Normal' }
          },
          {
            id: 2,
            name: 'Jane Smith',
            nik: '3201010101010002',
            latest: {
              systolic: 140,
              diastolic: 90,
              category: 'Hipertensi Stadium 2'
            }
          },
          {
            id: 3,
            name: 'Bob Johnson',
            nik: '3201010101010003',
            latest: {
              systolic: 130,
              diastolic: 85,
              category: 'Hipertensi Stadium 1'
            }
          }
        ]
      })

      setChartData([
        { month: 'Jun', systolic: 125, diastolic: 82 },
        { month: 'Jul', systolic: 128, diastolic: 84 },
        { month: 'Aug', systolic: 122, diastolic: 80 },
        { month: 'Sep', systolic: 130, diastolic: 86 },
        { month: 'Oct', systolic: 126, diastolic: 83 },
        { month: 'Nov', systolic: 124, diastolic: 81 }
      ])

      setLoading(false)
    }, 1000)
  }, [])

  const getCategoryColor = (category) => {
    const colors = {
      Normal: 'bg-green-100 text-green-800',
      'Hipertensi Stadium 1': 'bg-yellow-100 text-yellow-800',
      'Hipertensi Stadium 2': 'bg-red-100 text-red-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <p className="text-gray-600">Selamat datang di Tension Track</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Patients */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Pasien</p>
              <h3 className="text-3xl font-bold">{stats.totalPatients}</h3>
            </div>
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        {/* Today Records */}
        <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-100 text-sm mb-1">Pengukuran Hari Ini</p>
              <h3 className="text-3xl font-bold">{stats.todayRecords}</h3>
            </div>
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">❤️</span>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm mb-1">Tambah Pasien</p>
              <button className="mt-2 text-white hover:text-purple-100 font-semibold">
                Klik di sini →
              </button>
            </div>
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">➕</span>
            </div>
          </div>
        </div>
      </div>

      {/* Blood Pressure Categories */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">ℹ️</span>
          Kategori Tekanan Darah (Standar AHA 2025)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  KATEGORI
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  SISTOLIK
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-700">
                  DIASTOLIK
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100 hover:bg-green-50">
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    ✓ Normal
                  </span>
                </td>
                <td className="text-center py-3 px-4 font-medium">{'< 120'}</td>
                <td className="text-center py-3 px-4 font-medium">{'< 80'}</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-amber-50">
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    ⚠️ Pra-hipertensi
                  </span>
                </td>
                <td className="text-center py-3 px-4 font-medium">120-129</td>
                <td className="text-center py-3 px-4 font-medium">{'< 80'}</td>
              </tr>
              <tr className="border-b border-gray-100 hover:bg-yellow-50">
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    ⚠️ Stadium 1
                  </span>
                </td>
                <td className="text-center py-3 px-4 font-medium">130-139</td>
                <td className="text-center py-3 px-4 font-medium">80-89</td>
              </tr>
              <tr className="hover:bg-red-50">
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    ❌ Stadium 2
                  </span>
                </td>
                <td className="text-center py-3 px-4 font-medium">≥ 140</td>
                <td className="text-center py-3 px-4 font-medium">≥ 90</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart & Recent Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Grafik 6 Bulan Terakhir
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {chartData.map((data, index) => (
              <div
                key={index}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <div className="w-full flex flex-col gap-1">
                  <div
                    className="w-full bg-red-400 rounded-t"
                    style={{ height: `${(data.systolic / 200) * 200}px` }}
                  ></div>
                  <div
                    className="w-full bg-teal-400 rounded-b"
                    style={{ height: `${(data.diastolic / 200) * 200}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-400 rounded"></div>
              <span>Sistolik</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-teal-400 rounded"></div>
              <span>Diastolik</span>
            </div>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Pasien Terbaru
          </h3>
          <div className="space-y-3">
            {stats.recentPatients.map((patient) => (
              <div
                key={patient.id}
                className="p-3 rounded-lg hover:bg-teal-50 transition border border-gray-100 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {patient.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 truncate">
                      {patient.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {patient.nik}
                    </p>
                  </div>
                  {patient.latest && (
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(
                        patient.latest.category
                      )}`}
                    >
                      {patient.latest.systolic}/{patient.latest.diastolic}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="block w-full text-center text-teal-600 font-medium mt-4 hover:text-teal-700">
            Lihat Semua →
          </button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
