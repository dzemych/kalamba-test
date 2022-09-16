import {useCallback, useState} from "react";


const useHttp = () => {
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState<string | unknown>()

   const request = useCallback(async (
      url: string,
      method = 'GET',
      body = null,
      headers = {}
   ) => {
      setLoading(true)
      setError('')

      try {
         const response = await fetch('http://localhost:3000/api' + url, {
            method, body, headers
         })

         const data = await response.json()

         if (response.ok)
            return data

         throw data
      } catch (e) {
         setError(e)
      }

      setLoading(false)
   }, [])

   return { loading, error, request }
}

export default useHttp