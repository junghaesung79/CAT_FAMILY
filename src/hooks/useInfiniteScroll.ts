import { useEffect, useRef } from 'react'

export function useInfiniteScroll(callback: () => void) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const target = ref.current
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback()
        }
      })
    })
    observer.observe(target)

    return () => observer.disconnect()
  }, [callback])

  return ref
}

