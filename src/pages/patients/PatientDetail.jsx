import { useEffect, useState } from 'react'

const PatientDetail = ({ patientId }) => {
  const [patient, setPatient] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching patient data
    setTimeout(() => {
      setPatient({
        id: patientId,
        name: 'John Doe',
        nik: '3201010101010001',
        dateOfBirth: '1978-05-15',
        age: 47,
        height: 170,
        weight: 75,
        bmi: 25.95,
        medicalHistory: 'Hipertensi sejak 2020, Diabetes Tipe 2',
        bloodPressureRecords: [
          {
            id: 1,
            systolic: 120,
            diastolic: 80,
            category: 'Normal',
            symptoms: null,
            measurementDate: '2025-11-28',
            measurementTime: '08:30'
          },
          {
            id: 2,
            systolic: 135,
            diastolic: 88,
            category: 'Hipertensi Stadium 1',
            symptoms: 'Pusing ringan',
            measurementDate: '2025-11-27',
            measurementTime: '14:00'
          },
          {
            id: 3,
            systolic: 145,
            diastolic: 92,
            category: 'Hipertensi Stadium 2',
            symptoms: 'Sakit kepala',
            measurementDate: '2025-11-26',
            measurementTime: '09:15'
          }
        ]
      })
      setLoading(false)
    }, 800)
  }, [patientId])

  const getCategoryColor = (category) => {
    const colors = {
      Normal: 'bg-green-100 text-green-800 border-green-500',
      'Hipertensi Stadium 1': 'bg-yellow-100 text-yellow-800 border-yellow-500',
      'Hipertensi Stadium 2': 'bg-red-100 text-red-800 border-red-500'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-500'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      {/* Patient Info Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Back
          </button>
          <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {patient.name[0]}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
            <p className="text-gray-600">NIK: {patient.nik}</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition">
              ✏️ Edit
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition shadow-lg">
              ➕ Input TD
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-600 text-xs font-medium mb-1">USIA</p>
            <p className="text-2xl font-bold text-gray-800">{patient.age}</p>
            <p className="text-xs text-gray-600">tahun</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-purple-600 text-xs font-medium mb-1">TB</p>
            <p className="text-2xl font-bold text-gray-800">{patient.height}</p>
            <p className="text-xs text-gray-600">cm</p>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg">
            <p className="text-pink-600 text-xs font-medium mb-1">BB</p>
            <p className="text-2xl font-bold text-gray-800">{patient.weight}</p>
            <p className="text-xs text-gray-600">kg</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-600 text-xs font-medium mb-1">BMI</p>
            <p className="text-2xl font-bold text-gray-800">{patient.bmi}</p>
            <p className="text-xs text-gray-600">kg/m²</p>
          </div>
        </div>

        {patient.medicalHistory && (
          <div className="mt-4 p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
            <p className="text-amber-800 text-sm font-medium mb-1">
              📋 Riwayat Penyakit
            </p>
            <p className="text-gray-700">{patient.medicalHistory}</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 hover:shadow-lg transition transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-blue-100 text-sm mb-1">Riwayat Lengkap</p>
              <h3 className="text-2xl font-bold">
                {patient.bloodPressureRecords.length}
              </h3>
            </div>
            <span className="text-3xl opacity-50">📊</span>
          </div>
        </button>

        <button className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-6 hover:shadow-lg transition transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-purple-100 text-sm mb-1">Grafik Trend</p>
              <h3 className="text-2xl font-bold">Lihat</h3>
            </div>
            <span className="text-3xl opacity-50">📈</span>
          </div>
        </button>

        <button className="bg-gradient-to-br from-teal-500 to-teal-600 text-white rounded-xl p-6 hover:shadow-lg transition transform hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="text-left">
              <p className="text-teal-100 text-sm mb-1">Pengingat Obat</p>
              <h3 className="text-2xl font-bold">0</h3>
            </div>
            <span className="text-3xl opacity-50">🔔</span>
          </div>
        </button>
      </div>

      {/* Latest Records */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800 flex items-center">
            <span className="mr-2">❤️</span>
            Riwayat Terbaru
          </h3>
          <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
            Lihat Semua →
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                  TANGGAL & WAKTU
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">
                  SISTOL/DIASTOL
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">
                  KATEGORI
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                  KELUHAN
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {patient.bloodPressureRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">
                      {new Date(record.measurementDate).toLocaleDateString(
                        'id-ID'
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {record.measurementTime}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-lg font-bold text-gray-800">
                      {record.systolic}/{record.diastolic}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border-2 ${getCategoryColor(
                        record.category
                      )}`}
                    >
                      {record.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {record.symptoms || '-'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-red-500 hover:text-red-700">
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="sm:hidden space-y-3">
          {patient.bloodPressureRecords.map((record) => (
            <div
              key={record.id}
              className="border border-gray-200 rounded-lg p-3"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-gray-800 text-sm">
                    {new Date(record.measurementDate).toLocaleDateString(
                      'id-ID'
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    {record.measurementTime}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getCategoryColor(
                    record.category
                  )}`}
                >
                  {record.systolic}/{record.diastolic}
                </span>
              </div>
              {record.symptoms && (
                <p className="text-xs text-gray-600 mb-2">{record.symptoms}</p>
              )}
              <button className="text-red-500 hover:text-red-700 text-sm">
                🗑️ Hapus
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PatientDetail
