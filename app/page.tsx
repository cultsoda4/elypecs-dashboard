"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff, Mail, Lock, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailFocused, setEmailFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simple validation - just check if fields are not empty
    if (!email.trim()) {
      setError("이메일을 입력해주세요")
      setIsLoading(false)
      return
    }

    if (!password.trim()) {
      setError("비밀번호를 입력해주세요")
      setIsLoading(false)
      return
    }

    // For development: accept any email/password combination
    setTimeout(() => {
      console.log("Login successful with:", { email, password })
      setIsLoading(false)
      // Redirect to dashboard
      router.push("/dashboard")
    }, 1000)
  }

  const handleKakaoLogin = () => {
    setIsLoading(true)
    // Simulate Kakao login - for development, just redirect after a delay
    setTimeout(() => {
      console.log("Kakao login successful")
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#1e3a8a] to-[#1e40af] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/5 border border-blue-400/20 rounded-2xl p-8 shadow-2xl">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-wider">ELYPECS</h1>
            <p className="text-blue-200 text-sm font-medium">XR 마케팅 솔루션</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className="w-full px-4 py-3 pl-12 bg-white/5 border border-blue-400/30 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
                placeholder="이메일"
              />
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-300" />
              <label
                htmlFor="email"
                className={`absolute left-12 transition-all duration-300 pointer-events-none ${
                  emailFocused || email
                    ? "top-2 text-xs text-blue-300"
                    : "top-1/2 transform -translate-y-1/2 text-blue-200"
                }`}
              >
                이메일
              </label>
            </div>

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className="w-full px-4 py-3 pl-12 pr-12 bg-white/5 border border-blue-400/30 rounded-lg text-white placeholder-transparent focus:outline-none focus:border-blue-400 focus:bg-white/10 transition-all duration-300"
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
                  passwordFocused || password
                    ? "top-2 text-xs text-blue-300"
                    : "top-1/2 transform -translate-y-1/2 text-blue-200"
                }`}
              >
                비밀번호
              </label>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-blue-300 hover:text-blue-200 transition-colors">
                비밀번호를 잊으셨나요?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
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
                  로그인 중...
                </span>
              ) : (
                "로그인"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-blue-400/30"></div>
            <span className="px-4 text-blue-200 text-sm">OR</span>
            <div className="flex-1 border-t border-blue-400/30"></div>
          </div>

          {/* Kakao Login */}
          <button
            onClick={handleKakaoLogin}
            disabled={isLoading}
            className="w-full py-3 bg-[#fee500] text-black font-semibold rounded-lg hover:bg-[#fdd835] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent transform hover:scale-[1.02] transition-all duration-200 shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <MessageCircle className="w-5 h-5" />
            카카오톡으로 로그인
          </button>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-blue-200 text-sm">
              계정이 없으신가요?{" "}
              <Link href="/signup" className="text-blue-300 hover:text-blue-200 font-semibold transition-colors">
                회원가입
              </Link>
            </p>
          </div>

          {/* Developer Note */}
          <div className="mt-6 p-3 bg-blue-900/30 border border-blue-500/30 rounded-lg">
            <p className="text-blue-200 text-xs">
              <strong>개발자 참고사항:</strong> 이 데모에서는 이메일과 비밀번호에 아무 값이나 입력하면 로그인이
              가능합니다. 빈 값만 아니면 대시보드로 이동합니다.
            </p>
          </div>
        </div>

        {/* Additional glow effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-600/20 to-blue-500/20 rounded-2xl blur-xl transform scale-105"></div>
      </div>
    </div>
  )
}
