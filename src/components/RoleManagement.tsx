import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Separator } from './ui/separator'
import { 
  UserCheck, 
  Search, 
  Download, 
  Plus, 
  Edit, 
  Users,
  Shield,
  Eye,
  Trash2
} from 'lucide-react'

const roles = [
  {
    id: '1',
    name: 'System Administrator',
    description: 'Full system access and configuration',
    userCount: 3,
    permissions: {
      'user-management': true,
      'role-management': true,
      'system-config': true,
      'audit-logs': true,
      'maker-checker': true,
      'bond-management': true,
      'reports': true,
      'security-settings': true
    }
  },
  {
    id: '2',
    name: 'Bond Manager',
    description: 'Manage bond operations and investor accounts',
    userCount: 12,
    permissions: {
      'user-management': false,
      'role-management': false,
      'system-config': false,
      'audit-logs': true,
      'maker-checker': true,
      'bond-management': true,
      'reports': true,
      'security-settings': false
    }
  },
  {
    id: '3',
    name: 'Compliance Officer',
    description: 'Monitor compliance and audit activities',
    userCount: 5,
    permissions: {
      'user-management': false,
      'role-management': false,
      'system-config': false,
      'audit-logs': true,
      'maker-checker': true,
      'bond-management': false,
      'reports': true,
      'security-settings': false
    }
  },
  {
    id: '4',
    name: 'Operations Support',
    description: 'Basic operational support and reporting',
    userCount: 8,
    permissions: {
      'user-management': false,
      'role-management': false,
      'system-config': false,
      'audit-logs': false,
      'maker-checker': false,
      'bond-management': true,
      'reports': true,
      'security-settings': false
    }
  },
  {
    id: '5',
    name: 'Read Only Viewer',
    description: 'View-only access to reports and dashboards',
    userCount: 7,
    permissions: {
      'user-management': false,
      'role-management': false,
      'system-config': false,
      'audit-logs': false,
      'maker-checker': false,
      'bond-management': false,
      'reports': true,
      'security-settings': false
    }
  }
]

const permissions = [
  { id: 'user-management', label: 'User Management', description: 'Create, edit, and manage user accounts' },
  { id: 'role-management', label: 'Role Management', description: 'Manage roles and permissions' },
  { id: 'system-config', label: 'System Configuration', description: 'Configure system settings and policies' },
  { id: 'audit-logs', label: 'Audit & Logging', description: 'View and export audit logs' },
  { id: 'maker-checker', label: 'Maker-Checker', description: 'Initiate and approve workflow actions' },
  { id: 'bond-management', label: 'Bond Management', description: 'Manage bond operations and investor relations' },
  { id: 'reports', label: 'Reports', description: 'Generate and view system reports' },
  { id: 'security-settings', label: 'Security Settings', description: 'Configure security policies and MFA' }
]

