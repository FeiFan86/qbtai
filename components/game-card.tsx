'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface GameCardProps {
  title: string
  description?: string
  icon?: ReactNode
  badge?: {
    text: string
    variant: 'default' | 'secondary' | 'destructive' | 'outline'
  }
  children?: ReactNode
  className?: string
  cardClassName?: string
  hoverEffect?: boolean
  button?: {
    text: string
    onClick: () => void
    disabled?: boolean
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null
  }
}

export default function GameCard({
  title,
  description,
  icon,
  badge,
  children,
  className = "",
  cardClassName = "bg-white/80 backdrop-blur-sm shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1",
  hoverEffect = true,
  button
}: GameCardProps) {
  const finalCardClassName = hoverEffect 
    ? cardClassName 
    : cardClassName.replace(/hover:shadow-xl|hover:-translate-y-1/g, '')

  return (
    <Card className={`${finalCardClassName} ${className} overflow-hidden`}>
      <CardHeader className="pb-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-purple-200/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg">
                {icon}
              </div>
            )}
            <div>
              <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
              {description && (
                <CardDescription className="text-gray-600 mt-1">{description}</CardDescription>
              )}
            </div>
          </div>
          {badge && (
            <Badge variant={badge.variant} className="shadow-sm">
              {badge.text}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      {children && (
        <CardContent className="p-6">
          {children}
        </CardContent>
      )}
      
      {button && (
        <CardContent className="p-6 pt-0">
          <Button 
            onClick={button.onClick}
            disabled={button.disabled}
            variant={button.variant || 'default'}
            className="w-full transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl"
          >
            {button.text}
          </Button>
        </CardContent>
      )}
    </Card>
  )
}