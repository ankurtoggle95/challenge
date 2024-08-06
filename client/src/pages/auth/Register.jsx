// Import necessary hooks and utilities from React and React Router
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import the Axios instance configured for API requests
import { axiosInstance } from '../../api/apiConfig';

// Define the Register component
export default function Register() {
    // Hook to programmatically navigate to different routes
    const navigate = useNavigate();
    // State to manage loading status
    const [loading, setLoading] = useState(false);
    // State to manage error messages
    const [error, setError] = useState(null); // Added state for error handling

    // Refs for form input fields
    const first_name = useRef();
    const last_name = useRef();
    const email = useRef();
    const password = useRef();
    const password2 = useRef();
    const ethereum_wallet = useRef();

    // Function to handle form submission
    async function onSubmitForm(event) {
        event.preventDefault(); // Prevent default form submission behavior

        // Collect data from form fields
        const data = {
            first_name: first_name.current.value,
            last_name: last_name.current.value,
            email: email.current.value,
            password: password.current.value,
            password2: password2.current.value,
            ethereum_wallet: ethereum_wallet.current.value,
        };

        setLoading(true); // Set loading state to true
        setError(null); // Clear any previous errors

        try {
            // Send POST request to the registration endpoint
            const response = await axiosInstance.post('auth/register', data);

            // Handle success response
            if (response.status === 200) {
                navigate('/auth/login'); // Navigate to login page on success
            } else {
                setError('Registration failed. Please try again.'); // Set error message for failed registration
            }
        } catch (error) {
            setError('An error occurred during registration. Please try again.'); // Set error message for request failure
        } finally {
            setLoading(false); // Set loading state to false
        }
    }

    return (
        <div className='container'>
            <h2>Register</h2>
            <form onSubmit={onSubmitForm}>
                <div className="mb-3">
                    <input 
                        type="text" 
                        placeholder='First Name' 
                        autoComplete='off' 
                        className='form-control' 
                        id='first_name' 
                        ref={first_name} 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        placeholder='Last Name' 
                        autoComplete='off' 
                        className='form-control' 
                        id='last_name' 
                        ref={last_name} 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="email" 
                        placeholder='Email' 
                        autoComplete='off' 
                        className='form-control' 
                        id="email" 
                        ref={email} 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="password" 
                        placeholder='Password' 
                        autoComplete='off' 
                        className='form-control' 
                        id="password" 
                        ref={password} 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="password" 
                        placeholder='Confirm Password' 
                        autoComplete='off' 
                        className='form-control' 
                        id="passwordConfirmation" 
                        ref={password2} 
                    />
                </div>
                <div className="mb-3">
                    <input 
                        type="text" 
                        placeholder='Ethereum Wallet Address' 
                        autoComplete='off' 
                        className='form-control' 
                        id="ethereum_wallet" 
                        ref={ethereum_wallet} 
                    />
                </div>
                <div className="mb-3">
                    <button 
                        disabled={loading} 
                        className='btn btn-success' 
                        type="submit"
                    >
                        Register
                    </button>
                </div>
                {error && <div className="alert alert-danger">{error}</div>} {/* Display error if any */}
            </form>
        </div>
    );
}
