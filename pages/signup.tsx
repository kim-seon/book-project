export default function SignUp() {
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email: e.target.email.value,
            nickname: e.target.nickname.value,
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
        const response = await fetch('http://localhost:3000/api/user/users', options)
        const result = await response.json()
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input id="email" placeholder="이메일" type="email" />
                <input id="nickname" placeholder="닉네임" />
                <input id="password" placeholder="비밀번호" type="password"/>
                <input id="passwordConfirm" placeholder="비밀번호 확인" type="password"/>
                <button type="submit" onChange={handleSubmit}>회원가입</button>
            </form>
        </div>
    )
}