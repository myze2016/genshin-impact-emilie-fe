'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"
import { toast, Slide } from "react-toastify"

export const getCommons = (payload, refetch, search) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
       const response = await api.get(`/common`)
         if (response?.data?.success) {
          setData(response?.data?.commons);
        } else if (!response?.data?.message) {
          toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
        } 
      } catch (error) {
         toast.error(error?.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
      } 
       setLoading(false)
    }

    fetchData()
  }, [payload, refetch, search])

  return { data, loading }
}

export const addCommon = async (payload) => {
  try {
    const response = await api.post(`/common`, payload)
    if (response?.data?.success) {
      toast.success(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    } else {
      toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    }
    return response
  } catch (error) {
    toast.error(error?.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
  } 
}

export const removeCommon = async (payload) => {
  try {
    const response = await api.delete(`/common/${payload.id}`);
    if (response?.data?.success) {
      toast.success(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    } else {
      toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    }
    return response
  } catch (error) {
    toast.error(error?.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
  } 
}
