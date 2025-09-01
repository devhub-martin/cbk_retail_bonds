import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

import { 
  FileText, 
  Search, 
  Download, 
  Filter,
  Calendar,
  Settings,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Server
} from 'lucide-react'

const auditLogs = [
  {
    id: '1',
    timestamp: '2024-09-01 10:15:32',
    user: 'john.mwangi',
    activity: 'User Login',
    details: 'Successful login with MFA (SMS)',
    outcome: 'Success',
    ipAddress: '192.168.1.45',
    userAgent: 'Mozilla/5.0 Chrome/128.0.0.0',
    category: 'Authentication'
  },
  {
    id: '2',
    timestamp: '2024-09-01 10:12:18',
    user: 'sarah.kimani',
    activity: 'Role Permission Update',
    details: 'Updated permissions for Bond Manager role - added audit-logs access',
    outcome: 'Success',
    ipAddress: '192.168.1.23',
    userAgent: 'Mozilla/5.0 Firefox/129.0',
    category: 'Authorization'
  },
  {
    id: '3',
    timestamp: '2024-09-01 09:58:45',
    user: 'system',
    activity: 'Password Policy Change',
    details: 'Minimum password length changed from 10 to 12 characters',
    outcome: 'Success',
    ipAddress: '127.0.0.1',
    userAgent: 'System Process',
    category: 'Configuration'
  },
  {
    id: '4',
    timestamp: '2024-09-01 09:45:22',
    user: 'grace.njeri',
    activity: 'Failed Login Attempt',
    details: 'Invalid password - account locked after 5 attempts',
    outcome: 'Failure',
    ipAddress: '192.168.1.67',
    userAgent: 'Mozilla/5.0 Safari/17.6',
    category: 'Security'
  },
  {
    id: '5',
    timestamp: '2024-09-01 09:30:14',
    user: 'david.ochieng',
    activity: 'User Account Created',
    details: 'Created new user account for mary.wanjiku with Bond Manager role',
    outcome: 'Success',
    ipAddress: '192.168.1.89',
    userAgent: 'Mozilla/5.0 Chrome/128.0.0.0',
    category: 'User Management'
  },
  {
    id: '6',
    timestamp: '2024-09-01 08:45:33',
    user: 'peter.karanja',
    activity: 'Report Generation',
    details: 'Generated user access report (CSV format)',
    outcome: 'Success',
    ipAddress: '192.168.1.112',
    userAgent: 'Mozilla/5.0 Edge/128.0.0.0',
    category: 'Reporting'
  },
  {
    id: '7',
    timestamp: '2024-09-01 08:22:17',
    user: 'system',
    activity: 'Session Timeout',
    details: 'User session expired after 30 minutes of inactivity',
    outcome: 'System',
    ipAddress: '192.168.1.45',
    userAgent: 'System Process',
    category: 'Security'
  }
]

const categories = ['All', 'Authentication', 'Authorization', 'Configuration', 'Security', 'User Management', 'Reporting']
const outcomes = ['All', 'Success', 'Failure', 'System']

