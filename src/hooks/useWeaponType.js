'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"
import { toast, Slide } from "react-toastify"

export const getWeaponTypes = (payload, refetch) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/weapon-types`)
         if (response?.data?.success) {
          console.log('weapon-types', response?.data)
        setData(response?.data?.weapon_types)
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
