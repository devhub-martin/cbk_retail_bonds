import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { 
  Users, 
  Shield, 
  FileText, 
  CheckSquare, 
  Settings,
  UserCheck,
  TrendingUp,
  AlertTriangle,
  Clock,
  DollarSign
} from 'lucide-react'
import type { Screen } from '../App'

interface DashboardProps {
  onNavigate: (screen: Screen) => void
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const metrics = [
    {
      title: 'Total Investors',
      value: '15,247',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-[#314BB1]'
    },
    {
      title: 'Outstanding Bond Value',
      value: 'KES 2.8B',
      change: '+8.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-[#314BB1]'
    },
    {
      title: 'Pending Approvals',
      value: '23',
      change: '5 urgent',
      trend: 'alert',
      icon: AlertTriangle,
      color: 'text-[#7A4A47]'
    },
    {
      title: 'Active Sessions',
      value: '156',
      change: 'Last hour',
      trend: 'neutral',
      icon: Clock,
      color: 'text-[#314BB1]'
    }
  ]

  const actionCards = [
    {
      id: 'user-management' as Screen,
      title: 'User Management',
      description: 'Create, lock, disable accounts and generate user reports',
      icon: Users,
      color: 'bg-[#314BB1]',
      stats: '1,247 users'
    },
    {
      id: 'role-management' as Screen,
      title: 'Role & Rights',
      description: 'Assign permissions to roles and manage access matrix',
      icon: UserCheck,
      color: 'bg-[#314BB1]',
      stats: '12 roles defined'
    },
    {
      id: 'password-settings' as Screen,
      title: 'Security Settings',
      description: 'Configure password policies and session timeouts',
      icon: Settings,
      color: 'bg-[#314BB1]',
      stats: 'Last updated 2d ago'
    },
    {
      id: 'audit-logs' as Screen,
      title: 'Audit & Logging',
      description: 'View system activities and export audit reports',
      icon: FileText,
      color: 'bg-[#314BB1]',
      stats: '50,000+ events'
    },
    {
      id: 'maker-checker' as Screen,
      title: 'Maker-Checker',
      description: 'Review pending approvals and workflow management',
      icon: CheckSquare,
      color: 'bg-[#7A4A47]',
      stats: '23 pending'
    }
  ]

  const recentActivities = [
    {
      user: 'John Mwangi',
      action: 'Created new bond investor account',
      time: '2 minutes ago',
      status: 'completed'
    },
    {
      user: 'Sarah Kimani',
      action: 'Updated role permissions for Bond Managers',
      time: '15 minutes ago',
      status: 'pending'
    },
    {
      user: 'System Admin',
      action: 'Password policy updated',
      time: '1 hour ago',
      status: 'completed'
    },
    {
      user: 'David Ochieng',
      action: 'Generated user access report',
      time: '2 hours ago',
      status: 'completed'
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#314BB1] mb-2">System Dashboard</h1>
        <p className="text-[#7A4A47]">Central Bank of Kenya - Retail Bond System Administration</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#7A4A47] mb-1">{metric.title}</p>
                    <p className="text-2xl font-semibold text-[#314BB1]">{metric.value}</p>
                    <p className="text-sm text-[#7A4A47] mt-1">{metric.change}</p>
                  </div>
                  <div className={`w-12 h-12 ${metric.trend === 'alert' ? 'bg-[#7A4A47]/10' : 'bg-[#314BB1]/10'} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Action Cards Grid */}
      <div>
        <h2 className="text-lg font-semibold text-[#314BB1] mb-4">Security & Administration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {actionCards.map((card) => {
            const Icon = card.icon
            return (
              <Card key={card.id} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs bg-[#F3F9FD] text-[#314BB1]">
                      {card.stats}
                    </Badge>
                  </div>
                  <CardTitle className="text-[#314BB1]">{card.title}</CardTitle>
                  <CardDescription className="text-[#7A4A47]">{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    className="w-full bg-[#FAD879] hover:bg-[#FAD879]/90 text-[#314BB1] group-hover:bg-[#314BB1] group-hover:text-white transition-colors"
                    onClick={() => onNavigate(card.id)}
                  >
                    Manage
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Recent Activities */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-[#314BB1]">Recent Activities</CardTitle>
              <CardDescription className="text-[#7A4A47]">Latest system administration actions</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-[#314BB1] text-[#314BB1]">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#F3F9FD] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#314BB1] rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-semibold">
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#314BB1]">{activity.user}</p>
                    <p className="text-sm text-[#7A4A47]">{activity.action}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    variant={activity.status === 'completed' ? 'default' : 'secondary'}
                    className={activity.status === 'completed' 
                      ? 'bg-[#314BB1] text-white' 
                      : 'bg-[#FAD879] text-[#314BB1]'
                    }
                  >
                    {activity.status}
                  </Badge>
                  <p className="text-xs text-[#7A4A47] mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}