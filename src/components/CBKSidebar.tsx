import { 
  Shield, 
  Settings, 
  Users, 
  UserCheck, 
  FileText, 
  CheckSquare,
  LayoutDashboard,
  LogOut,
  Building2
} from 'lucide-react'
import { Button } from './ui/button'
import type { Screen } from '../App'

interface SidebarProps {
  currentScreen: Screen
  onNavigate: (screen: Screen) => void
  onLogout: () => void
}

const menuItems = [
  { id: 'dashboard' as Screen, label: 'Dashboard', icon: LayoutDashboard },
  { id: 'password-settings' as Screen, label: 'Password & Session', icon: Settings },
  { id: 'role-management' as Screen, label: 'Role Management', icon: UserCheck },
  { id: 'user-management' as Screen, label: 'User Management', icon: Users },
  { id: 'audit-logs' as Screen, label: 'Audit & Logging', icon: FileText },
  { id: 'maker-checker' as Screen, label: 'Maker-Checker', icon: CheckSquare },
]

export function Sidebar({ currentScreen, onNavigate, onLogout }: SidebarProps) {
  return (
    <div className="w-64 bg-[#314BB1] text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FAD879] rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-[#314BB1]" />
          </div>
          <div>
            <h1 className="text-lg font-semibold">CBK RBS</h1>
            <p className="text-sm text-white/80">Retail Bond System</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = currentScreen === item.id
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start gap-3 h-12 ${
                isActive 
                  ? 'bg-[#FAD879] text-[#314BB1] hover:bg-[#FAD879]/90' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[#FAD879] rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-[#314BB1]">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-white/70">System Administrator</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-white/80 hover:text-white hover:bg-white/10"
          onClick={onLogout}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
      </div>
    </div>
  )
}