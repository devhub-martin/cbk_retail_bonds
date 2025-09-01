import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { 
  Users, 
  Search, 
  Download, 
  Plus, 
  Filter,
  MoreVertical,
  UserPlus,
  Lock,
  Unlock,
  RotateCcw,
  UserX,
  Eye,
  Mail
} from 'lucide-react'

const users = [
  {
    id: '1',
    username: 'john.mwangi',
    fullName: 'John Mwangi',
    email: 'john.mwangi@cbk.go.ke',
    role: 'Bond Manager',
    status: 'Active',
    lastLogin: '2024-09-01 09:45:00',
    mfaEnabled: true
  },
  {
    id: '2',
    username: 'sarah.kimani',
    fullName: 'Sarah Kimani',
    email: 'sarah.kimani@cbk.go.ke',
    role: 'System Administrator',
    status: 'Active',
    lastLogin: '2024-09-01 08:30:00',
    mfaEnabled: true
  },
  {
    id: '3',
    username: 'david.ochieng',
    fullName: 'David Ochieng',
    email: 'david.ochieng@cbk.go.ke',
    role: 'Compliance Officer',
    status: 'Active',
    lastLogin: '2024-08-31 16:22:00',
    mfaEnabled: true
  },
  {
    id: '4',
    username: 'grace.njeri',
    fullName: 'Grace Njeri',
    email: 'grace.njeri@cbk.go.ke',
    role: 'Operations Support',
    status: 'Locked',
    lastLogin: '2024-08-30 11:15:00',
    mfaEnabled: false
  },
  {
    id: '5',
    username: 'peter.karanja',
    fullName: 'Peter Karanja',
    email: 'peter.karanja@cbk.go.ke',
    role: 'Read Only Viewer',
    status: 'Disabled',
    lastLogin: '2024-08-28 14:08:00',
    mfaEnabled: true
  },
  {
    id: '6',
    username: 'mary.wanjiku',
    fullName: 'Mary Wanjiku',
    email: 'mary.wanjiku@cbk.go.ke',
    role: 'Bond Manager',
    status: 'Active',
    lastLogin: '2024-09-01 07:45:00',
    mfaEnabled: true
  }
]

