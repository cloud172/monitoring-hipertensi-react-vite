import { useEffect, useState } from 'react'

const PatientList = () => {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Simulate fetching patients
    setTimeout(() => {
      setPatients([
        {
          id: 1,
          name: 'John Doe',
          nik: '3201010101010001',
          age: 45,
          medicalHistory: 'Hipertensi sejak 2020',
          latest: { systolic: 120, diastolic: 80, category: 'Normal' }
        },
        {
          id: 2,
          name: 'Jane Smith',
          nik: '3201010101010002',
          age: 52,
          medicalHistory: 'Diabetes, Hipertensi',
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
          age: 38,
          medicalHistory: null,
          latest: {
            systolic: 130,
            diastolic: 85,
            category: 'Hipertensi Stadium 1'
          }
        }
      ])
      setLoading(false)
    }, 800)
  }, [])

  const getCategoryColor = (category) => {
    const colors = {
      Normal: 'bg-green-100 text-green-800',
      'Hipertensi Stadium 1': 'bg-yellow-100 text-yellow-800',
      'Hipertensi Stadium 2': 'bg-red-100 text-red-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  const filteredPatients = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nik.includes(searchQuery)
  )

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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Daftar Pasien</h2>
          <p className="text-gray-600">Kelola data pasien Anda</p>
        </div>
        <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium">
          ➕ Tambah Pasien
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama atau NIK pasien..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition outline-none"
          />
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-teal-500 to-teal-600 text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  NO
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  NAMA
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  NIK
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  USIA
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  STATUS
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <tr key={patient.id} className="hover:bg-teal-50 transition">
                    <td className="px-6 py-4 text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {patient.name[0]}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {patient.name}
                          </p>
                          {patient.medicalHistory && (
                            <p className="text-xs text-gray-500 truncate max-w-xs">
                              {patient.medicalHistory}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{patient.nik}</td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-medium text-gray-800">
                        {patient.age}
                      </span>
                      <span className="text-xs text-gray-500 block">tahun</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {patient.latest ? (
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            patient.latest.category
                          )}`}
                        >
                          {patient.latest.category}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">
                          Belum ada data
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition"
                          title="Detail"
                        >
                          👁️
                        </button>
                        <button
                          className="p-2 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 transition"
                          title="Input"
                        >
                          ❤️
                        </button>
                        <button
                          className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition"
                          title="Edit"
                        >
                          ✏️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-gray-300 text-5xl mb-4">👥</span>
                      <p className="text-gray-500 text-lg">
                        {searchQuery
                          ? 'Pasien tidak ditemukan'
                          : 'Belum ada data pasien'}
                      </p>
                      {!searchQuery && (
                        <button className="mt-4 text-teal-600 hover:text-teal-700 font-medium">
                          Tambah Pasien Pertama →
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-start space-x-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {patient.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 truncate">
                    {patient.name}
                  </h3>
                  <p className="text-xs text-gray-500">NIK: {patient.nik}</p>
                  {patient.age && (
                    <p className="text-xs text-gray-500">
                      Usia: {patient.age} tahun
                    </p>
                  )}
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

              <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center justify-center p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">
                  <span className="mb-1">👁️</span>
                  <span className="text-xs">Detail</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition">
                  <span className="mb-1">❤️</span>
                  <span className="text-xs">Input</span>
                </button>
                <button className="flex flex-col items-center justify-center p-3 bg-yellow-50 text-yellow-600 rounded-lg hover:bg-yellow-100 transition">
                  <span className="mb-1">✏️</span>
                  <span className="text-xs">Edit</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <span className="text-gray-300 text-5xl mb-4 block">👥</span>
            <p className="text-gray-500 mb-4">
              {searchQuery ? 'Pasien tidak ditemukan' : 'Belum ada data pasien'}
            </p>
            {!searchQuery && (
              <button className="text-teal-600 hover:text-teal-700 font-medium">
                Tambah Pasien Pertama →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PatientList
