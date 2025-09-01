import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Separator } from './ui/separator'
import { 
  CheckSquare, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,
  User,
  AlertTriangle,
  Calendar,
  MessageSquare,
  ArrowRight
} from 'lucide-react'

const pendingApprovals = [
  {
    id: 'PA001',
    initiator: 'john.mwangi',
    initiatorName: 'John Mwangi',
    action: 'Create New User Account',
    description: 'Create user account for Alice Wanjiru with Bond Manager role',
    dateInitiated: '2024-09-01 09:30:00',
    priority: 'Normal',
    status: 'Pending First Approval',
    category: 'User Management',
    details: {
      username: 'alice.wanjiru',
      fullName: 'Alice Wanjiru',
      role: 'Bond Manager',
      email: 'alice.wanjiru@cbk.go.ke'
    },
    approvals: [
      { reviewer: 'sarah.kimani', reviewerName: 'Sarah Kimani', status: 'Pending', date: null, comments: '' },
      { reviewer: 'david.ochieng', reviewerName: 'David Ochieng', status: 'Pending', date: null, comments: '' }
    ]
  },
  {
    id: 'PA002',
    initiator: 'mary.wanjiku',
    initiatorName: 'Mary Wanjiku',
    action: 'Update Password Policy',
    description: 'Change minimum password length from 12 to 14 characters',
    dateInitiated: '2024-09-01 08:45:00',
    priority: 'High',
    status: 'Pending Second Approval',
    category: 'Security Configuration',
    details: {
      currentMinLength: '12 characters',
      proposedMinLength: '14 characters',
      reason: 'Enhanced security requirements'
    },
    approvals: [
      { reviewer: 'sarah.kimani', reviewerName: 'Sarah Kimani', status: 'Approved', date: '2024-09-01 09:15:00', comments: 'Policy change approved for enhanced security' },
      { reviewer: 'david.ochieng', reviewerName: 'David Ochieng', status: 'Pending', date: null, comments: '' }
    ]
  },
  {
    id: 'PA003',
    initiator: 'peter.karanja',
    initiatorName: 'Peter Karanja',
    action: 'Bond Issuance Configuration',
    description: 'Configure new 5-year Treasury Bond offering with 8.5% coupon rate',
    dateInitiated: '2024-09-01 07:30:00',
    priority: 'Urgent',
    status: 'Pending First Approval',
    category: 'Bond Management',
    details: {
      bondType: '5-Year Treasury Bond',
      couponRate: '8.5%',
      issueAmount: 'KES 10 Billion',
      maturityDate: '2029-09-01'
    },
    approvals: [
      { reviewer: 'sarah.kimani', reviewerName: 'Sarah Kimani', status: 'Pending', date: null, comments: '' },
      { reviewer: 'grace.njeri', reviewerName: 'Grace Njeri', status: 'Pending', date: null, comments: '' }
    ]
  },
  {
    id: 'PA004',
    initiator: 'system',
    initiatorName: 'System Administrator',
    action: 'Role Permission Update',
    description: 'Grant audit log access to Compliance Officer role',
    dateInitiated: '2024-08-31 16:45:00',
    priority: 'Normal',
    status: 'Rejected',
    category: 'Authorization',
    details: {
      role: 'Compliance Officer',
      newPermission: 'Audit Log Access',
      justification: 'Required for regulatory compliance review'
    },
    approvals: [
      { reviewer: 'sarah.kimani', reviewerName: 'Sarah Kimani', status: 'Rejected', date: '2024-09-01 08:30:00', comments: 'Insufficient justification provided. Please provide detailed compliance requirement documentation.' },
      { reviewer: 'david.ochieng', reviewerName: 'David Ochieng', status: 'Not Required', date: null, comments: '' }
    ]
  }
]

