'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"
import { toast, Slide } from "react-toastify"

export const getPerks = (payload, refetch, search) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await api.get(`/perk?search=${search}`);
        if (response?.data?.success) {
          setData(response?.data?.perks)
          toast.success(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
        } else if (!response?.data?.message) {
          toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
        } 
      } catch (error) {
        toast.error(error, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
      } 
      setLoading(false)
    } 

    fetchData()
  }, [payload, refetch, search])

  return { data, loading }
}

export const addPerk = async (payload) => {
  try {
    const response = await api.post('/perk', payload)
    if (response?.data?.success) {
      toast.success(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    } else {
      toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    }
    return response
  } catch (error) {
    toast.error(error, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
  }
}
