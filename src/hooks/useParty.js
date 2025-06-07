'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"
import { toast, Slide } from "react-toastify"

export const getParties = (payload, refetch) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/party`)
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

export const removePartyPositionCharacter = async (payload) => {
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