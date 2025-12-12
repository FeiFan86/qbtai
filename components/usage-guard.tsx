'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth-provider'
import { 
  canGuestUseFeature, 
  canUserUseFeature, 
  recordUserUsage, 
  incrementGuestUsage,
  getFeatureStatusText,
  FEATURE_NAMES,
  FEATURE_LIMITS
} from '@/lib/usage-limit'
import LoginModal from './login-modal'
import { AlertCircle, Clock, Lock, User } from 'lucide-react'

interface UsageGuardProps {
  feature: string
  children: (props: { 
    canUse: boolean
    remainingUses: number
    onUse: () => Promise<void>
    isLoading: boolean
    usageText: string
  }) => React.ReactNode
  onUsageLimitReached?: () => void
}

export function UsageGuard({ feature, children, onUsageLimitReached }: UsageGuardProps) {
  const { user, isAuthenticated } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [canUse, setCanUse] = useState(false)
  const [remainingUses, setRemainingUses] = useState(0)
  const [usageText, setUsageText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [checkTrigger, setCheckTrigger] = useState(0) // 用于触发重新检查

  // 检查使用权限
  useEffect(() => {
    const checkUsage = async () => {
      if (isAuthenticated && user) {
        // 已登录用户
        const result = await canUserUseFeature(user, feature)
        setCanUse(result.canUse)
        setRemainingUses(Math.min(result.dailyRemaining, result.monthlyRemaining))
        setUsageText(getFeatureStatusText(feature, false, result))
      } else {
        // 游客
        const result = canGuestUseFeature(feature)
        setCanUse(result.canUse)
        setRemainingUses(result.remaining)
        setUsageText(getFeatureStatusText(feature, true))
      }
    }

    checkUsage()
  }, [isAuthenticated, user, feature, checkTrigger])

  // 处理使用功能
  const handleUse = async () => {
    setIsLoading(true)
    
    try {
      if (!canUse) {
        if (onUsageLimitReached) {
          onUsageLimitReached()
        } else {
          // 如果是游客且已达到限制，显示登录弹窗
          if (!isAuthenticated) {
            setShowLoginModal(true)
          }
        }
        return
      }

      if (isAuthenticated && user) {
        // 记录用户使用
        await recordUserUsage(user, feature)
      } else {
        // 增加游客使用次数
        incrementGuestUsage(feature)
      }
      
      // 触发重新检查使用权限
      setCheckTrigger(prev => prev + 1)
    } catch (error) {
      console.error('Failed to record usage:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {children({
        canUse,
        remainingUses,
        onUse: handleUse,
        isLoading,
        usageText
      })}
      
      {/* 登录弹窗 */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  )
}

export default UsageGuard

// 使用状态显示组件
interface UsageStatusProps {
  feature: string
  className?: string
  showIcon?: boolean
}

export function UsageStatus({ feature, className = '', showIcon = true }: UsageStatusProps) {
  const { user, isAuthenticated } = useAuth()
  const [status, setStatus] = useState({
    canUse: false,
    remaining: 0,
    text: '',
    resetTime: null as Date | null
  })

  useEffect(() => {
    const updateStatus = async () => {
      if (isAuthenticated && user) {
        const result = await canUserUseFeature(user, feature)
        setStatus({
          canUse: result.canUse,
          remaining: Math.min(result.dailyRemaining, result.monthlyRemaining),
          text: getFeatureStatusText(feature, false, result),
          resetTime: null
        })
      } else {
        const result = canGuestUseFeature(feature)
        setStatus({
          canUse: result.canUse,
          remaining: result.remaining,
          text: getFeatureStatusText(feature, true),
          resetTime: result.resetTime || null
        })
      }
    }

    updateStatus()
  }, [isAuthenticated, user, feature])

  if (status.canUse) {
    return (
      <div className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}>
        {showIcon && <User className="h-4 w-4" />}
        <span>{status.text}</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 text-sm text-amber-600 ${className}`}>
      {showIcon && <Lock className="h-4 w-4" />}
      <span>{status.text}</span>
      {status.resetTime && (
        <div className="flex items-center space-x-1">
          <Clock className="h-3 w-3" />
          <span className="text-xs">
            {Math.ceil((status.resetTime.getTime() - Date.now()) / (1000 * 60))}分钟后重置
          </span>
        </div>
      )}
    </div>
  )
}

// 使用限制提示组件
interface UsageLimitAlertProps {
  feature: string
  onUpgrade?: () => void
  className?: string
}

export function UsageLimitAlert({ feature, onUpgrade, className = '' }: UsageLimitAlertProps) {
  const { user, isAuthenticated } = useAuth()
  const [showAlert, setShowAlert] = useState(false)

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade()
    } else if (!isAuthenticated) {
      // 未登录用户引导去登录
      // 这里可以触发登录弹窗或其他逻辑
      console.log('Show login modal')
    }
  }

  const isGuest = !isAuthenticated

  return (
    <>
      {showAlert && (
        <div className={`bg-amber-50 border border-amber-200 rounded-lg p-4 ${className}`}>
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-amber-800">
                {isGuest ? '游客使用限制' : '使用次数已用完'}
              </h3>
              <p className="text-sm text-amber-700 mt-1">
                {isGuest 
                  ? `游客每日可使用 ${FEATURE_NAMES[feature]} ${FEATURE_LIMITS[feature].maxGuest} 次，登录后可获得更多使用次数。`
                  : `今日 ${FEATURE_NAMES[feature]} 使用次数已用完，升级会员可解锁更多使用权限。`
                }
              </p>
              <div className="mt-3 flex space-x-3">
                <button
                  onClick={() => setShowAlert(false)}
                  className="text-sm text-amber-600 hover:text-amber-700 font-medium"
                >
                  稍后再说
                </button>
                <button
                  onClick={handleUpgrade}
                  className="text-sm bg-amber-600 text-white px-3 py-1 rounded-md hover:bg-amber-700"
                >
                  {isGuest ? '立即登录' : '升级会员'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UsageGuard