import { useState } from 'react';
import { Card, CardHeader, CardContent } from '../Common/card';
import { Input} from '../Common/input'

import { Button } from '../Common/button';
import { AlertCircle, Loader2, CheckCircle2, Phone } from 'lucide-react';

type FormData = {
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

type Errors = {
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  otp?: string;
  submit?: string;
};

const SignupForm = () => {
  const [step, setStep] = useState(1); // 1: Initial signup, 2: OTP verification
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    otp: ''
  });

  const [errors, setErrors] = useState<Errors>({});

  const validateSignupData = () => {
    const newErrors: Errors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateOTP = () => {
    const newErrors: Errors = {};

    if (!formData.otp) {
      newErrors.otp = 'Please enter the OTP';
    } else if (formData.otp.length !== 6) {
      newErrors.otp = 'OTP must be 6 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (validateSignupData()) {
      setLoading(true);
      try {
        // Simulate API call to send OTP
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setOtpSent(true);
        setStep(2);
      } catch (error) {
        setErrors({ submit: 'Failed to send OTP. Please try again.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerifyOTP = async () => {
    if (validateOTP()) {
      setLoading(true);
      try {
        // Simulate API call to verify OTP
        await new Promise((resolve) => setTimeout(resolve, 1500));
        // Redirect to home page on success
        window.location.href = '/home';
      } catch (error) {
        setErrors({ otp: 'Invalid OTP code' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof Errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      // Simulate API call to resend OTP
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setOtpSent(true);
    } catch (error) {
      setErrors({ submit: 'Failed to resend OTP. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center">Create Account</h1>
          <p className="text-gray-600 text-center">
            {step === 1 ? 'Please fill in your details to sign up' : 'Enter the OTP sent to your phone'}
          </p>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="email">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="phone">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'border-red-500' : ''}
                  placeholder="Enter 10-digit phone number"
                />
                {errors.phone && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="password">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'border-red-500' : ''}
                  placeholder="Create a strong password"
                />
                {errors.password && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.password}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <Button
                type="button"
                className="w-full"
                onClick={handleSendOTP}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              {otpSent && (
                <div className="flex items-center justify-center text-green-600 mb-4">
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  <p>OTP sent to {formData.phone}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="otp">
                  Enter OTP
                </label>
                <Input
                  id="otp"
                  name="otp"
                  type="text"
                  value={formData.otp}
                  onChange={handleChange}
                  className={errors.otp ? 'border-red-500' : ''}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                />
                {errors.otp && (
                  <div className="flex items-center text-red-500 text-sm mt-1">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.otp}
                  </div>
                )}
              </div>

              <Button
                type="button"
                className="w-full"
                onClick={handleVerifyOTP}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Continue'
                )}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Didn't receive OTP? Click to resend
                </button>
              </div>

              <div className="text-center text-sm text-gray-500">
                <Phone className="inline mr-1 h-4 w-4" />
                OTP sent to: {formData.phone}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupForm;