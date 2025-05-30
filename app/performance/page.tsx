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
  Eye,
  Clock,
  MousePointer,
  Activity,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function PerformancePage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenu, setExpandedMenu] = useState<string | null>("performance")

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
      active: true,
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
      href: "/user-behavior",
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
              <span className="text-white">성과 분석</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">성과 분석</h1>
            <p className="text-slate-400">XR 마케팅 캠페인의 성과를 상세히 분석하세요</p>
          </div>

          {/* Performance Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <Eye className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">1,247</h3>
                <p className="text-slate-400 text-sm font-medium">총 방문자</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full text-green-700 bg-green-50">
                    <span>+23%</span>
                  </div>
                  <span className="text-slate-500 text-xs">지난주 대비</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">4분 32초</h3>
                <p className="text-slate-400 text-sm font-medium">평균 체류시간</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full text-green-700 bg-green-50">
                    <span>+8%</span>
                  </div>
                  <span className="text-slate-500 text-xs">지난주 대비</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                  <MousePointer className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">89.2%</h3>
                <p className="text-slate-400 text-sm font-medium">상호작용률</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full text-green-700 bg-green-50">
                    <span>+12%</span>
                  </div>
                  <span className="text-slate-500 text-xs">지난주 대비</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">76.5%</h3>
                <p className="text-slate-400 text-sm font-medium">완주율</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full text-red-700 bg-red-50">
                    <span>-3%</span>
                  </div>
                  <span className="text-slate-500 text-xs">지난주 대비</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Sections */}
          <div className="space-y-8">
            {/* Visitor Analysis */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">방문자 분석</h2>
              <div className="text-center py-8">
                <Eye className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">방문자 분석 준비 중</h3>
                <p className="text-slate-400 mb-4">
                  상세한 방문자 분석 도구를 개발 중입니다.
                </p>
              </div>
            </div>

            {/* Content Experience Analysis */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">콘텐츠 체험 분석</h2>
              <div className="text-center py-8">
                <Activity className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">콘텐츠 체험 분석 준비 중</h3>
                <p className="text-slate-400 mb-4">
                  XR 콘텐츠 체험 패턴 분석 기능을 개발 중입니다.
                </p>
              </div>
            </div>

            {/* Interaction Analysis */}
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">상호작용 분석</h2>
              <div className="text-center py-8">
                <MousePointer className="mx-auto h-12 w-12 text-slate-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">상호작용 분석 준비 중</h3>
                <p className="text-slate-400 mb-4">
                  사용자 상호작용 패턴 분석 도구를 개발 중입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