export function MakerChecker() {
  const [selectedApproval, setSelectedApproval] = useState<typeof pendingApprovals[0] | null>(null)
  const [reviewComment, setReviewComment] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')
  const [filterCategory, setFilterCategory] = useState('All')

  const filteredApprovals = pendingApprovals.filter(approval => {
    const matchesStatus = filterStatus === 'All' || approval.status === filterStatus
    const matchesCategory = filterCategory === 'All' || approval.category === filterCategory
    return matchesStatus && matchesCategory
  })

  const handleApprove = (approvalId: string, reviewerIndex: number) => {
    alert(`Approval granted for ${approvalId} by reviewer ${reviewerIndex + 1}`)
    // In real implementation, update the approval status
  }

  const handleReject = (approvalId: string, reviewerIndex: number) => {
    if (!reviewComment.trim()) {
      alert('Please provide a comment explaining the rejection')
      return
    }
    alert(`Approval rejected for ${approvalId} by reviewer ${reviewerIndex + 1}`)
    setReviewComment('')
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending First Approval':
        return <Badge className="bg-[#FAD879] text-[#314BB1]">Pending 1st Approval</Badge>
      case 'Pending Second Approval':
        return <Badge className="bg-[#314BB1] text-white">Pending 2nd Approval</Badge>
      case 'Approved':
        return <Badge className="bg-green-600 text-white">Approved</Badge>
      case 'Rejected':
        return <Badge className="bg-[#7A4A47] text-white">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return <Badge className="bg-red-600 text-white">Urgent</Badge>
      case 'High':
        return <Badge className="bg-orange-500 text-white">High</Badge>
      case 'Normal':
        return <Badge className="bg-[#314BB1] text-white">Normal</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getApprovalStatusIcon = (status: string) => {
    switch (status) {
      case 'Approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-600" />
      case 'Pending':
        return <Clock className="w-4 h-4 text-[#FAD879]" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const categories = ['All', 'User Management', 'Security Configuration', 'Bond Management', 'Authorization']
  const statuses = ['All', 'Pending First Approval', 'Pending Second Approval', 'Approved', 'Rejected']

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-[#314BB1] mb-2">Maker-Checker Workflow</h1>
        <p className="text-[#7A4A47]">Two-person approval system for critical operations</p>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === 'All' ? 'All Statuses' : status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
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

            <Badge variant="secondary" className="bg-[#314BB1]/10 text-[#314BB1]">
              {filteredApprovals.length} items
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Pending Approvals Table */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#314BB1]">
            <CheckSquare className="w-5 h-5" />
            Pending Approvals
          </CardTitle>
          <CardDescription>Actions requiring dual authorization approval</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#314BB1]">Request ID</TableHead>
                  <TableHead className="text-[#314BB1]">Initiator</TableHead>
                  <TableHead className="text-[#314BB1]">Action</TableHead>
                  <TableHead className="text-[#314BB1]">Category</TableHead>
                  <TableHead className="text-[#314BB1]">Priority</TableHead>
                  <TableHead className="text-[#314BB1]">Status</TableHead>
                  <TableHead className="text-[#314BB1]">Date</TableHead>
                  <TableHead className="text-[#314BB1]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApprovals.map((approval) => (
                  <TableRow key={approval.id} className="hover:bg-[#F3F9FD]">
                    <TableCell className="font-mono font-medium text-[#314BB1]">
                      {approval.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="bg-[#314BB1] text-white text-xs">
                            {approval.initiatorName.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{approval.initiatorName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{approval.action}</p>
                        <p className="text-sm text-[#7A4A47]">{approval.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-[#314BB1] text-[#314BB1]">
                        {approval.category}
                      </Badge>
                    </TableCell>
                    <TableCell>{getPriorityBadge(approval.priority)}</TableCell>
                    <TableCell>{getStatusBadge(approval.status)}</TableCell>
                    <TableCell className="text-sm text-[#7A4A47]">
                      {new Date(approval.dateInitiated).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="border-[#314BB1] text-[#314BB1]"
                            onClick={() => setSelectedApproval(approval)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Review
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="text-[#314BB1]">
                              Review Request: {selectedApproval?.id}
                            </DialogTitle>
                            <DialogDescription>
                              {selectedApproval?.action}
                            </DialogDescription>
                          </DialogHeader>
                          
                          {selectedApproval && (
                            <div className="space-y-6">
                              {/* Request Details */}
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-sm font-medium text-[#314BB1]">Initiator</Label>
                                    <p className="text-sm">{selectedApproval.initiatorName}</p>
                                  </div>
                                  <div>
                                    <Label className="text-sm font-medium text-[#314BB1]">Date Initiated</Label>
                                    <p className="text-sm">{new Date(selectedApproval.dateInitiated).toLocaleString()}</p>
                                  </div>
                                </div>
                                
                                <div>
                                  <Label className="text-sm font-medium text-[#314BB1]">Description</Label>
                                  <p className="text-sm text-[#7A4A47] mt-1">{selectedApproval.description}</p>
                                </div>

                                {/* Request Specific Details */}
                                <div>
                                  <Label className="text-sm font-medium text-[#314BB1]">Request Details</Label>
                                  <div className="mt-2 p-3 bg-[#F3F9FD] rounded-lg">
                                    {Object.entries(selectedApproval.details).map(([key, value]) => (
                                      <div key={key} className="flex justify-between text-sm">
                                        <span className="capitalize text-[#7A4A47]">{key.replace(/([A-Z])/g, ' $1')}:</span>
                                        <span className="font-medium">{value}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Approval Timeline */}
                              <div>
                                <Label className="text-sm font-medium text-[#314BB1] mb-3 block">Approval Timeline</Label>
                                <div className="space-y-3">
                                  {selectedApproval.approvals.map((approval, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                      <div className="flex items-center gap-2 min-w-0 flex-1">
                                        <div className="flex-shrink-0">
                                          {getApprovalStatusIcon(approval.status)}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                          <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium">{approval.reviewerName}</span>
                                            <Badge variant="outline" className="text-xs">
                                              Reviewer {index + 1}
                                            </Badge>
                                          </div>
                                          {approval.date && (
                                            <p className="text-xs text-[#7A4A47]">
                                              {new Date(approval.date).toLocaleString()}
                                            </p>
                                          )}
                                          {approval.comments && (
                                            <p className="text-xs text-[#7A4A47] mt-1 italic">
                                              "{approval.comments}"
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      {index < selectedApproval.approvals.length - 1 && (
                                        <ArrowRight className="w-4 h-4 text-[#7A4A47] flex-shrink-0" />
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Review Actions */}
                              {selectedApproval.status.includes('Pending') && (
                                <>
                                  <Separator />
                                  <div className="space-y-4">
                                    <Label className="text-sm font-medium text-[#314BB1]">Review Comments</Label>
                                    <Textarea
                                      placeholder="Add your review comments here..."
                                      value={reviewComment}
                                      onChange={(e) => setReviewComment(e.target.value)}
                                      className="min-h-20"
                                    />
                                    
                                    <div className="flex gap-3">
                                      <Button
                                        onClick={() => handleApprove(selectedApproval.id, 0)}
                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Approve
                                      </Button>
                                      <Button
                                        onClick={() => handleReject(selectedApproval.id, 0)}
                                        className="flex-1 bg-[#7A4A47] hover:bg-[#7A4A47]/90 text-white"
                                      >
                                        <XCircle className="w-4 h-4 mr-2" />
                                        Reject
                                      </Button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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
              <div className="w-10 h-10 bg-[#FAD879]/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#314BB1]" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">Pending</p>
                <p className="text-xl font-semibold text-[#314BB1]">
                  {pendingApprovals.filter(a => a.status.includes('Pending')).length}
                </p>
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
                <p className="text-sm text-[#7A4A47]">Approved</p>
                <p className="text-xl font-semibold text-green-600">
                  {pendingApprovals.filter(a => a.status === 'Approved').length}
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
                <p className="text-sm text-[#7A4A47]">Rejected</p>
                <p className="text-xl font-semibold text-red-600">
                  {pendingApprovals.filter(a => a.status === 'Rejected').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-[#7A4A47]">Urgent</p>
                <p className="text-xl font-semibold text-red-600">
                  {pendingApprovals.filter(a => a.priority === 'Urgent').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}