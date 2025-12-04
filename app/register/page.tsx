'use client'

import React, { useState, useEffect } from 'react'
import { RegisterForm } from '@/components/register-form'
import { UnifiedLayout } from '@/components/layout-unified'
import { Heart, Sparkles } from 'lucide-react'

export default function RegisterPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <UnifiedLayout 
      title="开启甜蜜旅程"
      subtitle="创建您的账户"
      icon={<Heart className="h-4 w-4 text-rose-500" />}
      showAuthButtons={false}
    >
      <RegisterForm />
    </UnifiedLayout>
  )
}