"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Mail, Lock, Building2, Phone, AlertCircle, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()

  // Form state
  const [email, setEmail] = useState("")
  const [verificationSent, setVerificationSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [verificationConfirmed, setVerificationConfirmed] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [jobRole, setJobRole] = useState("")

  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Focus states for floating labels
  const [focusedField, setFocusedField] = useState<string | null>(null)

  // Password strength checker
  useEffect(() => {
    if (!password) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    if (password.length >= 8) strength += 1
    if (/[A-Z]/.test(password)) strength += 1
    if (/[0-9]/.test(password)) strength += 1
    if (/[^A-Za-z0-9]/.test(password)) strength += 1

    setPasswordStrength(strength)
  }, [password])

  // Form validation - simplified for development
  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!email) errors.email = "이메일을 입력해주세요"
    if (!password) errors.password = "비밀번호를 입력해주세요"
    if (!confirmPassword) errors.confirmPassword = "비밀번호를 다시 입력해주세요"
    if (password !== confirmPassword) errors.confirmPassword = "비밀번호가 일치하지 않습니다"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Format phone number as user types
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "")

    if (value.length <= 3) {
      setPhoneNumber(value)
    } else if (value.length <= 7) {
      setPhoneNumber(`${value.slice(0, 3)}-${value.slice(3)}`)
    } else if (value.length <= 11) {
      setPhoneNumber(`${value.slice(0, 3)}-${value.slice(3, 7)}-${value.slice(7)}`)
    }
  }

  // Send verification code - simplified for development
  const handleSendVerification = (e: React.MouseEvent) => {
    e.preventDefault()

    if (!email) {
      setFormErrors({ ...formErrors, email: "이메일을 입력해주세요" })
      return
    }

    // For development: auto-verify any email
    setVerificationSent(true)
    setVerificationCode("123456") // Pre-fill the code for development
    setFormErrors({ ...formErrors, email: "" })
  }

  // Verify code - simplified for development
  const handleVerifyCode = (e: React.MouseEvent) => {
    e.preventDefault()

    // For development: accept any 6-digit code
    if (verificationCode.length === 6) {
      setVerificationConfirmed(true)
      setFormErrors({ ...formErrors, verification: "" })
    } else {
      setFormErrors({ ...formErrors, verification: "6자리 인증번호를 입력해주세요" })
    }
  }

  // Form submission - simplified for development
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!email || !password || password !== confirmPassword) {
      validateForm()
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", {
        email,
        password,
        phoneNumber,
        companyName,
        jobRole,
      })
      setIsSubmitting(false)
      // Redirect to login page
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#1e3a8a] to-[#1e40af] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Signup Card */}
      <div className="relative w-full max-w-2xl my-8">
        <div className="backdrop-blur-xl bg-white/5 border border-blue-400/20 rounded-2xl p-8 shadow-2xl">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-wider">ELYPECS</h1>
            <p className="text-blue-200 text-sm font-medium">XR 마케팅 솔루션</p>
            <h2 className="text-xl font-semibold text-white mt-4">회원가입</h2>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field with Verification */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    disabled={verificationConfirmed}
                    className={`w-full px-4 py-3 pl-12 bg-white/5 border ${
                      formErrors.email ? "border-red-400" : "border-blue-400/30"
                    } rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed`}
                    placeholder="이메일"
                  />
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
                  <label
                    htmlFor="email"
                    className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === "email" || email
                        ? "top-2 text-xs text-blue-300"
                        : "top-1/2 transform -translate-y-1/2 text-blue-200"
                    }`}
                  >
                    이메일 <span className="text-red-400">*</span>
                  </label>
                </div>
                <button
                  onClick={handleSendVerification}
                  disabled={verificationConfirmed || !email}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    verificationSent && !verificationConfirmed
                      ? "bg-yellow-500 text-black hover:bg-yellow-600"
                      : verificationConfirmed
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {verificationConfirmed ? "인증완료" : verificationSent ? "재전송" : "인증하기"}
                </button>
              </div>
              {formErrors.email && (
                <p className="text-red-400 text-xs flex items-center gap-1 pl-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.email}
                </p>
              )}
            </div>

            {/* Verification Code */}
            {verificationSent && !verificationConfirmed && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      id="verificationCode"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/[^\d]/g, "").slice(0, 6))}
                      onFocus={() => setFocusedField("verificationCode")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-white/5 border ${
                        formErrors.verification ? "border-red-400" : "border-blue-400/30"
                      } rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300`}
                      placeholder="인증번호"
                      maxLength={6}
                    />
                    <label
                      htmlFor="verificationCode"
                      className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                        focusedField === "verificationCode" || verificationCode
                          ? "top-2 text-xs text-blue-300"
                          : "top-1/2 transform -translate-y-1/2 text-blue-200"
                      }`}
                    >
                      인증번호 (6자리) <span className="text-red-400">*</span>
                    </label>
                  </div>
                  <button
                    onClick={handleVerifyCode}
                    disabled={verificationCode.length !== 6}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    확인
                  </button>
                </div>
                {formErrors.verification ? (
                  <p className="text-red-400 text-xs flex items-center gap-1 pl-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.verification}
                  </p>
                ) : (
                  <p className="text-blue-300 text-xs pl-1">
                    이메일로 전송된 6자리 인증번호를 입력해주세요. (테스트: 123456)
                  </p>
                )}
              </div>
            )}

            {/* Password Fields - Side by side on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 pl-12 pr-12 bg-white/5 border ${
                      formErrors.password ? "border-red-400" : "border-blue-400/30"
                    } rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300`}
                    placeholder="비밀번호"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <label
                    htmlFor="password"
                    className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === "password" || password
                        ? "top-2 text-xs text-blue-300"
                        : "top-1/2 transform -translate-y-1/2 text-blue-200"
                    }`}
                  >
                    비밀번호 <span className="text-red-400">*</span>
                  </label>
                </div>
                {formErrors.password ? (
                  <p className="text-red-400 text-xs flex items-center gap-1 pl-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.password}
                  </p>
                ) : (
                  password && (
                    <div className="pl-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              passwordStrength === 0
                                ? "bg-red-500"
                                : passwordStrength === 1
                                  ? "bg-orange-500"
                                  : passwordStrength === 2
                                    ? "bg-yellow-500"
                                    : passwordStrength === 3
                                      ? "bg-blue-500"
                                      : "bg-green-500"
                            }`}
                            style={{ width: `${passwordStrength * 25}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-blue-300">
                          {passwordStrength === 0
                            ? "매우 약함"
                            : passwordStrength === 1
                              ? "약함"
                              : passwordStrength === 2
                                ? "보통"
                                : passwordStrength === 3
                                  ? "강함"
                                  : "매우 강함"}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full px-4 py-3 pl-12 pr-12 bg-white/5 border ${
                      formErrors.confirmPassword ? "border-red-400" : "border-blue-400/30"
                    } rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300`}
                    placeholder="비밀번호 확인"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <label
                    htmlFor="confirmPassword"
                    className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                      focusedField === "confirmPassword" || confirmPassword
                        ? "top-2 text-xs text-blue-300"
                        : "top-1/2 transform -translate-y-1/2 text-blue-200"
                    }`}
                  >
                    비밀번호 확인 <span className="text-red-400">*</span>
                  </label>
                </div>
                {formErrors.confirmPassword && (
                  <p className="text-red-400 text-xs flex items-center gap-1 pl-1">
                    <AlertCircle className="w-3 h-3" /> {formErrors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  onFocus={() => setFocusedField("phoneNumber")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 pl-12 bg-white/5 border ${
                    formErrors.phoneNumber ? "border-red-400" : "border-blue-400/30"
                  } rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300`}
                  placeholder="전화번호"
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
                <label
                  htmlFor="phoneNumber"
                  className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                    focusedField === "phoneNumber" || phoneNumber
                      ? "top-2 text-xs text-blue-300"
                      : "top-1/2 transform -translate-y-1/2 text-blue-200"
                  }`}
                >
                  전화번호
                </label>
              </div>
              {formErrors.phoneNumber ? (
                <p className="text-red-400 text-xs flex items-center gap-1 pl-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.phoneNumber}
                </p>
              ) : (
                <p className="text-blue-300 text-xs pl-1">010-0000-0000 형식으로 입력해주세요</p>
              )}
            </div>

            {/* Company Name */}
            <div className="space-y-2">
              <div className="relative">
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  onFocus={() => setFocusedField("companyName")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 pl-12 bg-white/5 border ${
                    formErrors.companyName ? "border-red-400" : "border-blue-400/30"
                  } rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300`}
                  placeholder="회사명"
                />
                <Building2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
                <label
                  htmlFor="companyName"
                  className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                    focusedField === "companyName" || companyName
                      ? "top-2 text-xs text-blue-300"
                      : "top-1/2 transform -translate-y-1/2 text-blue-200"
                  }`}
                >
                  회사명
                </label>
              </div>
              {formErrors.companyName && (
                <p className="text-red-400 text-xs flex items-center gap-1 pl-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.companyName}
                </p>
              )}
            </div>

            {/* Job Role */}
            <div className="space-y-2">
              <div className="relative">
                <select
                  id="jobRole"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  onFocus={() => setFocusedField("jobRole")}
                  onBlur={() => setFocusedField(null)}
                  className={`w-full px-4 py-3 pl-12 pr-10 bg-white/5 border ${
                    formErrors.jobRole ? "border-red-400" : "border-blue-400/30"
                  } rounded-lg text-white appearance-none focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300`}
                >
                  <option value="" disabled hidden></option>
                  <option value="Marketing" className="bg-gray-800">
                    마케팅
                  </option>
                  <option value="Sales" className="bg-gray-800">
                    영업
                  </option>
                  <option value="Planning" className="bg-gray-800">
                    기획
                  </option>
                  <option value="Design" className="bg-gray-800">
                    디자인
                  </option>
                  <option value="Development" className="bg-gray-800">
                    개발
                  </option>
                  <option value="Management" className="bg-gray-800">
                    경영
                  </option>
                  <option value="Other" className="bg-gray-800">
                    기타
                  </option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300 pointer-events-none" />
                <label
                  htmlFor="jobRole"
                  className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                    focusedField === "jobRole" || jobRole
                      ? "top-2 text-xs text-blue-300"
                      : "top-1/2 transform -translate-y-1/2 text-blue-200"
                  }`}
                >
                  직무
                </label>
              </div>
              {formErrors.jobRole && (
                <p className="text-red-400 text-xs flex items-center gap-1 pl-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.jobRole}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  처리 중...
                </span>
              ) : (
                "회원가입"
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-blue-200 text-sm">
              이미 계정이 있으신가요?{" "}
              <Link href="/" className="text-blue-300 hover:text-blue-200 font-semibold transition-colors">
                로그인
              </Link>
            </p>
          </div>

          {/* Developer Note */}
          <div className="mt-6 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
            <p className="text-blue-200 text-xs">
              <strong>개발자 참고사항:</strong> 이 데모에서는 이메일 인증 코드로 "123456"을 사용하고, 필수 항목만
              입력하면 회원가입이 가능합니다. 회원가입 후 로그인 페이지로 이동합니다.
            </p>
          </div>
        </div>

        {/* Additional glow effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-2xl blur-xl transform scale-105"></div>
      </div>
    </div>
  )
}
