import Link from "next/link";
import { useRouter } from "next/router";

export default function MyPage({ id }) {
    console.log(id)
    const router = useRouter()
    const onClick = async (e) => {
        e.preventDefault()
        router.replace('/')
    }
    return (
        <div>
            <a onClick={onClick}>홈으로</a>
            <div>
                <ul>
                    <li><a>전체</a></li>
                    <li><a>다 읽었어요</a></li>
                    <li><a>읽고 있어요</a></li>
                </ul>
                <div>
                    
                </div>
            </div>
        </div>
    )
}