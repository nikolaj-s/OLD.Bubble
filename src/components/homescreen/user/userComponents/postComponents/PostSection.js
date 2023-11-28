import React, { Component } from 'react'

import { PostPreview } from './PostPreview';

import {matchMedia} from '../../../../matchMedia'
import { AltPostPreview } from './AltPostPreview/AltPostPreview';

export class PostSection extends Component {
    
    randomKey() {
        const key = Math.random(Math.floor() * 578);
        return key;
    }
    render() {

        

        const posts = this.props.posts;

        const min = posts.length === 4 ? 1 : !matchMedia() ? 2 : 3;
        const max = !matchMedia() ? 3 : 4;
        let values = posts,
        chunks = posts.length === 4 ? [1, 2] : !matchMedia() ? [2, 3] : [3, 4],
        indexC = 0,
        indexV = 0,
        result = [];
        
        while (indexV < values.length) {
            result.push(values.slice(indexV, indexV += chunks[indexC]));
            indexC++;
            indexC %= chunks.length;
        }

        return (
            <>
                {
                this.props.altPrev ? 

                this.props.posts.map(p => {
                    return <AltPostPreview key={p.id} post={p} /> 
                })
                
                :
                
                result.map((arr, i) => {
                    return <PostPreview style={max / arr.length === 2 ? true : arr.length + 1 < min ? true : false} min={min} key={this.randomKey()} posts={arr} />
                })}

                <div className="bottom-nav-spacer"></div>
            </>
        )
    }
}
