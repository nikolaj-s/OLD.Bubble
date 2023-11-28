

import React from 'react'
import { PostContainer } from './PostContainer';

import { SubmenuButton } from '../../GlobalUiButtons/SubMenuButton';

import './TrendingPosts.css';

export const TopPostsOfTheDay = (props) => {

    const posts = props.posts;

    let values = posts,
    chunks = [2, 3],
    indexC = 0,
    indexV = 0,
    result = [];
        
    while (indexV < values.length) {
        result.push(values.slice(indexV, indexV += chunks[indexC]));
        indexC++;
        indexC %= chunks.length;
    }
    return (
        <div className="results">
            <h2>Trending</h2>
            <SubmenuButton open={props.toggleEditTrending} className="trending-post-container" />
            {props.posts.length === 0 ? <h5>No New Posts Today</h5> : null}
            {
                result.map((p, i) => {
                    return <PostContainer blurNsfw={props.blurNsfw} padding={!result ? result.length > 1 ? result[i].length === result[i--].length ? true : false : false : false} toggleMenu={props.toggleMenu} key={i * 5} posts={p} />
                })
            }
        </div>
    )
}
