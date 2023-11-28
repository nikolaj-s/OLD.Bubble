import React from 'react'

export const PostSubMenu = (props) => {
    const close = (e) => {
        e.stopPropagation();
        props.close()
    }
    const unFollow = (e) => {
        e.stopPropagation();
        props.unFollow();
        props.close();
    }
    const copy = (e) => {
        e.stopPropagation();
        const link = window.location.href + `post/${props.id}`;
   
        e.target.parentElement.parentElement.children[1].value = link;
        e.target.parentElement.parentElement.children[1].select();
        e.target.parentElement.parentElement.children[1].setSelectionRange(0, 99999);
        document.execCommand('copy');
        props.alert('copied');
        props.close();
    }
    const deletePost = (e) => {
        e.stopPropagation();
        props.delete();
        props.close();
    }
    return (
        <div onClick={close} className="post-sub-menu-container">
            <div className="post-sub-menu-inner-container">
                {props.yourPost ? null : <button onClick={unFollow} className="sub-top-button">Unfollow</button>}
                <button onClick={copy} className={props.yourPost ? 'sub-top-button' : null}>Copy Link</button>
                {props.yourPost ? <button onClick={deletePost} className="sub-bottom-button">Delete</button> : <button onClick={props.report} className="sub-bottom-button">Report</button>}
            </div>
            <textarea readOnly style={{visibility: 'invisible', width: 0, height: 0, position: 'absolute', opacity: 0}}  ></textarea>
        </div>
    )
}
