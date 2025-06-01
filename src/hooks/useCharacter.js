'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"

export const getCharacters = (payload, refetch) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/character`)
        console.log('response?.data?.characters', response?.data?.characters)
        setData(response?.data?.characters)
      } catch (error) {
        console.log(error)
      } 
    }

    fetchData()
  }, [payload, refetch])

  return { data, loading }
}

export const addCharacter = async (payload) => {
  try {
    const response = await api.post(`/character`, payload)
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
