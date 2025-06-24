'use client'
import { api } from "../utils/axios"
import { useState, useEffect } from "react"
import { toast, Slide } from "react-toastify"
import { CustomToast } from "../components/CustomToast"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'

export const getArtifactsUser = (payload, refetch, search, page=1, rowsPerPage=99) => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
       setLoading(true)
      try { 
        const response = await api.get(`/artifact-user?search=${search}&page=${page}&rows_per_page=${rowsPerPage}`)
         if (response?.data?.success) {
          setData(response?.data?.artifacts?.data)
          setTotal(response?.data?.artifacts?.total)
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


export const getArtifacts = (payload, refetch, search, page=1, rowsPerPage=99) => {
  const [data, setData] = useState([])
  const [total, setTotal] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
       setLoading(true)
      try {
        const response = await api.get(`/artifact?search=${search}&page=${page}&rows_per_page=${rowsPerPage}`)
         if (response?.data?.success) {
          setData(response?.data?.artifacts?.data)
          setTotal(response?.data?.artifacts?.total)
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

export const getArtifactPerks = (payload, refetch, search, page, rowsPerPage) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
       const artifact_id = payload?.id || ''
   
       const response = await api.get(`/artifact-perk?artifact_id=${artifact_id}&search=${search}&page=${page}&rows_per_page=${rowsPerPage}`);
        if (response?.data?.success) {
          setData(response?.data?.artifact_perks?.data)
          setTotal(response?.data?.artifact_perks?.total)
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

export const getArtifactSearch = (characterId, refetch, search, page, rowsPerPage) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      if (!characterId) {
        setLoading(false)
        return
      }
      try {
   
       const response = await api.get(`/artifact-search?character_id=${characterId}&search=${search}&page=${page}&rows_per_page=${rowsPerPage}`);
        if (response?.data?.success) {
          setData(response?.data?.artifacts?.data)
          setTotal(response?.data?.artifacts?.total)
        } else if (!response?.data?.message) {
          toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
        } 
      } catch (error) {
        toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
      } 
      setLoading(false)
    }

    fetchData()
  }, [characterId, refetch, search, page, rowsPerPage])

  return { data, loading, total }
}

export const getArtifactByParty = (payload, refetch, search, page, rowsPerPage) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
       const party_character_id = payload?.party_character_id || ''
   
       const response = await api.get(`/artifact-by-party?party_character_id=${party_character_id}&search=${search}&page=${page}&rows_per_page=${rowsPerPage}`);
        if (response?.data?.success) {
          setData(response?.data?.artifacts?.data)
          setTotal(response?.data?.artifacts?.total)
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

export const addPiece = async (payload) => {
  try {
    const response = await api.post('/artifact-piece', payload)
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


export const addArtifact = async (payload) => {
  try {
    const response = await api.post(`/artifact`, payload)
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


export const removeArtifact = async (payload) => {
  try {
    const response = await api.delete(`/artifact/${payload.id}`)
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

export const addArtifactApi = async (payload) => {
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
    const response = await api.post(`/artifact/create/api`, payload)
      toast.dismiss('fetch-api')
     if (response?.data?.success) {
      toast.success(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    } else {
      toast.error(response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
    }
    return response
  } catch (error) {
      toast.dismiss('fetch-api')
    toast.error(error.response?.data?.message, { transition: Slide, hideProgressBar: true, autoClose: 2000 })
  } 
}


export const addArtifactPerk = async (payload) => {
  try {
    const response = await api.post(`/artifact-perk`, payload)
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

export const removeArtifactPerk = async (payload) => {
  try {
    const response = await api.post(`/artifact-perk/delete-by-perk`, payload)
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


