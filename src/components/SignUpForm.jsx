import { useState } from "react"


export default function SignUpForm({ setToken }) {


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState([]);
    const [submitting, setSubmitting] = useState(false)

    const validateForm = () => {
        const error = []
        //check password length
        if (password.length < 8) {
            error.password = "Password should be at least 8 characters long"
        }
        return error
    }

    async function handleSubmit(event) {
        event.preventDefault()
        setError(validateForm())
        setSubmitting(true)
        console.log("hello")

        try {
            const response = await fetch(
                "https://fsa-jwt-practice.herokuapp.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: { username },
                    password: { password }
                })
            })
            const result = await response.json()
            setToken(result.token)
            console.log(result)
        } catch (error) {
            setError(error.message)
        }
    }
    return (

        <>


            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
            {Object.keys(error).length === 0 && submitting ? (<span className="success">Successfully Submitted!</span>) : null}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password: <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
                    {error.password ? (
                        <p className="error">{error.password}</p>
                    ) : null}
                </label>
                <button>Submit</button>
            </form>




        </>

    )
}

