'use client'  // 클라이언트 컴포넌트로 설정

import { useState } from 'react'
import {
    HomeIcon,
    BookOpenIcon,
    CalendarIcon,
    ChartBarIcon,
    UserIcon,
    CheckCircleIcon,
  } from '@heroicons/react/24/outline'
  
  // 교육 데이터 타입 정의
  interface Education {
    id: number
    name: string
    institution: string
    applicationDate: string
    announcementDate: string
    maleEligible: boolean
    femaleEligible: boolean
    cost: number
    maleApplied: boolean  // 남자 신청 여부
    femaleApplied: boolean  // 여자 신청 여부
  }

  // 날짜 포맷팅 함수
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const days = ['일', '월', '화', '수', '목', '금', '토']
    const dayOfWeek = days[date.getDay()]
    return `${dateStr} (${dayOfWeek})`
  }

  // 샘플 교육 데이터 생성
  const generateEducationData = (): Education[] => {
    const institutions = [
      'SK Cloud Academy', 'SK AI School', 'SK Digital Training Center',
      'SK Innovation Hub', 'SK Tech Institute', 'SK Future Campus',
      'SK Learning Center', 'SK Development School', 'SK Education Hub',
      'SK Training Institute'
    ]

    const courses = [
      'Cloud Computing 기초', 'AI/ML 입문', 'Big Data 분석',
      'DevOps 실무', 'Blockchain 기초', 'Cybersecurity 기본',
      'Frontend 개발', 'Backend 개발', 'Mobile App 개발',
      'Data Science 기초', 'UI/UX 디자인', 'Network 기초',
      'Database 관리', 'System Architecture', 'API 개발',
      'Cloud Security', 'AI 모델링', 'Data Engineering',
      'MSA 설계', 'Container 기술'
    ]

    // 현재 날짜 기준으로 한달 전후의 날짜 범위 생성
    const today = new Date()
    const generateRandomDate = () => {
      const randomDays = Math.floor(Math.random() * 60) - 30 // -30 to +30 days
      const date = new Date(today)
      date.setDate(date.getDate() + randomDays)
      return date.toISOString().split('T')[0]
    }

    return courses.map((course, index) => {
      const applicationDate = generateRandomDate()
      const announcementDate = new Date(applicationDate)
      announcementDate.setDate(announcementDate.getDate() + 14) // 신청일 2주 후 발표

      return {
        id: index + 1,
        name: course,
        institution: institutions[Math.floor(Math.random() * institutions.length)],
        applicationDate,
        announcementDate: announcementDate.toISOString().split('T')[0],
        maleEligible: true,
        femaleEligible: true,
        cost: Math.floor(Math.random() * 5 + 1) * 100000, // 100,000 ~ 500,000
        maleApplied: false,
        femaleApplied: false
      }
    })
  }

  export default function Home() {
    const [gender, setGender] = useState<'남자' | '여자'>('남자')
    const [educations, setEducations] = useState<Education[]>(generateEducationData())

    const toggleGender = () => {
      setGender(prev => prev === '남자' ? '여자' : '남자')
    }

    const handleApplyEducation = (educationId: number) => {
      const education = educations.find(edu => edu.id === educationId)
      const isCurrentlyApplied = gender === '남자' ? education?.maleApplied : education?.femaleApplied

      if (isCurrentlyApplied) {
        // 이미 신청된 경우 취소 처리
        if (confirm('해당 교육을 취소하시겠습니까?')) {
          setEducations(prevEducations => 
            prevEducations.map(edu => {
              if (edu.id === educationId) {
                return {
                  ...edu,
                  maleApplied: gender === '남자' ? false : edu.maleApplied,
                  femaleApplied: gender === '여자' ? false : edu.femaleApplied
                }
              }
              return edu
            })
          )
        }
      } else {
        // 신청되지 않은 경우 신청 처리
        if (confirm('해당 교육을 신청하시겠습니까?')) {
          setEducations(prevEducations => 
            prevEducations.map(edu => {
              if (edu.id === educationId) {
                return {
                  ...edu,
                  maleApplied: gender === '남자' ? true : edu.maleApplied,
                  femaleApplied: gender === '여자' ? true : edu.femaleApplied
                }
              }
              return edu
            })
          )
        }
      }
    }

    const isApplied = (education: Education) => {
      return gender === '남자' ? education.maleApplied : education.femaleApplied
    }

    return (
      <main className="min-h-screen bg-gray-50 pt-14">
        {/* 헤더 - fixed 추가 */}
        <header className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-white border-b">
          <h1 className="text-xl font-bold">{gender} 교육 관리</h1>
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleGender}
              className={`px-3 py-1 rounded-full ${
                gender === '남자' 
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' 
                  : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
              } text-sm font-medium transition-colors`}
            >
              {gender}
            </button>
            <button className="text-gray-600">
              <UserIcon className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* 교육 목록 */}
        <div className="p-4">
          {educations.map(education => (
            <div 
              key={education.id} 
              onClick={() => handleApplyEducation(education.id)}
              className={`bg-white p-4 rounded-lg shadow-sm mb-4 relative ${
                !isApplied(education) && 'cursor-pointer hover:bg-gray-50'
              }`}
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg">{education.name}</h3>
                  <div className="flex flex-col items-end h-12"> {/* 높이 고정 */}
                    <div className="h-6"> {/* 남자 영역 */}
                      {education.maleApplied && (
                        <div className="flex items-center gap-1 text-blue-600">
                          <CheckCircleIcon className="w-5 h-5" />
                          <span className="text-sm font-medium">신청완료</span>
                        </div>
                      )}
                    </div>
                    <div className="h-6"> {/* 여자 영역 */}
                      {education.femaleApplied && (
                        <div className="flex items-center gap-1 text-pink-600">
                          <CheckCircleIcon className="w-5 h-5" />
                          <span className="text-sm font-medium">신청완료</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>교육기관: {education.institution}</p>
                  <p>신청일자: {formatDate(education.applicationDate)}</p>
                  <p>발표일자: {formatDate(education.announcementDate)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 하단 네비게이션 */}
        <nav className="fixed bottom-0 w-full bg-white border-t">
          <div className="flex justify-between px-6 py-3">
            <button className="flex flex-col items-center text-blue-600">
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs mt-1">홈</span>
            </button>
            <button className="flex flex-col items-center text-gray-600">
              <BookOpenIcon className="w-6 h-6" />
              <span className="text-xs mt-1">강의</span>
            </button>
            <button className="flex flex-col items-center text-gray-600">
              <CalendarIcon className="w-6 h-6" />
              <span className="text-xs mt-1">일정</span>
            </button>
            <button className="flex flex-col items-center text-gray-600">
              <ChartBarIcon className="w-6 h-6" />
              <span className="text-xs mt-1">통계</span>
            </button>
          </div>
        </nav>
      </main>
    )
  }
