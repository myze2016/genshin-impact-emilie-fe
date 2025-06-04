'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"
import { toast, Slide } from "react-toastify"
import { CustomToast } from "../components/CustomToast"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export const getCharacters = (payload, refetch, search) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/character?search=${search}`)
        console.log('response?.data?.characters', response?.data?.characters)
        setData(response?.data?.characters)
      } catch (error) {
        console.log(error)
      } 
    }

    fetchData()
  }, [payload, refetch, search])

  return { data, loading }
}

export const getCharacterPerks = (payload, refetch, search) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
       const character_id = payload?.character_id || ''
       const response = await api.get(`/character-perk?character_id=${character_id}&search=${search}`);
        setData(response?.data?.character_perks)
      } catch (error) {
        console.log(error)
      } 
    }

    fetchData()
  }, [payload, refetch, search])

  return { data, loading }
}

export const addCharacter = async (payload) => {
  try {
    const response = await api.post(`/character`, payload)
  } catch (error) {
    console.log(error)
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
  } catch (error) {
    console.log(error)
  } 
}

export const deleteCharacterPerk = async (payload) => {
  try {
    const response = await api.post(`/character-perk/delete-by-character`, payload)
  } catch (error) {
    console.log(error)
  } 
}


export const addPartyPosition = async (payload) => {
  try {
    const response = await api.post(`/party-position`, payload)
  } catch (error) {
    console.log(error)
  } 
}


export const addPartyPositionCharacter = async (payload) => {
  try {
    const response = await api.post(`/party-position-character`, payload)
  } catch (error) {
    console.log(error)
  } 
}
