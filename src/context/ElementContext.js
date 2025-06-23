'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '@/utils/axios'

const ElementContext = createContext()

export const ElementProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [payload, setPayload] = useState(null)
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const fetchElements = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/elements`)
      if (response?.data?.success) {
        setData(response.data.elements)
      } else {
        toast.error(response?.data?.message || 'Unknown error', {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch elements', {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      })
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchElements()
  }, [refreshKey, payload, search])

 const refetch = () => setRefreshKey(prev => prev + 1)
  return (
    <ElementContext.Provider value={{
      data,
      loading,
      refetch,
      setPayload,
      setSearch
    }}>
      {children}
    </ElementContext.Provider>
  )
}

export const useElementContext = () => useContext(ElementContext)
