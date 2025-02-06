'use client'

// React Imports
import { createContext, useState } from 'react'

export const initialIntersections = {
  features: false,
  team: false,
  faq: false,
  'contact-us': false
}
export const IntersectionContext = createContext(null)

export const IntersectionProvider = ({ children }) => {
  // States
  const [intersections, setIntersections] = useState(initialIntersections)

  const updateIntersections = data => {
    setIntersections(prev => {
      const isAnyActive = Object.values(intersections).some(value => value === true)

      if (!Object.values(data)[0] && !isAnyActive) return prev
      Object.keys(prev).forEach(key => {
        if (prev[key] === true && Object.keys(data).some(dataKey => data[dataKey] === true)) {
          prev[key] = false
        }
      })

      return { ...prev, ...data }
    })
  }

  return (
    <IntersectionContext.Provider value={{ intersections, updateIntersections }}>
      {children}
    </IntersectionContext.Provider>
  )
}
