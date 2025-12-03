import React from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps {
  className?: string
  children?: React.ReactNode
}

interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt?: string
}

interface AvatarFallbackProps {
  children: React.ReactNode
  className?: string
}

export function Avatar({ className, children }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
        className
      )}
    >
      {children}
    </div>
  )
}

export function AvatarImage({ src, alt, className, ...props }: AvatarImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('aspect-square h-full w-full object-cover', className)}
      {...props}
    />
  )
}

export function AvatarFallback({ children, className }: AvatarFallbackProps) {
  return (
    <div
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-gray-100 text-gray-600 font-medium',
        className
      )}
    >
      {children}
    </div>
  )
}