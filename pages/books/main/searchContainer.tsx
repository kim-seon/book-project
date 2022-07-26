import { useRouter } from "next/router"
import { useState } from "react"
import styles from '../../../styles/Search.module.css'

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
        <div className={styles.main}>
            <input className={styles.searchInput} onChange={onChange} value={SearchInput} />
            <button className={styles.searchBtn} onClick={handleSubmit}>검색</button>
        </div>
    )
}
