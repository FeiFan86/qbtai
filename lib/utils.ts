export function cn(...inputs: any[]) {
  // 简单的类名合并函数，避免依赖问题
  return inputs
    .filter(Boolean)
    .map((input) => {
      if (typeof input === 'string') return input
      if (typeof input === 'object' && input !== null) {
        return Object.entries(input)
          .filter(([_, value]) => Boolean(value))
          .map(([key]) => key)
          .join(' ')
      }
      return ''
    })
    .join(' ')
    .trim()
    .replace(/\s+/g, ' ')
}