import Link from "next/link";
import { useRouter } from "next/router";
import { useCurrentUser } from '../../lib';

export default function Detail({ params }) {
    const [ title, id ] = params
    const router = useRouter()
    const [user, { mutate }] = useCurrentUser();

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
            <Link
                href={{
                    pathname: `/record/${user._id}/complete/create`,
                    query: {
                        bookId: router.query.itemId
                    }
                }}
                as={`/record/${user._id}/complete/create`}
            ><a>다 읽었어요</a></Link>
            <a>읽고 있어요</a>
        </div>
    );
}

export function getServerSideProps({ params: { params } }) {
    return {
        props: {
            params
        },
    };
}