import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { API_URL } from '../common/constants'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password, by_form = false) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`${API_URL}/customer/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, "by_form": by_form })
        })
        const json = await response.json()


        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // save the user to local storage

            if (json.success) {
                localStorage.setItem('user', JSON.stringify(json))
            }

            // update the auth context
            dispatch({ type: 'LOGIN', payload: json })

            // update loading state
            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}