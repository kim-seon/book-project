import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCurrentUser } from '../../../lib';

export default function MyPage({ data }) {
    const [user, { mutate }] = useCurrentUser();

    const router = useRouter()

    const [dataList, setDataList] = useState([])
    const [bookList, setBookList] = useState([])
    const onClick = async (e) => {
        e.preventDefault()
        router.replace('/')
    }

    const loginUser = router.query.id

    useEffect(() => {
        axios.get('http://localhost:3000/api/user/memo/write')
            .then(res => {
                setDataList(res.data)
                dataList.map(async element => {
                    console.log(element.book)
                });
            })
    },[])

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
                    <ul>
                    {dataList.map((content, index) => {
                        return (
                            <li key={index}>
                                <div>
                                    <img src={content.bookCover} />
                                    <h4>{content.bookTitle}</h4>
                                    <p>{content.state}</p>
                                    <p>ISBN13: {content.book}</p>
                                    <p>작가: {content.bookAuthor}</p>
                                    <p>글쓴이{user.nickname}</p>
                                </div>
                            </li>
                        )
                    })}
                    </ul>
                </div>
                <span>파람{loginUser}</span>
            </div>
        </div>
    )
}

// export async function getServerSideProps(context) {
//         const res = await axios.get("http://localhost:3000/api/user/memo/write");
//         const data = res.data;
//             return { props: { data } }
//         // if (res.status === 200) {
//         //     const data = res.data;
//         //     return { props: { data } };
//         // } else return { props: {} };
// }