export function RoleManagement() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState<typeof roles[0] | null>(null)
  const [exportFormat, setExportFormat] = useState('csv')

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleExport = () => {
    // Simulate export functionality
    const fileName = `role_permissions_matrix.${exportFormat}`
    alert(`Exporting ${fileName}...`)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#314BB1] mb-2">Role & Rights Management</h1>
          <p className="text-[#7A4A47]">Assign permissions to roles and manage access control</p>
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
          <Button onClick={handleExport} className="bg-[#314BB1] hover:bg-[#314BB1]/90">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-[#FAD879] hover:bg-[#FAD879]/90 text-[#314BB1]">
            <Plus className="w-4 h-4 mr-2" />
            New Role
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7A4A47] w-4 h-4" />
              <Input
                placeholder="Search roles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary" className="bg-[#314BB1]/10 text-[#314BB1]">
              {filteredRoles.length} roles
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Permissions Matrix */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#314BB1]">
            <Shield className="w-5 h-5" />
            Permissions Matrix
          </CardTitle>
          <CardDescription>Role permissions overview - click on role name for details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] text-[#314BB1]">Role</TableHead>
                  <TableHead className="text-center text-[#314BB1]">Users</TableHead>
                  {permissions.map((permission) => (
                    <TableHead key={permission.id} className="text-center text-[#314BB1] min-w-[120px]">
                      <div className="text-xs">{permission.label}</div>
                    </TableHead>
                  ))}
                  <TableHead className="text-center text-[#314BB1]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRoles.map((role) => (
                  <TableRow key={role.id} className="hover:bg-[#F3F9FD]">
                    <TableCell>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="link" className="p-0 h-auto text-left text-[#314BB1] hover:text-[#314BB1]/80">
                            <div>
                              <div className="font-medium">{role.name}</div>
                              <div className="text-sm text-[#7A4A47]">{role.description}</div>
                            </div>
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px]">
                          <SheetHeader>
                            <SheetTitle className="text-[#314BB1]">{role.name}</SheetTitle>
                            <SheetDescription>{role.description}</SheetDescription>
                          </SheetHeader>
                          <div className="mt-6 space-y-6">
                            {/* Role Details */}
                            <div className="space-y-4">
                              <div>
                                <Label className="text-[#314BB1]">Role Name</Label>
                                <Input defaultValue={role.name} className="mt-1" />
                              </div>
                              <div>
                                <Label className="text-[#314BB1]">Description</Label>
                                <Input defaultValue={role.description} className="mt-1" />
                              </div>
                            </div>

                            <Separator />

                            {/* Permissions */}
                            <div>
                              <h3 className="text-[#314BB1] font-medium mb-3">Permissions</h3>
                              <div className="space-y-3">
                                {permissions.map((permission) => (
                                  <div key={permission.id} className="flex items-start space-x-2">
                                    <Checkbox
                                      id={`${role.id}-${permission.id}`}
                                      checked={role.permissions[permission.id as keyof typeof role.permissions]}
                                      className="mt-1"
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                      <Label htmlFor={`${role.id}-${permission.id}`} className="text-sm font-medium">
                                        {permission.label}
                                      </Label>
                                      <p className="text-xs text-[#7A4A47]">{permission.description}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <Separator />

                            {/* Assigned Users */}
                            <div>
                              <h3 className="text-[#314BB1] font-medium mb-3">Assigned Users ({role.userCount})</h3>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 p-2 bg-[#F3F9FD] rounded">
                                  <div className="w-6 h-6 bg-[#314BB1] rounded-full flex items-center justify-center text-xs text-white">JM</div>
                                  <span className="text-sm">John Mwangi</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 bg-[#F3F9FD] rounded">
                                  <div className="w-6 h-6 bg-[#314BB1] rounded-full flex items-center justify-center text-xs text-white">SK</div>
                                  <span className="text-sm">Sarah Kimani</span>
                                </div>
                                <Button variant="link" size="sm" className="text-[#314BB1] p-0 h-auto">
                                  View all {role.userCount} users →
                                </Button>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2 pt-4">
                              <Button className="flex-1 bg-[#FAD879] hover:bg-[#FAD879]/90 text-[#314BB1]">
                                Save Changes
                              </Button>
                              <Button variant="outline" className="border-[#7A4A47] text-[#7A4A47]">
                                Delete Role
                              </Button>
                            </div>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="border-[#314BB1] text-[#314BB1]">
                        {role.userCount}
                      </Badge>
                    </TableCell>
                    {permissions.map((permission) => (
                      <TableCell key={permission.id} className="text-center">
                        {role.permissions[permission.id as keyof typeof role.permissions] ? (
                          <div className="w-4 h-4 bg-[#314BB1] rounded-full mx-auto"></div>
                        ) : (
                          <div className="w-4 h-4 border border-gray-300 rounded-full mx-auto"></div>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-[#314BB1]">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="w-8 h-8 p-0 text-[#7A4A47]">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#314BB1]/10 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-[#314BB1]" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">Total Roles</p>
                <p className="text-xl font-semibold text-[#314BB1]">{roles.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FAD879]/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-[#314BB1]" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">Assigned Users</p>
                <p className="text-xl font-semibold text-[#314BB1]">{roles.reduce((sum, role) => sum + role.userCount, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#314BB1]/10 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#314BB1]" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">Permissions</p>
                <p className="text-xl font-semibold text-[#314BB1]">{permissions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7A4A47]/10 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-[#7A4A47]" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">Last Updated</p>
                <p className="text-sm font-semibold text-[#314BB1]">2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}