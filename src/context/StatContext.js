'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '@/utils/axios'

const StatContext = createContext()

export const StatProvider = ({ children }) => {
   const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [payload, setPayload] = useState(null)
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const fetchStats = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/stat`)
      if (response?.data?.success) {
        setData(response.data.stats)
      } else {
        toast.error(response?.data?.message || 'Unknown error', {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch stats', {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [refreshKey, payload, search])

  const refetch = () => setRefreshKey(prev => prev + 1)

  return (
    <StatContext.Provider value={{
      data,
      loading,
      refetch,
      setPayload,
      setSearch
    }}>
      {children}
    </StatContext.Provider>
  )
}

export const useStatContext = () => useContext(StatContext)