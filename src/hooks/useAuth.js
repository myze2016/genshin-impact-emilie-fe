'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"
import { toast, Slide } from "react-toastify"



export const login = async (payload) => {
  try {
    const response = await api.post('/login', payload)
    if (response?.data?.success) {
      toast.success(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    } else {
      toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    }
    return response
  } catch (error) {
    toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
  }
}



export const logout = async (payload) => {
  try {
    const response = await api.post('/logout', payload)
    
    if (response?.data?.success) {
      toast.success(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    } else {
      toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    }
    return response
  } catch (error) {
    toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
  }
}




export const register = async (payload) => {
  try {
    const response = await api.post('/register', payload)
    if (response?.data?.success) {
      toast.success(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    } else {
      toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    }
    return response
  } catch (error) {
    toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
  }
}

export const getUser = (payload, refetch, search, page, rowsPerPage) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
    
  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const response = await api.get(`/user`)
        if (response?.data?.success) {
          setData(response?.data?.parties?.data)
        } else if (!response?.data?.message) {
          toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
        } 
      } catch (error) {
        toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
      }
      setLoading(false)
    }

    fetchData()
  }, [payload, refetch])

  return { data, loading }
}
