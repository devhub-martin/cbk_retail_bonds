import { useState } from 'react'
import { Sidebar } from './components/CBKSidebar'
import { LoginScreen } from './components/LoginScreen'
import { Dashboard } from './components/Dashboard'
import { PasswordSettings } from './components/PasswordSettings'
import { RoleManagement } from './components/RoleManagement'
import { UserManagement } from './components/UserManagement'
import { AuditLogs } from './components/AuditLogs'
import { MakerChecker } from './components/MakerChecker'

export type Screen = 'login' | 'dashboard' | 'password-settings' | 'role-management' | 'user-management' | 'audit-logs' | 'maker-checker'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login')
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = () => {
    setIsAuthenticated(true)
    setCurrentScreen('dashboard')
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentScreen('login')
  }

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentScreen} />
      case 'password-settings':
        return <PasswordSettings />
      case 'role-management':
        return <RoleManagement />
      case 'user-management':
        return <UserManagement />
      case 'audit-logs':
        return <AuditLogs />
      case 'maker-checker':
        return <MakerChecker />
      default:
        return <Dashboard onNavigate={setCurrentScreen} />
    }
  }

  return (
    <div className="flex h-screen bg-[#F3F9FD]">
      <Sidebar 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto">
        {renderScreen()}
      </main>
    </div>
  )
}