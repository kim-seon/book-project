import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import SearchContainer from './books/main/searchContainer';

// async function ListMap(posts) {
//     {posts.item.map((post, index) => {
//         return (
//             <div key={post.itemId}>
//                 <Link
//                     href={{
//                         pathname: `/books/${post.title}/${post.itemId}`,
//                         query: {
//                             title: post.title,
//                             cover: post.cover,
//                             author: post.author,
//                             publisher: post.publisher,
//                             pubDate: post.pubDate,
//                             description: post.description,
//                             isbn13: post.isbn13,
//                             categoryName: post.categoryName,
//                             priceSales: post.priceSales
//                         }
//                     }}
//                     as={`/books/${post.title}/${post.itemId}`}
//                 >
//                     <h4>{post.title}</h4>
//                 </Link>
//             </div>
//         )
//     })}
// }

export default function Home({newPosts, bestPosts, rcmPosts}) {
    return (
        <div>
            <Link href='/signup'>회원가입</Link>
            <SearchContainer />
            <h3>신간 Top5</h3>
            {newPosts.item.map((post, index) => {
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
            <h3>베스트셀러 Top5</h3>
            {bestPosts.item.map((post, index) => {
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
            <h3>블로거 추천 Top5</h3>
            {rcmPosts.item.map((post, index) => {
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

async function fetchJson(url) {
    return (await fetch(url)).json()
}

export const getServerSideProps = async () => {
    const [newBook, bestBook, rcmBook] = await Promise.all([
        fetchJson(`http://localhost:3000/api/newBookList`),
        fetchJson(`http://localhost:3000/api/bestBookList`),
        fetchJson(`http://localhost:3000/api/rcmBookList`)
    ])
    return {
        props: {
            newPosts: newBook,
            bestPosts: bestBook,
            rcmPosts: rcmBook
        }
    }
}