'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"
import { toast, Slide } from "react-toastify"

export const getParties = (payload, refetch, search, page, rowsPerPage) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/party?search=${search}&page=${page}&rows_per_page=${rowsPerPage}`)
         if (response?.data?.success) {
           setTotal(response?.data?.parties?.total)
        setData(response?.data?.parties?.data)
           } else if (!response?.data?.message) {
          toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
        } 
      } catch (error) {
        toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
      }
    }

    fetchData()
  }, [payload, refetch, search, page, rowsPerPage])

  return { data, loading, total }
}

export const getParty = (payload, refetch) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/party/${payload.id}`)
         if (response?.data?.success) {
        setData(response?.data?.parties)
       } else if (!response?.data?.message) {
          toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
        } 
      } catch (error) {
        toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
      }
    }

    fetchData()
  }, [payload, refetch])

  return { data, loading }
}

export const addParty = async (payload) => {
  try {

    const response = await api.post(`/party`, payload)
         if (response?.data?.success) {
              toast.success(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
 } else {
      toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    }
    return response
  } catch (error) {
    console.log('error', error)
    toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
  } 
}

export const editParty = async (payload) => {
  try {

    const response = await api.put(`/party/${payload.id}`, payload)
         if (response?.data?.success) {
              toast.success(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
 } else {
      toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    }
    return response
  } catch (error) {
    console.log('error', error)
    toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
  } 
}

export const addPartyImage = async (payload) => {
  try {
    
    const response = await api.post(`/party-image`, payload)
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

export const addPartyPosition = async (payload) => {
  try {

    const response = await api.post(`/party-position`, payload)
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


export const addPartyPositionCharacter = async (payload) => {
  try {

    const response = await api.post(`/party-position-character`, payload)
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


export const moveVerticalCharacter = async (payload) => {
  try {

    const response = await api.post(`/arrange`, payload)
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

export const removePartyPositionCharacter = async (payload) => {
  try {

    const response = await api.delete(`/party-position-character/${payload.id}`)
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


export const removePosition = async (payload) => {
  try {

    const response = await api.delete(`/party-position/${payload.id}`)
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