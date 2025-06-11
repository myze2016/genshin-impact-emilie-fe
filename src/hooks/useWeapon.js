'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"
import { toast, Slide } from "react-toastify"
import { CustomToast } from "../components/CustomToast"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export const getWeapons = (payload, refetch, search, page=1, rowsPerPage=99) => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
       setLoading(true)
      try {
        const response = await api.get(`/weapon?search=${search}&page=${page}&rows_per_page=${rowsPerPage}`)
         if (response?.data?.success) {
          setData(response?.data?.weapons?.data)
          setTotal(response?.data?.weapons?.total)
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

export const getWeaponPerks = (payload, refetch, search, page, rowsPerPage) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
       const weapon_id = payload?.id || ''
       const response = await api.get(`/weapon-perk?weapon_id=${weapon_id}&search=${search}&page=${page}&rows_per_page=${rowsPerPage}`);
       
        if (response?.data?.success) {
          setData(response?.data?.weapon_perks?.data)
          setTotal(response?.data?.weapon_perks?.total)
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

export const addWeapon = async (payload) => {
  try {
    const response = await api.post(`/weapon`, payload)
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


export const removeWeapon = async (payload) => {
  try {
    const response = await api.delete(`/weapon/${payload.id}`)
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

export const addWeaponApi = async (payload) => {
  toast.info(
    <CustomToast title="Please Wait..." msg='Saving data from api..' icon={<AddCircleOutlineIcon size={15} />} color="#4da58d" />,
    {
      transition: Slide,
      hideProgressBar: true,
      autoClose: false, // Slight delay for user feedback
      closeButton: true, // Optional: cleaner look
      icon: false,
      toastId: 'fetch-api' ,
      style: {
        background: 'transparent', // Use internal box styling
        boxShadow: 'none',
        padding: 0,
      },
    }
  )
  try {
    const response = await api.post(`/weapon/create/api`, payload)
      toast.dismiss('fetch-api')
     if (response?.data?.success) {
      toast.success(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    } else {
      toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    }
    return response
  } catch (error) {
      toast.dismiss('fetch-api')
      console.log('error', error)
    toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
  } 
}


export const addWeaponPerk = async (payload) => {
  try {
    const response = await api.post(`/weapon-perk`, payload)
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

export const removeWeaponPerk = async (payload) => {
  try {
    const response = await api.post(`/weapon-perk/delete-by-character`, payload)
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


