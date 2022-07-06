import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useRouter } from 'next/router'


const ttbKey = 'ttblte08091534001'

export default function Home({posts}) {
    const router = useRouter()
    const [SelectList, setSelectList] = useState("")

    const handleListChangeOption = (e) => {
        setSelectList(e.target.value)
        console.log(SelectList)
    }

    // const onClick = (id, title, cover, author, publisher, pubDate, description, isbn13, categoryName, priceSales) => {
    //     router.push(
    //         {
    //             pathname: `/books/${title}/${id}`,
    //             query: {
    //                 title,
    //                 cover,
    //                 author,
    //                 publisher,
    //                 pubDate,
    //                 description,
    //                 isbn13,
    //                 categoryName,
    //                 priceSales
    //             }
    //         },
    //         `/books/${title}/${id}`
    //     )
    // }

    return (
        <div>
            <label><input type="radio" name="bookList" value="ItemNewSpecial" defaultChecked onChange={handleListChangeOption}/>신간 Top3</label>
            <label><input type="radio" name="bookList" value="Bestseller" onChange={handleListChangeOption} />베스트셀러 Top3</label>
            <label><input type="radio" name="bookList" value="BlogBest" onChange={handleListChangeOption} />블로거베스트 Top3</label>
            {posts.item.map((post, index) => {
                return (
                    <div key={post.itemId}>
                        <Link
                            href={{
                                pathname: `/books/${post.title}/${post.itemId}`,
                                query: {
                                    title: post.title,
                                    cover: post.cover,
                                    author: post.author,
                                    publisher: post.publisher,
                                    pubDate: post.pubDate,
                                    description: post.description,
                                    isbn13: post.isbn13,
                                    categoryName: post.categoryName,
                                    priceSales: post.priceSales
                                }
                            }}
                            as={`/books/${post.title}/${post.itemId}`}
                        >
                            <h4>{post.title}</h4>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export const getServerSideProps = async () => {
    const res = await fetch(`http://localhost:3000/api/bookList`)
    const data = await res.json()
    return {
        props: {
            posts: data
        }
    }
}