import React from 'react'
import { getPublicPost } from '../../util/PublicRoutes/GetPublicPost'
import { CopyRight } from '../copyRight/CopyRight'
import { Nav } from '../homeNav/nav'
import { getTimeDif } from '../TimeDifference'
import {Helmet} from "react-helmet"
import "./Public.css"

export const Public = (props) => {

    

    const [post, setPost] = React.useState({})

    const [hidden, setHidden] = React.useState(false)

    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const post_id = window.location.pathname.split('/')[2]

        getPublicPost(post_id).then(res => {
            console.log(res)
            if (res.private) {
                setHidden(true)
                setPost(res)
            } else {
                setPost(res)
            }
            setLoading(false)
        })
    }, [])

    const createAccount = (e) => {
        e.preventDefault()

        window.location.pathname = "/sign-up"
    }

    console.log(post)
    return (
        <div className="public-viewing-container">
            <Helmet>
                <meta property="og:title" content={post.post_text} />
                <meta property="og:description" content={"Post by " + post.user_name}   />
                <meta property="og:image" content={post.post_image}  />
                <meta property="og:url" content={window.location.href} />
                <meta name="twitter:card" content="summary" />
            </Helmet>
            <Nav public={true} />
            <div className="public-post-container">
                <div className="top-public-post">
                    {loading ? 
                    <div className="public-profile-picture-container loading-gradient"></div>
                    :
                    <div className="public-profile-picture-container">
                        <img src={post.user_image} alt="user-profile" />
                    </div>}
                    <h2>{post.user_name}</h2>
                    <p>{getTimeDif(post.date)}</p>
                </div>
                {loading ? 
                <div className="public-content-container loading-gradient"></div>
                :
                <div className="public-content-container">
                    {hidden ? 
                    <p>Looks like this user's account is private, please create an account and follow this user to view their posts !</p>
                    :
                    <img src={post.post_image} alt="post" />}
                </div>}
                {hidden ? null : <div className="public-text-container">
                    <p>{post.post_text}</p>
                </div>}
                <div className="make-an-account-container">
                    <button onClick={createAccount}>Create An Account</button>
                    <h3>Create an account to interact with posts, view user accounts, make friends, groups, and socialize</h3>
                    <p>The Bubble Network Is improving bit by bit every day!</p>
                    <CopyRight />
                </div>
            </div>
        </div>
    )
}
