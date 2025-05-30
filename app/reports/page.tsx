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
  Download,
  Calendar,
  Filter,
  Share,
  Eye,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ReportsPage() {
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
      href: "/user-behavior",
    },
    {
      id: "reports",
      title: "리포트",
      icon: FileText,
      active: true,
    },
    {
      id: "settings",
      title: "설정",
      icon: Settings,
      href: "/settings",
    },
  ]

  const reportTemplates = [
    {
      id: 1,
      title: "일일 성과 리포트",
      description: "일일 방문자, 전환율, 주요 지표 요약",
      type: "daily",
      frequency: "매일 자동 생성",
      lastGenerated: "2024-01-15 09:00",
      status: "active"
    },
    {
      id: 2,
      title: "주간 마케팅 리포트",
      description: "주간 마케팅 성과 및 트렌드 분석",
      type: "weekly",
      frequency: "매주 월요일",
      lastGenerated: "2024-01-15 10:00",
      status: "active"
    },
    {
      id: 3,
      title: "월간 종합 리포트",
      description: "월간 종합 성과 분석 및 인사이트",
      type: "monthly",
      frequency: "매월 1일",
      lastGenerated: "2024-01-01 09:00",
      status: "active"
    },
    {
      id: 4,
      title: "프로젝트별 성과 리포트",
      description: "개별 프로젝트 성과 및 ROI 분석",
      type: "project",
      frequency: "수동 생성",
      lastGenerated: "2024-01-10 14:30",
      status: "draft"
    }
  ]

  const recentReports = [
    {
      id: 1,
      title: "2024년 1월 2주차 성과 리포트",
      type: "주간 리포트",
      generatedAt: "2024-01-15 09:00",
      size: "2.3MB",
      format: "PDF"
    },
    {
      id: 2,
      title: "삼성전자 갤럭시 체험관 월간 리포트",
      type: "프로젝트 리포트",
      generatedAt: "2024-01-10 14:30",
      size: "4.1MB",
      format: "PDF"
    },
    {
      id: 3,
      title: "2024년 1월 1주차 성과 리포트",
      type: "주간 리포트",
      generatedAt: "2024-01-08 09:00",
      size: "2.1MB",
      format: "PDF"
    },
    {
      id: 4,
      title: "2024년 12월 종합 성과 리포트",
      type: "월간 리포트",
      generatedAt: "2024-01-01 09:00",
      size: "8.7MB",
      format: "PDF"
    }
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
              <span className="text-white">리포트</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">리포트</h1>
              <p className="text-slate-400">XR 마케팅 성과 리포트를 생성하고 관리하세요</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors">
                <Filter className="w-4 h-4" />
                필터
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
                새 리포트 생성
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span className="text-slate-400 text-sm">생성된 리포트</span>
              </div>
              <p className="text-2xl font-bold text-white">24</p>
              <p className="text-xs text-slate-500">이번 달</p>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Download className="w-5 h-5 text-green-400" />
                <span className="text-slate-400 text-sm">다운로드</span>
              </div>
              <p className="text-2xl font-bold text-white">157</p>
              <p className="text-xs text-slate-500">이번 달</p>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="w-5 h-5 text-purple-400" />
                <span className="text-slate-400 text-sm">자동 생성</span>
              </div>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-xs text-slate-500">활성 스케줄</p>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Share className="w-5 h-5 text-orange-400" />
                <span className="text-slate-400 text-sm">공유</span>
              </div>
              <p className="text-2xl font-bold text-white">89</p>
              <p className="text-xs text-slate-500">이번 달</p>
            </div>
          </div>

          {/* Report Templates */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">리포트 템플릿</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reportTemplates.map((template) => (
                <div key={template.id} className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{template.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{template.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      template.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {template.status === 'active' ? '활성' : '초안'}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>{template.frequency}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Clock className="w-4 h-4" />
                      <span>마지막 생성: {template.lastGenerated}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                      <Download className="w-3 h-3" />
                      생성
                    </button>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-700 text-slate-300 text-sm rounded-lg hover:bg-slate-600 transition-colors">
                      <Eye className="w-3 h-3" />
                      미리보기
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">최근 생성된 리포트</h2>
              <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                모두 보기
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">리포트명</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">유형</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">생성일시</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">크기</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">액션</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReports.map((report) => (
                    <tr key={report.id} className="border-b border-slate-700/30">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <FileText className="w-4 h-4 text-blue-400" />
                          <div>
                            <p className="text-white font-medium">{report.title}</p>
                            <p className="text-slate-400 text-xs">{report.format}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{report.type}</td>
                      <td className="py-3 px-4 text-slate-300">{report.generatedAt}</td>
                      <td className="py-3 px-4 text-slate-300">{report.size}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-slate-400 hover:text-blue-400 transition-colors" title="다운로드">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-green-400 transition-colors" title="공유">
                            <Share className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-white transition-colors" title="미리보기">
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
