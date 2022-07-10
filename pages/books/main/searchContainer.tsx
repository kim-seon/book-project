import { useRouter } from "next/router"
import { useState } from "react"

export default function SearchContainer() {
    const router = useRouter()
    const [SearchInput, setSearchInput] = useState("")

    const onChange = (e) => {
        setSearchInput(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        router.push(
            {
                pathname: `/books/search/${SearchInput}`,
                query: {
                    keyword: SearchInput
                }
            },
            `/books/search/${SearchInput}`
        )
        setSearchInput("")
    }

    return (
        <div>
            <input onChange={onChange} value={SearchInput} />
            <button onClick={handleSubmit}>검색</button>
        </div>
    )
}
