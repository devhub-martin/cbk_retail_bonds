import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Checkbox } from './ui/checkbox'
import { Switch } from './ui/switch'
import { Slider } from './ui/slider'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'
import { Alert, AlertDescription } from './ui/alert'
import { 
  Settings, 
  Shield, 
  Clock, 
  Eye, 
  Save,
  RotateCcw,
  HelpCircle,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'

export function PasswordSettings() {
  const [passwordLength, setPasswordLength] = useState([12])
  const [requireUppercase, setRequireUppercase] = useState(true)
  const [requireNumbers, setRequireNumbers] = useState(true)
  const [requireSymbols, setRequireSymbols] = useState(true)
  const [passwordHistory, setPasswordHistory] = useState('10')
  const [passwordExpiry, setPasswordExpiry] = useState('90')
  const [allowSelfReset, setAllowSelfReset] = useState(true)
  const [sessionTimeout, setSessionTimeout] = useState([30])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const handleSave = () => {
    setHasUnsavedChanges(false)
    // Simulate save action
    setTimeout(() => {
      alert('Settings saved successfully!')
    }, 500)
  }

  const handleReset = () => {
    setPasswordLength([12])
    setRequireUppercase(true)
    setRequireNumbers(true)
    setRequireSymbols(true)
    setPasswordHistory('10')
    setPasswordExpiry('90')
    setAllowSelfReset(true)
    setSessionTimeout([30])
    setHasUnsavedChanges(false)
  }

  const previewPolicy = () => {
    const rules = []
    rules.push(`Minimum ${passwordLength[0]} characters`)
    if (requireUppercase) rules.push('Uppercase letters required')
    if (requireNumbers) rules.push('Numbers required')
    if (requireSymbols) rules.push('Special characters required')
    rules.push(`Remember last ${passwordHistory} passwords`)
    rules.push(`Expires every ${passwordExpiry} days`)
    if (allowSelfReset) rules.push('Self-reset enabled')
    rules.push(`Session timeout: ${sessionTimeout[0]} minutes`)
    return rules
  }

  return (
    <TooltipProvider>
      <div className="p-6 space-y-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#314BB1] mb-2">Password & Session Configuration</h1>
            <p className="text-[#7A4A47]">Configure security policies and session management settings</p>
          </div>
          {hasUnsavedChanges && (
            <Badge variant="secondary" className="bg-[#FAD879] text-[#314BB1]">
              <AlertTriangle className="w-3 h-3 mr-1" />
              Unsaved changes
            </Badge>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Password Policy Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#314BB1]">
                  <Shield className="w-5 h-5" />
                  Password Policy
                </CardTitle>
                <CardDescription>Configure password complexity requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Length */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-[#314BB1]">Minimum Password Length</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-[#7A4A47]" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Minimum number of characters required for passwords</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={passwordLength}
                      onValueChange={(value) => {
                        setPasswordLength(value)
                        setHasUnsavedChanges(true)
                      }}
                      min={8}
                      max={64}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[#7A4A47]">
                      <span>8 characters</span>
                      <Badge variant="outline">{passwordLength[0]} characters</Badge>
                      <span>64 characters</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Complexity Requirements */}
                <div className="space-y-4">
                  <Label className="text-[#314BB1]">Complexity Requirements</Label>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="uppercase"
                        checked={requireUppercase}
                        onCheckedChange={(checked) => {
                          setRequireUppercase(checked as boolean)
                          setHasUnsavedChanges(true)
                        }}
                      />
                      <Label htmlFor="uppercase" className="text-sm">Require uppercase letters (A-Z)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="numbers"
                        checked={requireNumbers}
                        onCheckedChange={(checked) => {
                          setRequireNumbers(checked as boolean)
                          setHasUnsavedChanges(true)
                        }}
                      />
                      <Label htmlFor="numbers" className="text-sm">Require numbers (0-9)</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="symbols"
                        checked={requireSymbols}
                        onCheckedChange={(checked) => {
                          setRequireSymbols(checked as boolean)
                          setHasUnsavedChanges(true)
                        }}
                      />
                      <Label htmlFor="symbols" className="text-sm">Require special characters (!@#$%^&*)</Label>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Password History and Expiry */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="history" className="text-[#314BB1]">Password History</Label>
                    <Input
                      id="history"
                      type="number"
                      value={passwordHistory}
                      onChange={(e) => {
                        setPasswordHistory(e.target.value)
                        setHasUnsavedChanges(true)
                      }}
                      className="w-full"
                    />
                    <p className="text-xs text-[#7A4A47]">Previous passwords to remember</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="expiry" className="text-[#314BB1]">Password Expiry (days)</Label>
                    <Input
                      id="expiry"
                      type="number"
                      value={passwordExpiry}
                      onChange={(e) => {
                        setPasswordExpiry(e.target.value)
                        setHasUnsavedChanges(true)
                      }}
                      className="w-full"
                    />
                    <p className="text-xs text-[#7A4A47]">Days until password expires</p>
                  </div>
                </div>

                <Separator />

                {/* Self-Reset Option */}
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-[#314BB1]">Allow Self-Reset</Label>
                    <p className="text-sm text-[#7A4A47]">Enable users to reset their own passwords</p>
                  </div>
                  <Switch
                    checked={allowSelfReset}
                    onCheckedChange={(checked) => {
                      setAllowSelfReset(checked)
                      setHasUnsavedChanges(true)
                    }}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Session Management */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#314BB1]">
                  <Clock className="w-5 h-5" />
                  Session Management
                </CardTitle>
                <CardDescription>Configure session timeout and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-[#314BB1]">Idle Session Timeout</Label>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="w-4 h-4 text-[#7A4A47]" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Minutes of inactivity before automatic logout</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="space-y-2">
                    <Slider
                      value={sessionTimeout}
                      onValueChange={(value) => {
                        setSessionTimeout(value)
                        setHasUnsavedChanges(true)
                      }}
                      min={5}
                      max={240}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-[#7A4A47]">
                      <span>5 minutes</span>
                      <Badge variant="outline">{sessionTimeout[0]} minutes</Badge>
                      <span>240 minutes</span>
                    </div>
                  </div>
                </div>

                <Alert className="border-[#314BB1]/20 bg-[#314BB1]/5">
                  <Shield className="w-4 h-4 text-[#314BB1]" />
                  <AlertDescription className="text-[#314BB1]">
                    Shorter timeouts increase security but may impact user experience. Recommended: 30 minutes for administrative users.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#314BB1]">
                  <Eye className="w-5 h-5" />
                  Policy Preview
                </CardTitle>
                <CardDescription>Current security policy summary</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {previewPolicy().map((rule, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-[#314BB1]">{rule}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <Button 
                  onClick={handleSave}
                  className="w-full bg-[#FAD879] hover:bg-[#FAD879]/90 text-[#314BB1]"
                  disabled={!hasUnsavedChanges}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
                
                <Button 
                  onClick={handleReset}
                  variant="outline" 
                  className="w-full border-[#7A4A47] text-[#7A4A47] hover:bg-[#7A4A47] hover:text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset to Defaults
                </Button>
              </CardContent>
            </Card>

            {/* Compliance Note */}
            <Alert className="border-[#FAD879] bg-[#FAD879]/10">
              <Settings className="w-4 h-4 text-[#314BB1]" />
              <AlertDescription className="text-[#314BB1]">
                These settings ensure compliance with CBK security requirements and industry best practices.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}