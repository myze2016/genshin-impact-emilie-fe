'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"
import { toast, Slide } from "react-toastify"

export const getStats = (payload, refetch, search, page=0, rowsPerPage=100) => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await api.get(`/stat`);
        if (response?.data?.success) {
          setData(response?.data?.stats)
        } else if (!response?.data?.message) {
          toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
        } 
      } catch (error) {
        toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
      } 
      setLoading(false)
    } 

    fetchData()
  }, [payload, refetch, search, page, rowsPerPage])

  return { data, loading, total }
}

export const getPerkStat = (payload, refetch, search, page=0, rowsPerPage=100) => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await api.get(`/perk-type?type=statsearch=${search}&page=${page}&rows_per_page=${rowsPerPage}`);
        if (response?.data?.success) {
          setData(response?.data?.perks?.data)
          setTotal(response?.data?.perks?.total)
        } else if (!response?.data?.message) {
          toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
        } 
      } catch (error) {
        toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
      } 
      setLoading(false)
    } 

    fetchData()
  }, [payload, refetch, search, page, rowsPerPage])

  return { data, loading, total }
}

export const addStatLine = async (payload) => {
  try {
    const response = await api.post('/stat-line', payload)
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

export const removePerk = async (payload) => {
  try {
    const response = await api.delete(`/perk/${payload.id}`)
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
