'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '@/utils/axios'

const CommonContext = createContext()

export const CommonProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [payload, setPayload] = useState(null)
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const fetchCommons = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/common`)
      if (response?.data?.success) {
        setData(response.data.commons)
      } else {
        toast.error(response?.data?.message || 'Unknown error', {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch commons', {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCommons()
  }, [refreshKey, payload, search])

  const refetch = () => setRefreshKey(prev => prev + 1)
  return (
    <CommonContext.Provider value={{
      data,
      loading,
      refetch,
      setPayload,
      setSearch
    }}>
      {children}
    </CommonContext.Provider>
  )
}

export const useCommonContext = () => useContext(CommonContext)
