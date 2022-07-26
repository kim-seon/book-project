import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function SignUp() {
    const router = useRouter()
    const [emailErrorMsg, setEmailErrorMsg] = useState('')
    const [nickErrorMsg, setNickErrorMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email: e.target.email.value,
            nickname: e.target.nickname.value,
            password: e.target.password.value
        }
        
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data),
        }
        const response = await fetch('/api/user/users', options)
        const result = await response.json()
        switch(response.status) {
            case 201:
                alert('가입 완료!')
                router.replace("/signin");
                break
            case 401:
                setEmailErrorMsg('이미 존재하는 이메일입니다.')
                break
            case 402:
                setNickErrorMsg('이미 존재하는 닉네임입니다.')
                break
        }
        
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input id="email" placeholder="이메일" type="email" />
                {emailErrorMsg ? <p>{emailErrorMsg}</p> : <></>}
                <input id="nickname" placeholder="닉네임" />
                {nickErrorMsg ? <p>{nickErrorMsg}</p> : <></>}
                <input id="password" placeholder="비밀번호" type="password"/>
                <input id="passwordConfirm" placeholder="비밀번호 확인" type="password"/>
                <button type="submit" onChange={handleSubmit}>회원가입</button>
            </form>
        </div>
    )
}