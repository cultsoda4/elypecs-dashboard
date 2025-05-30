"use client"

import { useState } from "react"
import {
  Bell,
  ChevronRight,
  BarChart3,
  Users,
  TrendingUp,
  Settings,
  FileText,
  Menu,
  X,
  LogOut,
  Target,
  Layers,
  Brain,
  MousePointer,
  Clock,
  Navigation,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function UserBehaviorPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null)

  const handleLogout = () => {
    router.push("/")
  }

  const toggleSubmenu = (menuId: string) => {
    setExpandedMenu(expandedMenu === menuId ? null : menuId)
  }

  const menuItems = [
    {
      id: "dashboard",
      title: "대시보드",
      icon: BarChart3,
      href: "/dashboard",
    },
    {
      id: "projects",
      title: "프로젝트 관리",
      icon: Layers,
      href: "/projects",
    },
    {
      id: "performance",
      title: "성과 분석",
      icon: TrendingUp,
      href: "/performance",
      submenu: [
        { id: "visitor-analysis", title: "방문자 분석" },
        { id: "content-experience", title: "콘텐츠 체험 분석" },
        { id: "interaction-analysis", title: "상호작용 분석" },
      ],
    },
    {
      id: "conversion",
      title: "전환 성과",
      icon: Target,
      href: "/conversion",
    },
    {
      id: "user-behavior",
      title: "사용자 행동 인사이트",
      icon: Users,
      active: true,
    },
    {
      id: "reports",
      title: "리포트",
      icon: FileText,
      href: "/reports",
    },
    {
      id: "settings",
      title: "설정",
      icon: Settings,
      href: "/settings",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side - Logo and mobile menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-white tracking-wider">ELYPECS</h1>
              <span className="text-slate-400 text-sm hidden sm:block">XR 마케팅 솔루션</span>
            </div>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-semibold">김</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-white text-sm font-medium">김담당자</p>
                <p className="text-slate-400 text-xs">삼성전자</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-slate-400 hover:text-white transition-colors"
                title="로그아웃"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-70 h-screen pt-16 bg-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <nav className="px-4 py-6 space-y-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.href) {
                    router.push(item.href)
                  } else if (item.submenu) {
                    toggleSubmenu(item.id)
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  item.active
                    ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-300 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </div>
                {item.submenu && (
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      expandedMenu === item.id ? "rotate-90" : ""
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.submenu && expandedMenu === item.id && (
                <div className="mt-2 ml-4 space-y-1">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.id}
                      className="w-full flex items-center px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/30 rounded-lg transition-colors"
                    >
                      <span className="w-2 h-2 bg-slate-600 rounded-full mr-3"></span>
                      {subItem.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Main Content */}
      <main className="lg:ml-70 pt-16">
        <div className="p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex items-center gap-2 text-sm">
              <button
                onClick={() => router.push("/dashboard")}
                className="text-slate-400 hover:text-white transition-colors"
              >
                대시보드
              </button>
              <ChevronRight className="w-4 h-4 text-slate-500" />
              <span className="text-white">사용자 행동 인사이트</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">사용자 행동 인사이트</h1>
            <p className="text-slate-400">XR 경험에서의 사용자 행동 패턴을 분석하고 인사이트를 도출하세요</p>
          </div>

          {/* Behavior Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                  <Brain className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">4.8/5</h3>
                <p className="text-slate-400 text-sm font-medium">평균 몰입도</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full text-green-700 bg-green-50">
                    <span>+0.3</span>
                  </div>
                  <span className="text-slate-500 text-xs">지난주 대비</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <MousePointer className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">87.3%</h3>
                <p className="text-slate-400 text-sm font-medium">상호작용률</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full text-green-700 bg-green-50">
                    <span>+5.2%</span>
                  </div>
                  <span className="text-slate-500 text-xs">지난주 대비</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">6분 12초</h3>
                <p className="text-slate-400 text-sm font-medium">평균 체험시간</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full text-green-700 bg-green-50">
                    <span>+45초</span>
                  </div>
                  <span className="text-slate-500 text-xs">지난주 대비</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
                  <Navigation className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">3.4</h3>
                <p className="text-slate-400 text-sm font-medium">씬 평균 이동 횟수</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full text-green-700 bg-green-50">
                    <span>+0.7</span>
                  </div>
                  <span className="text-slate-500 text-xs">지난주 대비</span>
                </div>
              </div>
            </div>
          </div>

          {/* Behavior Analysis Sections */}
          <div className="space-y-8">
            {/* User Journey Map */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">사용자 여정 지도</h2>
              <div className="text-center py-8">
                <Navigation className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">사용자 여정 분석 준비 중</h3>
                <p className="text-slate-400 mb-4">
                  XR 경험 내에서의 사용자 이동 패턴과 여정을 시각화하는 도구를 개발 중입니다.
                </p>
              </div>
            </div>

            {/* Interaction Heatmap */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">상호작용 히트맵</h2>
              <div className="text-center py-8">
                <MousePointer className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">히트맵 분석 준비 중</h3>
                <p className="text-slate-400 mb-4">
                  사용자가 가장 많이 상호작용하는 영역을 히트맵으로 표시하는 기능을 개발 중입니다.
                </p>
              </div>
            </div>

            {/* Behavior Patterns */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">행동 패턴 분석</h2>
              <div className="text-center py-8">
                <Brain className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">AI 기반 패턴 분석 준비 중</h3>
                <p className="text-slate-400 mb-4">
                  머신러닝을 활용한 사용자 행동 패턴 분석 및 예측 모델을 개발 중입니다.
                </p>
              </div>
            </div>

            {/* Engagement Insights */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">몰입도 인사이트</h2>
              <div className="text-center py-8">
                <Clock className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">몰입도 측정 도구 준비 중</h3>
                <p className="text-slate-400 mb-4">
                  사용자의 XR 경험 몰입도를 실시간으로 측정하고 분석하는 도구를 개발 중입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
