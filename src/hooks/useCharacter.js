'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"
import { toast, Slide } from "react-toastify"
import { CustomToast } from "../components/CustomToast"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export const getCharacters = (payload, refetch, search, page=1, rowsPerPage=99) => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
       setLoading(true)
      try {
        const response = await api.get(`/character?search=${search}&page=${page}&rows_per_page=${rowsPerPage}`)
         if (response?.data?.success) {
          setData(response?.data?.characters?.data)
          setTotal(response?.data?.characters?.total)
        } else if (!response?.data?.message) {
          toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
        } 
      } catch (error) {
        toast.error(error, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
      } 
       setLoading(false)
    }

    fetchData()
  }, [payload, refetch, search, page, rowsPerPage])

  return { data, loading, total }
}

export const getCharactersName = (payload, refetch, search, page=0, rowsPerPage=100) => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
       setLoading(true)
      try {
        const response = await api.get(`/character-get-by-name?search=${search}&page=${page}&rows_per_page=${rowsPerPage}`)
        if (response?.data?.success) {
          setData(response?.data?.characters?.data)
          setTotal(response?.data?.characters?.total)
        } else if (!response?.data?.message) {
          toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
        } 
      } catch (error) {
        toast.error(error, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
      } 
       setLoading(false)
    }

    fetchData()
  }, [payload, refetch, search, page, rowsPerPage])

  return { data, loading, total }
}

export const getCharacterPerks = (payload, refetch, search) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
       const character_id = payload?.character_id || ''
       const response = await api.get(`/character-perk?character_id=${character_id}&search=${search}`);
       
        if (response?.data?.success) {
          setData(response?.data?.character_perks)
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

export const addCharacter = async (payload) => {
  try {
    const response = await api.post(`/character`, payload)
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

export const addCharacterApi = async (payload) => {
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
    const response = await api.post(`/character/create/api`, payload)
  } catch (error) {
    console.log(error)
  } 
  toast.dismiss('fetch-api')
  toast.success(
    <CustomToast title="Success" msg='Saving data Complete' icon={<AddCircleOutlineIcon size={15} />} color="#4da58d" />,
    {
      transition: Slide,
      hideProgressBar: true,
      autoClose: 2000, // Slight delay for user feedback
      closeButton: true, // Optional: cleaner look
      icon: false,
      style: {
        background: 'transparent', // Use internal box styling
        boxShadow: 'none',
        padding: 0,
      },
    }
  )
}


export const addCharacterPerk = async (payload) => {
  try {
    const response = await api.post(`/character-perk`, payload)
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

export const deleteCharacterPerk = async (payload) => {
  try {
    const response = await api.post(`/character-perk/delete-by-character`, payload)
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


