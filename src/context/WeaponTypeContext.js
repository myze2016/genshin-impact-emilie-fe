'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '@/utils/axios'

const WeaponTypeContext = createContext()

export const WeaponTypeProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [payload, setPayload] = useState(null)
  const [search, setSearch] = useState('')
  const [refreshKey, setRefreshKey] = useState(0)

  const fetchWeaponTypes = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/weapon-types`)
      if (response?.data?.success) {
        setData(response.data.weapon_types)
      } else {
        toast.error(response?.data?.message || 'Unknown error', {
          transition: Slide,
          hideProgressBar: true,
          autoClose: 2000
        })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch weapon_types', {
        transition: Slide,
        hideProgressBar: true,
        autoClose: 2000
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeaponTypes()
  }, [refreshKey, payload, search])

  const refetch = () => setRefreshKey(prev => prev + 1)
  return (
    <WeaponTypeContext.Provider value={{
      data,
      loading,
      refetch,
      setPayload,
      setSearch
    }}>
      {children}
    </WeaponTypeContext.Provider>
  )
}

export const useWeaponTypeContext = () => useContext(WeaponTypeContext)
