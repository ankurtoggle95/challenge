// Import necessary dependencies from React
import React, { useEffect, useState } from 'react'
// Import custom hooks for authentication and user data
import useAuth from '../hooks/useAuth'
import useUser from '../hooks/useUser'
// Import axios instance configured for private API calls
import { axiosPrivateInstance } from '../api/apiConfig'

// Define the Home component
export default function Home() {
    // Retrieve user data from authentication context
    const { user } = useAuth()
    // Define a function to get user data
    const getUser = useUser()
    // State to store the balance
    const [balance, setBalance] = useState(null)
    // State to manage loading state
    const [loading, setLoading] = useState(false)
    // State to manage error messages
    const [error, setError] = useState(null)

    // Effect hook to get user data on component mount
    useEffect(() => {
        getUser()
    }, [])

    // Effect hook to fetch balance when user data changes
    useEffect(() => {
        // Define an asynchronous function to fetch balance
        const fetchBalance = async () => {
            // Check if user email is defined
            if (user?.email !== undefined) {
                // Set loading state to true
                setLoading(true)
                try {
                    // Make an API call to get balance
                    const response = await axiosPrivateInstance.get('/auth/api/balance/')
                    // Set balance state with fetched data
                    setBalance(response.data.balance)
                } catch (error) {
                    // Set error state if API call fails
                    setError('Failed to fetch balance')
                } finally {
                    // Set loading state to false
                    setLoading(false)
                }
            }
        }
        // Call the fetchBalance function
        fetchBalance()
    }, [user]) // Dependency array includes user to re-run effect when user changes

    // Render the component UI
    return (
        <div className='container mt-3'>
            <h2>
                <div className='row'>
                    <div className="mb-12">
                        {user?.email !== undefined ? (
                            // Conditional rendering based on loading and error state
                            loading ? (
                                'Loading...'
                            ) : error ? (
                                <div className="error">{error}</div>
                            ) : (
                                // Display balance when loaded successfully
                                <div>Your Ethereum balance is: {balance}</div>
                            )
                        ) : (
                            // Prompt to login if user is not authenticated
                            'Please login first'
                        )}
                    </div>
                </div>
            </h2>
        </div>
    )
}
