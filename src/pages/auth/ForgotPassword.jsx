import { useState } from 'react'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    setError('')

    if (!email) {
      setError('Email wajib diisi')
      return
    }

    setLoading(true)

    try {
      // Supabase password reset
      const response = await fetch(
        'https://your-project.supabase.co/auth/v1/recover',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: 'your-anon-key'
          },
          body: JSON.stringify({ email })
        }
      )

      if (response.ok) {
        setSuccess(true)
      } else {
        setError('Email tidak ditemukan di sistem kami')
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-3xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Email Terkirim!
              </h2>
              <p className="text-gray-600">
                Kami telah mengirimkan link reset password ke email Anda.
                Silakan cek inbox atau folder spam.
              </p>
            </div>

            <button
              onClick={() => (window.location.href = '/login')}
              className="w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition shadow-lg"
            >
              Kembali ke Login
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl shadow-lg mb-4">
            <span className="text-white text-3xl">❤️</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            Tension Track
          </h1>
          <p className="text-teal-600 font-medium">Lupa Password</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-teal-600 text-2xl">🔑</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Lupa Password?
            </h2>
            <p className="text-gray-600">
              Masukkan email Anda dan kami akan mengirimkan link untuk reset
              password
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
              <div className="flex items-center">
                <span className="text-red-500 mr-3">⚠️</span>
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              EMAIL
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                📧
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition outline-none"
                placeholder="email@example.com"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || !email}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg font-semibold hover:from-teal-600 hover:to-teal-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Loading...
              </span>
            ) : (
              '📨 Kirim Link Reset'
            )}
          </button>

          <button
            onClick={() => (window.location.href = '/login')}
            className="block w-full text-center text-teal-600 hover:text-teal-700 font-medium"
          >
            ← Kembali ke Login
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            © 2025 PPN UPI | Program Profesi Ners
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
