'use client'
import { useEffect, useState } from 'react'

interface AnimatedNumberProps {
  value: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export function AnimatedNumber({
  value,
  duration = 250, // 0.25 seconds
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0,
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(value)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Reset to loading state when value changes
    setIsLoading(true)
    setDisplayValue(value)

    // Show random numbers for the duration
    const interval = setInterval(() => {
      if (isLoading) {
        // Generate a random number between 0 and value * 1.5
        const randomValue = Math.random() * value * 1.5
        setDisplayValue(randomValue)
      }
    }, 50) // Update every 50ms

    // After duration, show the actual value
    const timeout = setTimeout(() => {
      setIsLoading(false)
      setDisplayValue(value)
      clearInterval(interval)
    }, duration)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [value, duration])

  const formattedValue = displayValue.toFixed(decimals)
  const displayText = `${prefix}${formattedValue}${suffix}`

  return <span className={className}>{displayText}</span>
} 