
import { useRouter } from "next/router";

export default function Detail({ params, results }) {
    const [ title, id ] = params
    const router = useRouter()
    console.log(router)
    return (
        <div>
            <p>{title}</p>
            <img src={router.query.cover} alt="image" />
            <p>{router.query.author}</p>
            <p>{router.query.categoryName}</p>
            <p>{router.query.publisher}</p>
            <p>{router.query.pubDate}</p>
            <p>{router.query.isbn13}</p>
            <p>{router.query.description}</p>
            <p>{router.query.priceSales}</p>
        </div>
    );
}

export function getServerSideProps({ params: { params } }) {
    return {
        props: {
            params,
        },
    };
}