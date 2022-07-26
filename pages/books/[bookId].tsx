import Link from "next/link";
import { useRouter } from "next/router";
import { useCurrentUser } from '../../lib';

export default function Detail({ data }) {
    
    const router = useRouter()
    const [user, { mutate }] = useCurrentUser();

    const notLogin = () => {
        alert('로그인이 필요합니다.')
        router.push('/signin')
    }

    return (
        <div>
            {data.item.map((content, index) => {
                return (
                    <div key={content.itemId}>
                        <h4>{content.title}</h4>
                        <img src={content.cover} alt="image" />
                        <p>작가: {content.author}</p>
                        <p>카테고리: {content.categoryName}</p>
                        <p>출판사: {content.publisher}</p>
                        <p>출시날짜: {content.pubDate}</p>
                        <p>줄거리: {content.description}</p>
                        <p>가격: {content.priceSales}</p>
                        <p>페이지: {content.subInfo.itemPage}</p>
                        {user ? 
                            <Link
                                href={{
                                    pathname: `/memo/${user._id}/complete/create`,
                                    query: {
                                        bookId: router.query.bookId,
                                        bookPage: content.subInfo.itemPage,
                                        bookTitle: content.title,
                                        bookDsc: content.description,
                                        bookAuthor: content.author,
                                        bookCover: content.cover
                                    }
                                }}
                                as={`/memo/${user._id}/complete/create`}
                                ><a>다 읽었어요</a></Link>
                                : <a onClick={notLogin}>다 읽었어요</a>
                        }
                        {user ?
                            <Link
                                href={{
                                    pathname: `/memo/${user._id}/progress/create`,
                                    query: {
                                        bookId: router.query.bookId,
                                        bookPage: content.subInfo.itemPage,
                                        bookTitle: content.title,
                                        bookDsc: content.description,
                                        bookAuthor: content.author,
                                        bookCover: content.cover
                                    }
                                }}
                                as={`/memo/${user._id}/progress/create`}
                            ><a>읽고 있어요</a></Link>
                            : <a onClick={notLogin}>읽고 있어요</a>
                        }
                    </div>
                )
                
            })}
        </div>
    );
}

export async function getServerSideProps(context) {
    const id = context.query.bookId
    
    const response = await fetch(`http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=ttblte08091534001&itemIdType=ISBN13&ItemId=${id}&output=js&Version=20131101`)
    const data = await response.json()
    return {
        props: {
            data
        },
    };
    
}