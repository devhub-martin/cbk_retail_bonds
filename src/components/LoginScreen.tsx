import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Badge } from './ui/badge'
import { Alert, AlertDescription } from './ui/alert'
import { 
  Shield, 
  Smartphone, 
  Mail, 
  Key, 
  Fingerprint, 
  Info,
  Building2,
  Eye,
  EyeOff
} from 'lucide-react'

interface LoginScreenProps {
  onLogin: () => void
}

export function LoginScreen({ onLogin }: LoginScreenProps) {
  const [step, setStep] = useState<'credentials' | 'mfa-method' | 'mfa-verify'>('credentials')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [mfaMethod, setMfaMethod] = useState('')
  const [otpCode, setOtpCode] = useState('')
  const [showMfaModal, setShowMfaModal] = useState(false)

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username && password) {
      setShowMfaModal(true)
      setStep('mfa-method')
    }
  }

  const handleMfaMethodSelect = () => {
    if (mfaMethod) {
      setStep('mfa-verify')
    }
  }

  const handleMfaVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (otpCode.length === 6) {
      setShowMfaModal(false)
      onLogin()
    }
  }

  const getMfaMethodInfo = () => {
    switch (mfaMethod) {
      case 'sms':
        return { icon: Smartphone, text: 'SMS to +254 7XX XXX 123', placeholder: 'Enter SMS code' }
      case 'email':
        return { icon: Mail, text: 'Email to admin@******.com', placeholder: 'Enter email code' }
      case 'app':
        return { icon: Key, text: 'Authenticator App', placeholder: 'Enter app code' }
      case 'biometric':
        return { icon: Fingerprint, text: 'Biometric Verification', placeholder: 'Place finger on scanner' }
      default:
        return { icon: Shield, text: '', placeholder: '' }
    }
  }

  return (
    <div className="min-h-screen bg-[#F3F9FD] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* CBK Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#314BB1] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-semibold text-[#314BB1] mb-2">Central Bank of Kenya</h1>
          <p className="text-[#7A4A47]">Retail Bond System Portal</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-[#314BB1] text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Secure Login
            </CardTitle>
            <CardDescription className="text-white/80">
              Multi-factor authentication required for access
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Alert className="border-[#FAD879] bg-[#FAD879]/10">
                <Info className="w-4 h-4 text-[#314BB1]" />
                <AlertDescription className="text-[#314BB1]">
                  Multi-factor authentication is required for security and non-repudiation compliance.
                </AlertDescription>
              </Alert>

              <Button 
                type="submit" 
                className="w-full bg-[#FAD879] hover:bg-[#FAD879]/90 text-[#314BB1]"
              >
                Continue to MFA
              </Button>
            </form>

            <div className="mt-6 text-center">
              <a href="#" className="text-sm text-[#314BB1] hover:underline">
                Reset password
              </a>
            </div>
          </CardContent>
        </Card>

        {/* MFA Modal */}
        <Dialog open={showMfaModal} onOpenChange={setShowMfaModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[#314BB1]" />
                Multi-Factor Authentication
              </DialogTitle>
              <DialogDescription>
                Complete the second factor to secure your session
              </DialogDescription>
            </DialogHeader>

            {step === 'mfa-method' && (
              <div className="space-y-4">
                <Label>Select authentication method:</Label>
                <Select value={mfaMethod} onValueChange={setMfaMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose MFA method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sms">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4" />
                        SMS Authentication
                      </div>
                    </SelectItem>
                    <SelectItem value="email">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Authentication
                      </div>
                    </SelectItem>
                    <SelectItem value="app">
                      <div className="flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        Authenticator App
                      </div>
                    </SelectItem>
                    <SelectItem value="biometric">
                      <div className="flex items-center gap-2">
                        <Fingerprint className="w-4 h-4" />
                        Biometric Verification
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <Button 
                  onClick={handleMfaMethodSelect}
                  disabled={!mfaMethod}
                  className="w-full bg-[#FAD879] hover:bg-[#FAD879]/90 text-[#314BB1]"
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 'mfa-verify' && (
              <form onSubmit={handleMfaVerify} className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 p-3 bg-[#F3F9FD] rounded-lg">
                    {(() => {
                      const { icon: Icon, text } = getMfaMethodInfo()
                      return (
                        <>
                          <Icon className="w-5 h-5 text-[#314BB1]" />
                          <span className="text-sm text-[#314BB1]">{text}</span>
                        </>
                      )
                    })()}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit code"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.slice(0, 6))}
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                    pattern="[0-9]{6}"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Badge variant="outline" className="text-xs">
                    Step 2 of 2
                  </Badge>
                  <Badge variant="secondary" className="text-xs bg-[#FAD879]/20 text-[#314BB1]">
                    Code expires in 2:45
                  </Badge>
                </div>

                <Button 
                  type="submit"
                  disabled={otpCode.length !== 6}
                  className="w-full bg-[#314BB1] hover:bg-[#314BB1]/90 text-white"
                >
                  Verify & Login
                </Button>

                <Button 
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => setStep('mfa-method')}
                >
                  Change method
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}