const roles = ['System Administrator', 'Bond Manager', 'Compliance Officer', 'Operations Support', 'Read Only Viewer']

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [roleFilter, setRoleFilter] = useState('All')
  const [showCreateUser, setShowCreateUser] = useState(false)
  const [exportFormat, setExportFormat] = useState('csv')

  const [newUser, setNewUser] = useState({
    username: '',
    fullName: '',
    email: '',
    role: '',
    mfaMethod: ''
  })

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter
    const matchesRole = roleFilter === 'All' || user.role === roleFilter
    
    return matchesSearch && matchesStatus && matchesRole
  })

  const handleExport = () => {
    alert(`Exporting user list as ${exportFormat.toUpperCase()}...`)
  }

  const handleUserAction = (userId: string, action: string) => {
    alert(`${action} action performed on user ${userId}`)
  }

  const handleCreateUser = () => {
    if (newUser.username && newUser.fullName && newUser.email && newUser.role) {
      alert(`User ${newUser.fullName} created successfully!`)
      setShowCreateUser(false)
      setNewUser({ username: '', fullName: '', email: '', role: '', mfaMethod: '' })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-[#314BB1] text-white">Active</Badge>
      case 'Locked':
        return <Badge className="bg-[#FAD879] text-[#314BB1]">Locked</Badge>
      case 'Disabled':
        return <Badge className="bg-[#7A4A47] text-white">Disabled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#314BB1] mb-2">User Management</h1>
          <p className="text-[#7A4A47]">Create, manage, and monitor user accounts</p>
        </div>
        <div className="flex gap-3">
          <Select value={exportFormat} onValueChange={setExportFormat}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV</SelectItem>
              <SelectItem value="pdf">PDF</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleExport} variant="outline" className="border-[#314BB1] text-[#314BB1]">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Dialog open={showCreateUser} onOpenChange={setShowCreateUser}>
            <DialogTrigger asChild>
              <Button className="bg-[#FAD879] hover:bg-[#FAD879]/90 text-[#314BB1]">
                <Plus className="w-4 h-4 mr-2" />
                New User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-[#314BB1]">Create New User</DialogTitle>
                <DialogDescription>
                  Add a new user account to the Retail Bond System
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="john.mwangi"
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      placeholder="John Mwangi"
                      value={newUser.fullName}
                      onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.mwangi@cbk.go.ke"
                    value={newUser.email}
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role Assignment</Label>
                  <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mfaMethod">MFA Method</Label>
                  <Select value={newUser.mfaMethod} onValueChange={(value) => setNewUser({...newUser, mfaMethod: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select MFA method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms">SMS Authentication</SelectItem>
                      <SelectItem value="email">Email Authentication</SelectItem>
                      <SelectItem value="app">Authenticator App</SelectItem>
                      <SelectItem value="biometric">Biometric Verification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button 
                    onClick={handleCreateUser}
                    className="flex-1 bg-[#314BB1] hover:bg-[#314BB1]/90"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create User
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCreateUser(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 relative min-w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7A4A47] w-4 h-4" />
              <Input
                placeholder="Search by username, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Locked">Locked</SelectItem>
                <SelectItem value="Disabled">Disabled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Badge variant="secondary" className="bg-[#314BB1]/10 text-[#314BB1]">
              {filteredUsers.length} users
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#314BB1]">
            <Users className="w-5 h-5" />
            User Accounts
          </CardTitle>
          <CardDescription>Manage user accounts, roles, and access permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#314BB1]">Username</TableHead>
                  <TableHead className="text-[#314BB1]">Full Name</TableHead>
                  <TableHead className="text-[#314BB1]">Email</TableHead>
                  <TableHead className="text-[#314BB1]">Role</TableHead>
                  <TableHead className="text-[#314BB1]">Status</TableHead>
                  <TableHead className="text-[#314BB1]">MFA</TableHead>
                  <TableHead className="text-[#314BB1]">Last Login</TableHead>
                  <TableHead className="text-[#314BB1]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-[#F3F9FD]">
                    <TableCell className="font-medium text-[#314BB1]">{user.username}</TableCell>
                    <TableCell>{user.fullName}</TableCell>
                    <TableCell className="text-[#7A4A47]">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-[#314BB1] text-[#314BB1]">
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>
                      <Badge variant={user.mfaEnabled ? "default" : "secondary"} className={
                        user.mfaEnabled 
                          ? "bg-green-600 text-white" 
                          : "bg-[#7A4A47] text-white"
                      }>
                        {user.mfaEnabled ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-[#7A4A47]">
                      {new Date(user.lastLogin).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="w-8 h-8 p-0">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, 'View Details')}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, 'Send Email')}>
                            <Mail className="w-4 h-4 mr-2" />
                            Send Email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, 'Reset Password')}>
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Reset Password
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, user.status === 'Locked' ? 'Unlock' : 'Lock')}>
                            {user.status === 'Locked' ? <Unlock className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
                            {user.status === 'Locked' ? 'Unlock Account' : 'Lock Account'}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleUserAction(user.id, user.status === 'Disabled' ? 'Enable' : 'Disable')}
                            className="text-[#7A4A47]"
                          >
                            <UserX className="w-4 h-4 mr-2" />
                            {user.status === 'Disabled' ? 'Enable Account' : 'Disable Account'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
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
                <Users className="w-5 h-5 text-[#314BB1]" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">Total Users</p>
                <p className="text-xl font-semibold text-[#314BB1]">{users.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">Active Users</p>
                <p className="text-xl font-semibold text-green-600">
                  {users.filter(u => u.status === 'Active').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FAD879]/20 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-[#314BB1]" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">Locked/Disabled</p>
                <p className="text-xl font-semibold text-[#7A4A47]">
                  {users.filter(u => u.status === 'Locked' || u.status === 'Disabled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">MFA Enabled</p>
                <p className="text-xl font-semibold text-green-600">
                  {users.filter(u => u.mfaEnabled).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}