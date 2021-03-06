import Link from "next/link";
import { useRouter } from "next/router";

const ttbKey = 'ttblte08091534001'

export default function Search({ data }) {
    console.log(data)
    return (
        <div>
            {data.item.map((post, index) => {
                return (
                    <div key={post.isbn13}>
                        <Link
                            href={{
                                pathname: `/books/${post.isbn13}`,
                                query: {
                                    title: post.title,
                                    cover: post.cover,
                                    author: post.author,
                                    publisher: post.publisher,
                                    pubDate: post.pubDate,
                                    description: post.description,
                                    categoryName: post.categoryName,
                                    priceSales: post.priceSales
                                }
                            }}
                            as={`/books/${post.isbn13}`}
                        >
                            <h4>{post.title}</h4>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export async function getServerSideProps(context) {
    const keyword = context.query.keyword
    const response = await fetch(`http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=ttblte08091534001&Query=${keyword}&QueryType=Keyword&MaxResults=12&start=1&SearchTarget=Book&output=js&Version=20131101`)
    const data = await response.json()
    return {
        props: {
            data
        }
    };
}