export function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [outcomeFilter, setOutcomeFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('today')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [showIntegrationDialog, setShowIntegrationDialog] = useState(false)
  const [exportFormat, setExportFormat] = useState('csv')
  const [syslogEndpoint, setSyslogEndpoint] = useState('syslog.cbk.go.ke:514')

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = categoryFilter === 'All' || log.category === categoryFilter
    const matchesOutcome = outcomeFilter === 'All' || log.outcome === outcomeFilter
    
    return matchesSearch && matchesCategory && matchesOutcome
  })

  const handleExport = () => {
    alert(`Exporting audit logs as ${exportFormat.toUpperCase()}...`)
    setShowExportDialog(false)
  }

  const handleTestConnection = () => {
    alert(`Testing connection to ${syslogEndpoint}...`)
    setTimeout(() => {
      alert('Connection successful!')
    }, 1000)
  }

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case 'Success':
        return <Badge className="bg-green-600 text-white">Success</Badge>
      case 'Failure':
        return <Badge className="bg-[#7A4A47] text-white">Failure</Badge>
      case 'System':
        return <Badge className="bg-[#314BB1] text-white">System</Badge>
      default:
        return <Badge variant="outline">{outcome}</Badge>
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Authentication':
        return 'bg-blue-100 text-blue-800'
      case 'Authorization':
        return 'bg-purple-100 text-purple-800'
      case 'Configuration':
        return 'bg-yellow-100 text-yellow-800'
      case 'Security':
        return 'bg-red-100 text-red-800'
      case 'User Management':
        return 'bg-green-100 text-green-800'
      case 'Reporting':
        return 'bg-indigo-100 text-indigo-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#314BB1] mb-2">Audit & Logging Dashboard</h1>
          <p className="text-[#7A4A47]">Monitor system activities and security events</p>
        </div>
        <div className="flex gap-3">
          <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-[#314BB1] text-[#314BB1]">
                <Download className="w-4 h-4 mr-2" />
                Export Logs
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-[#314BB1]">Export Audit Logs</DialogTitle>
                <DialogDescription>
                  Choose format and date range for log export
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Export Format</Label>
                  <Select value={exportFormat} onValueChange={setExportFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="csv">CSV File</SelectItem>
                      <SelectItem value="pdf">PDF Report</SelectItem>
                      <SelectItem value="json">JSON Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Date Range</Label>
                  <Select defaultValue="today">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="week">Last 7 days</SelectItem>
                      <SelectItem value="month">Last 30 days</SelectItem>
                      <SelectItem value="custom">Custom range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleExport} className="flex-1 bg-[#314BB1] hover:bg-[#314BB1]/90">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" onClick={() => setShowExportDialog(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showIntegrationDialog} onOpenChange={setShowIntegrationDialog}>
            <DialogTrigger asChild>
              <Button className="bg-[#FAD879] hover:bg-[#FAD879]/90 text-[#314BB1]">
                <Settings className="w-4 h-4 mr-2" />
                Integration
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-[#314BB1]">External Logging Integration</DialogTitle>
                <DialogDescription>
                  Configure integration with external logging systems
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Syslog Endpoint</Label>
                  <Input
                    value={syslogEndpoint}
                    onChange={(e) => setSyslogEndpoint(e.target.value)}
                    placeholder="hostname:port"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Protocol</Label>
                  <Select defaultValue="tcp">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tcp">TCP</SelectItem>
                      <SelectItem value="udp">UDP</SelectItem>
                      <SelectItem value="tls">TLS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleTestConnection} variant="outline" className="flex-1">
                    Test Connection
                  </Button>
                  <Button className="flex-1 bg-[#314BB1] hover:bg-[#314BB1]/90">
                    Save Configuration
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 relative min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7A4A47] w-4 h-4" />
              <Input
                placeholder="Search logs by user, activity, or details..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === 'All' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={outcomeFilter} onValueChange={setOutcomeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {outcomes.map((outcome) => (
                  <SelectItem key={outcome} value={outcome}>
                    {outcome === 'All' ? 'All Outcomes' : outcome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>

            <Badge variant="secondary" className="bg-[#314BB1]/10 text-[#314BB1]">
              {filteredLogs.length} events
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Audit Logs Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#314BB1]">
            <FileText className="w-5 h-5" />
            System Activity Logs
          </CardTitle>
          <CardDescription>Detailed audit trail of all system activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#314BB1] w-4"></TableHead>
                  <TableHead className="text-[#314BB1]">Timestamp</TableHead>
                  <TableHead className="text-[#314BB1]">User</TableHead>
                  <TableHead className="text-[#314BB1]">Activity</TableHead>
                  <TableHead className="text-[#314BB1]">Category</TableHead>
                  <TableHead className="text-[#314BB1]">Outcome</TableHead>
                  <TableHead className="text-[#314BB1]">IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.map((log) => (
                  <React.Fragment key={log.id}>
                    <TableRow className="hover:bg-[#F3F9FD]">
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-6 h-6 p-0"
                          onClick={() => setExpandedRow(expandedRow === log.id ? null : log.id)}
                        >
                          {expandedRow === log.id ? 
                            <ChevronDown className="w-4 h-4" /> : 
                            <ChevronRight className="w-4 h-4" />
                          }
                        </Button>
                      </TableCell>
                      <TableCell className="font-mono text-sm text-[#314BB1]">
                        {log.timestamp}
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-[#314BB1] rounded-full flex items-center justify-center text-xs text-white">
                            {log.user === 'system' ? 'S' : log.user.charAt(0).toUpperCase()}
                          </div>
                          {log.user}
                        </div>
                      </TableCell>
                      <TableCell>{log.activity}</TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(log.category)}>
                          {log.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{getOutcomeBadge(log.outcome)}</TableCell>
                      <TableCell className="font-mono text-sm text-[#7A4A47]">
                        {log.ipAddress}
                      </TableCell>
                    </TableRow>
                    {expandedRow === log.id && (
                      <TableRow className="bg-[#F3F9FD]">
                        <TableCell colSpan={7}>
                          <div className="p-4 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium text-[#314BB1]">Activity Details</Label>
                                <p className="text-sm text-[#7A4A47] mt-1">{log.details}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium text-[#314BB1]">User Agent</Label>
                                <p className="text-sm text-[#7A4A47] mt-1 font-mono">{log.userAgent}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2 border-t border-[#314BB1]/10">
                              <Button variant="outline" size="sm" className="text-xs">
                                <ExternalLink className="w-3 h-3 mr-1" />
                                View Full Log
                              </Button>
                              <Badge variant="outline" className="text-xs">
                                Event ID: {log.id}
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#314BB1]/10 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#314BB1]" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">Total Events</p>
                <p className="text-xl font-semibold text-[#314BB1]">{auditLogs.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">Successful</p>
                <p className="text-xl font-semibold text-green-600">
                  {auditLogs.filter(log => log.outcome === 'Success').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">Failed Events</p>
                <p className="text-xl font-semibold text-red-600">
                  {auditLogs.filter(log => log.outcome === 'Failure').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FAD879]/20 rounded-lg flex items-center justify-center">
                <Server className="w-5 h-5 text-[#314BB1]" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">System Events</p>
                <p className="text-xl font-semibold text-[#314BB1]">
                  {auditLogs.filter(log => log.outcome === 'System').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}