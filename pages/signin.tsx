import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCurrentUser } from "../lib";

export default function SignIn() {
    const router = useRouter()
    const [user, { mutate }] = useCurrentUser()
    
    useEffect(() => {
        if(user) router.push('/')
    }, [user])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        const JSONdata = JSON.stringify(data)
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSONdata,
        }
        const response = await fetch('/api/user/auth', options)
        const result = await response.json()
        if (response.status === 200) {
            mutate(result)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input id="email" placeholder="이메일" type="email" />
                <input id="password" placeholder="비밀번호" type="password"/>
                <button type="submit" onChange={handleSubmit}>로그인</button>
            </form>
        </div>
    )
}