export const Layout = ({ children }) => {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { name: 'Daftar Pasien', path: '/patients', icon: '👥' },
    { name: 'Edukasi', path: '/education', icon: '📚' },
    { name: 'Profil', path: '/profile', icon: '👤' }
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-gradient-to-b from-teal-600 to-teal-700 text-white flex-shrink-0 flex-col">
        <div className="p-6 border-b border-teal-500">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-teal-600 text-xl">❤️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Tension</h1>
              <p className="text-xs text-teal-200">Track</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 hover:bg-teal-500 transition"
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-teal-500">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500 transition"
          >
            <span>🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-teal-600 to-teal-700 text-white z-50 lg:hidden transform transition-transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-teal-500 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-teal-600 text-xl">❤️</span>
            </div>
            <div>
              <h1 className="text-xl font-bold">Tension</h1>
              <p className="text-xs text-teal-200">Track</p>
            </div>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => {
                navigate(link.path)
                setIsMobileMenuOpen(false)
              }}
              className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 hover:bg-teal-500 transition"
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-teal-500">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500 transition"
          >
            <span>🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-10 flex-shrink-0">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-gray-600 hover:text-teal-600"
            >
              ☰
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-800">
                  {profile?.name || user?.email}
                </p>
                <p className="text-xs text-gray-500">
                  {profile?.nip || 'Perawat'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold">
                {(profile?.name || user?.email || 'U')[0].toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
