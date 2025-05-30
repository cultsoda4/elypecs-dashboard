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
  TrendingDown,
  Zap,
  ArrowRight,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ConversionPage() {
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
      active: true,
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
              <span className="text-white">전환 성과</span>
            </nav>
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">전환 성과</h1>
            <p className="text-slate-400">XR 마케팅 캠페인의 전환 성과를 추적하고 최적화하세요</p>
          </div>

          {/* Conversion Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-green-50 text-green-600">
                  <Target className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">12.8%</h3>
                <p className="text-slate-400 text-sm font-medium">전체 전환율</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full text-red-700 bg-red-50">
                    <span>-2%</span>
                  </div>
                  <span className="text-slate-500 text-xs">지난주 대비</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">159</h3>
                <p className="text-slate-400 text-sm font-medium">총 전환 수</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full text-green-700 bg-green-50">
                    <span>+18</span>
                  </div>
                  <span className="text-slate-500 text-xs">지난주 대비</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">₩2,450</h3>
                <p className="text-slate-400 text-sm font-medium">전환당 비용</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full text-red-700 bg-red-50">
                    <span>+₩150</span>
                  </div>
                  <span className="text-slate-500 text-xs">지난주 대비</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
                  <TrendingDown className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">7.2%</h3>
                <p className="text-slate-400 text-sm font-medium">이탈률</p>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-sm px-2 py-1 rounded-full text-green-700 bg-green-50">
                    <span>-1.3%</span>
                  </div>
                  <span className="text-slate-500 text-xs">지난주 대비</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Funnel */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">전환 퍼널</h2>
            <div className="space-y-4">
              {[
                { step: "콘텐츠 진입", count: 1247, rate: 100, color: "bg-blue-500" },
                { step: "씬 체험", count: 1122, rate: 90, color: "bg-green-500" },
                { step: "마커 상호작용", count: 748, rate: 60, color: "bg-yellow-500" },
                { step: "CTA 클릭", count: 374, rate: 30, color: "bg-orange-500" },
                { step: "최종 전환", count: 159, rate: 12.8, color: "bg-red-500" },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-24 text-slate-300 text-sm">{item.step}</div>
                  <div className="flex-1 bg-slate-800 rounded-full h-8 relative overflow-hidden">
                    <div
                      className={`${item.color} h-full transition-all duration-1000 flex items-center justify-end pr-4`}
                      style={{ width: `${item.rate}%` }}
                    >
                      <span className="text-white text-sm font-medium">{item.count}</span>
                    </div>
                  </div>
                  <div className="w-16 text-slate-400 text-sm text-right">
                    {typeof item.rate === 'number' ? (item.rate % 1 === 0 ? `${item.rate}%` : `${item.rate}%`) : item.rate}
                  </div>
                  {index < 4 && <ArrowRight className="w-4 h-4 text-slate-500" />}
                </div>
              ))}
            </div>
          </div>

          {/* Conversion by Time Period */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">시간대별 전환율</h2>
              <div className="space-y-3">
                {[
                  { time: "09:00-12:00", rate: 15.2, count: 45 },
                  { time: "12:00-15:00", rate: 18.7, count: 62 },
                  { time: "15:00-18:00", rate: 12.3, count: 38 },
                  { time: "18:00-21:00", rate: 8.9, count: 26 },
                  { time: "21:00-24:00", rate: 5.1, count: 14 },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-300 font-medium w-24">{item.time}</span>
                      <div className="flex-1 bg-slate-700 rounded-full h-2 w-32">
                        <div
                          className="bg-blue-500 h-full rounded-full transition-all duration-1000"
                          style={{ width: `${(item.rate / 20) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{item.rate}%</p>
                      <p className="text-slate-400 text-xs">{item.count}건</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-6">디바이스별 전환율</h2>
              <div className="space-y-3">
                {[
                  { device: "VR 헤드셋", rate: 22.4, count: 89, color: "bg-purple-500" },
                  { device: "모바일", rate: 11.7, count: 156, color: "bg-blue-500" },
                  { device: "데스크톱", rate: 8.3, count: 98, color: "bg-green-500" },
                  { device: "태블릿", rate: 6.1, count: 23, color: "bg-orange-500" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 ${item.color} rounded-full`}></div>
                      <span className="text-slate-300 font-medium w-20">{item.device}</span>
                      <div className="flex-1 bg-slate-700 rounded-full h-2 w-32">
                        <div
                          className={`${item.color} h-full rounded-full transition-all duration-1000`}
                          style={{ width: `${(item.rate / 25) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{item.rate}%</p>
                      <p className="text-slate-400 text-xs">{item.count}건</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Converting Scenes */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">전환율 높은 씬 TOP 5</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">씬명</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">방문자</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">전환수</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">전환율</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">트렌드</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { scene: "제품 데모존", visitors: 456, conversions: 98, rate: 21.5, trend: "+3.2%" },
                    { scene: "브랜드 스토리", visitors: 389, conversions: 67, rate: 17.2, trend: "+1.8%" },
                    { scene: "고객 후기", visitors: 298, conversions: 43, rate: 14.4, trend: "-0.5%" },
                    { scene: "기술 소개", visitors: 342, conversions: 41, rate: 12.0, trend: "+2.1%" },
                    { scene: "문의하기", visitors: 267, conversions: 28, rate: 10.5, trend: "+0.9%" },
                  ].map((item, index) => (
                    <tr key={index} className="border-b border-slate-700/30">
                      <td className="py-3 px-4 text-white font-medium">{item.scene}</td>
                      <td className="py-3 px-4 text-slate-300">{item.visitors.toLocaleString()}명</td>
                      <td className="py-3 px-4 text-slate-300">{item.conversions}건</td>
                      <td className="py-3 px-4">
                        <span className="text-white font-semibold">{item.rate}%</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          item.trend.startsWith('+') ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'
                        }`}>
                          {item.trend}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Conversion Optimization Recommendations */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-6">전환 최적화 제안</h2>
            <div className="space-y-4">
              {[
                {
                  title: "모바일 전환율 개선",
                  description: "모바일 디바이스의 전환율이 11.7%로 상대적으로 낮습니다. UX 개선을 통해 전환율을 높일 수 있습니다.",
                  impact: "예상 개선: +3-5%",
                  priority: "높음",
                  color: "border-red-500/30 bg-red-500/5"
                },
                {
                  title: "오후 시간대 콘텐츠 최적화",
                  description: "15:00-18:00 시간대의 전환율이 낮습니다. 이 시간대에 맞는 콘텐츠 전략이 필요합니다.",
                  impact: "예상 개선: +2-3%",
                  priority: "중간",
                  color: "border-yellow-500/30 bg-yellow-500/5"
                },
                {
                  title: "CTA 버튼 위치 개선",
                  description: "마커 상호작용에서 CTA 클릭으로의 전환이 50%입니다. CTA 버튼의 위치와 디자인을 개선하세요.",
                  impact: "예상 개선: +4-6%",
                  priority: "높음",
                  color: "border-red-500/30 bg-red-500/5"
                }
              ].map((item, index) => (
                <div key={index} className={`p-4 rounded-lg border ${item.color}`}>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold">{item.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      item.priority === '높음' ? 'text-red-700 bg-red-100' : 'text-yellow-700 bg-yellow-100'
                    }`}>
                      {item.priority}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-2">{item.description}</p>
                  <p className="text-blue-400 text-sm font-medium">{item.impact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Conversion Goals Progress */}
          <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6">전환 목표 달성 현황</h2>
            <div className="space-y-6">
              {[
                { goal: "월간 전환율 목표", current: 12.8, target: 15.0, unit: "%" },
                { goal: "일일 전환 수 목표", current: 159, target: 200, unit: "건" },
                { goal: "전환당 비용 목표", current: 2450, target: 2000, unit: "원" }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 font-medium">{item.goal}</span>
                    <span className="text-white">
                      {item.current.toLocaleString()}{item.unit} / {item.target.toLocaleString()}{item.unit}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ${
                        item.current >= item.target ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${Math.min((item.current / item.target) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">
                      {((item.current / item.target) * 100).toFixed(1)}% 달성
                    </span>
                    <span className={`${
                      item.current >= item.target ? 'text-green-400' : 'text-slate-400'
                    }`}>
                      {item.current >= item.target ? '목표 달성' : `${item.target - item.current}${item.unit} 남음`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
