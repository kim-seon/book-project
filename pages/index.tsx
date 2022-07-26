import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import SearchContainer from './books/main/searchContainer';
import { useCurrentUser } from '../lib';




export default function Home({newPosts, bestPosts, rcmPosts}) {
    const [user, { mutate }] = useCurrentUser();

    const handleLogout = async () => {
        const data = {
            id: user ? user._id : null
        }
        const JSONdata = JSON.stringify(data)
        await fetch('/api/user/auth', {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSONdata
        });
        mutate(null);
    }

    return (
        <div>
            <div className={styles.navMenu}>
                <ul className={styles.menu}>
                    <li>
                        {user ? <a>{user.nickname}</a> : <Link href='/signup'>회원가입</Link>}
                    </li>
                    <li>
                        {user ? <a onClick={handleLogout}>로그아웃</a> : <Link href='/signin'>로그인</Link>}
                    </li>
                    <li>
                        {user ? <Link
                                    href={{
                                        pathname: `/memo/${user._id}`,
                                        query: {
                                            id: user._id,
                                            nickname: user.nickname
                                        }
                                    }}
                                    as={`/memo/${user._id}`}
                                >
                            <a className={styles.myBookshelf}>내 책장</a>
                        </Link> : <></> }
                    </li>
                </ul>
            </div>
            <SearchContainer />
            <div className={styles.itemList}>
                <div className={styles.postList}>
                    <h3>신간 Top5</h3>
                    {newPosts.item.map((post: any, index: number) => {
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
                                            priceSales: post.priceSales,
                                            page: post.startIndex
                                        }
                                    }}
                                    as={`/books/${post.isbn13}`}
                                >
                                    <p>{index+1} {post.title}</p>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.postList}>
                    <h3>베스트셀러 Top5</h3>
                    {bestPosts.item.map((post: any, index: number) => {
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
                                    <p>{index+1} {post.title}</p>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.postList}>
                    <h3>블로거 추천 Top5</h3>
                    {rcmPosts.item.map((post: any, index: number) => {
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
                                    <p>{index+1} {post.title}</p>
                                </Link>
                            </div>
                        )
                    })}
                </div>
                
            </div>
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
        fetchJson(`http://localhost:3000/api/rcmBookList`),
    ])

    return {
        props: {
            newPosts: newBook,
            bestPosts: bestBook,
            rcmPosts: rcmBook
        }
    }
}