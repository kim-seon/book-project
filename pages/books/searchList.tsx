export default function Detail({posts}) {

    return (
        <div>
            <ul>
                {posts.item.map((post, index) => {
                    return (
                        <li key={index}>{post.title}</li>
                    )
                })}
            </ul>
        </div>
    )
}