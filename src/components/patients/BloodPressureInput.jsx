import { format } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'
import { db } from '../../lib/supabase'

const BloodPressureInput = ({ patientId, patientName, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    systolic: '',
    diastolic: '',
    measurement_date: format(new Date(), 'yyyy-MM-dd'),
    measurement_time: format(new Date(), 'HH:mm'),
    symptoms: '',
    notes: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const determineCategory = (systolic, diastolic) => {
    if (systolic >= 140 || diastolic >= 90) {
      return 'Hipertensi Stadium 2'
    } else if (
      (systolic >= 130 && systolic <= 139) ||
      (diastolic >= 80 && diastolic <= 89)
    ) {
      return 'Hipertensi Stadium 1'
    } else if (systolic >= 120 && systolic <= 129 && diastolic < 80) {
      return 'Pra-hipertensi'
    } else {
      return 'Normal'
    }
  }

  const getCategoryColor = (category) => {
    const colors = {
      Normal: 'bg-green-100 text-green-800 border-green-500',
      'Pra-hipertensi': 'bg-amber-100 text-amber-800 border-amber-500',
      'Hipertensi Stadium 1': 'bg-yellow-100 text-yellow-800 border-yellow-500',
      'Hipertensi Stadium 2': 'bg-red-100 text-red-800 border-red-500'
    }
    return colors[category] || 'bg-gray-100 text-gray-800 border-gray-500'
  }

  const currentCategory =
    formData.systolic && formData.diastolic
      ? determineCategory(
          parseInt(formData.systolic),
          parseInt(formData.diastolic)
        )
      : null

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.systolic || !formData.diastolic) {
      toast.error('Systolic dan Diastolic wajib diisi')
      return
    }

    if (parseInt(formData.systolic) < 70 || parseInt(formData.systolic) > 250) {
      toast.error('Systolic harus antara 70-250 mmHg')
      return
    }

    if (
      parseInt(formData.diastolic) < 40 ||
      parseInt(formData.diastolic) > 150
    ) {
      toast.error('Diastolic harus antara 40-150 mmHg')
      return
    }

    setLoading(true)

    try {
      const recordData = {
        patient_id: patientId,
        systolic: parseInt(formData.systolic),
        diastolic: parseInt(formData.diastolic),
        measurement_date: formData.measurement_date,
        measurement_time: formData.measurement_time,
        symptoms: formData.symptoms || null,
        notes: formData.notes || null
      }

      const { error } = await db.createBloodPressureRecord(recordData)
      if (error) throw error

      toast.success('Data tekanan darah berhasil disimpan!')
      onSuccess?.()
      onClose?.()
    } catch (error) {
      toast.error(error.message || 'Gagal menyimpan data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-teal-500 to-teal-600 text-white p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Input Tekanan Darah</h2>
              <p className="text-teal-100 text-sm mt-1">{patientName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
            >
              ✕
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Blood Pressure Reading */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">❤️</span>
              Hasil Pengukuran
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Systolic (mmHg) *
                </label>
                <input
                  type="number"
                  name="systolic"
                  value={formData.systolic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-center text-2xl font-bold rounded-lg border-2 border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition outline-none"
                  placeholder="120"
                  min="70"
                  max="250"
                  required
                />
                <p className="text-xs text-gray-500 text-center mt-1">70-250</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Diastolic (mmHg) *
                </label>
                <input
                  type="number"
                  name="diastolic"
                  value={formData.diastolic}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-center text-2xl font-bold rounded-lg border-2 border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition outline-none"
                  placeholder="80"
                  min="40"
                  max="150"
                  required
                />
                <p className="text-xs text-gray-500 text-center mt-1">40-150</p>
              </div>
            </div>

            {currentCategory && (
              <div className="mt-4 p-4 rounded-lg border-2 bg-white">
                <p className="text-sm text-gray-600 mb-2">Kategori:</p>
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-bold border-2 ${getCategoryColor(
                      currentCategory
                    )}`}
                  >
                    {currentCategory}
                  </span>
                  <span className="text-3xl font-bold text-gray-800">
                    {formData.systolic}/{formData.diastolic}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Date & Time */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📅</span>
              Waktu Pengukuran
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal *
                </label>
                <input
                  type="date"
                  name="measurement_date"
                  value={formData.measurement_date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Waktu *
                </label>
                <input
                  type="time"
                  name="measurement_time"
                  value={formData.measurement_time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Keluhan / Gejala
            </label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition outline-none"
              placeholder="Pusing, sakit kepala, sesak napas..."
              rows="3"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catatan Tambahan
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition outline-none"
              placeholder="Catatan untuk perawat atau dokter..."
              rows="2"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading || !formData.systolic || !formData.diastolic}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-3"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                '💾 Simpan Data'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BloodPressureInput
