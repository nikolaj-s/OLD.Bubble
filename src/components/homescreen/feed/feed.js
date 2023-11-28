import React, { Component } from 'react'
import './feed.css';
import { feed, ReportPost } from '../../../util/postUtil/feedComs';
import { FeedPost } from './post/post';
import { Post } from '../../post/post';
import { CloseExapned } from './feedUtil/close_expanded';
import { FeedLoading } from './feedUtil/FeedLoading';

import {matchMedia} from '../../matchMedia';
import { PostLoading } from './post/PostLoading';
import { unFollow } from '../../../util/followComs';
import { FeedAlert } from './feedUtil/FeedAlert';
import { deletePost } from '../../../util/postUtil/postCommunication';
import { RefreshLoadingIcon } from './feedUtil/RefreshLoadingIcon';
import { ReportMenu } from './ReportMenu/ReportMenu';
import { FeedPlaceHolder } from './FeedPlaceHolder/FeedPlaceHolder';

export class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 5,
            posts: [],
            loading: true,
            morePosts: true,
            newPosts: false,
            selectedPost: "",
            openedPost: false,
            feedLoading: false,
            alert: false,
            alertMsg: "true",
            reMounting: false,
            desktopClose: false,
            refreshing: false,
            reportMenuOpen: false,
            selectedPostToReport: "",
            selectedPostNSFW: false
        }
        this.scroll = React.createRef();
        this.onScroll = this.onScroll.bind(this);
        this.getMorePosts = this.getMorePosts.bind(this);
        this.closeNewPostNotification = this.closeNewPostNotification.bind(this);
        this.closeExpandedView = this.closeExpandedView.bind(this);
        this.openExpandedView = this.openExpandedView.bind(this);
        this.scrollToTop = this.scrollToTop.bind(this);
        this.unFollow = this.unFollow.bind(this);
        this.toggleAlert = this.toggleAlert.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.fetchPosts = this.fetchPosts.bind(this);
        this.likePost = this.likePost.bind(this);
        this.unlikePost = this.unlikePost.bind(this);
        this.selectPostToReport = this.selectPostToReport.bind(this);
        this.closeReportMenu = this.closeReportMenu.bind(this);
        this.report = this.report.bind(this);

    }
    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.refreshing && !this.state.loading && !this.state.refreshing) {
            this.setState({count: 5, refreshing: true})
            setTimeout(() => {
                this.fetchPosts()
            }, 500)
        }
    }
    componentDidMount() {
        
        if (this.props.posts.length !== 0) {
            this.setState({loading: false, posts: this.props.posts, count: this.props.count, morePosts: this.props.morePosts, reMounting: true})
            document.getElementsByClassName('feed-container')[0].style.scrollBehavior = 'auto';
            setTimeout(() => {
                document.getElementsByClassName('remounting-transition')[0].style.opacity = '0';
                document.getElementsByClassName('feed-container')[0].scrollTo(0, this.props.scrollPosition);
                setTimeout(() => {
                    try {
                        document.getElementsByClassName('feed-container')[0].style.scrollBehavior = '';
                    } catch (e) {

                    }
                    this.setState({reMounting: false});
                }, 500)
            })
            
            return;
        }
        if (this.state.posts.length === 0) {
            this.fetchPosts();
        }
    }
    fetchPosts() {
        feed(this.state.count).then(res => {

            if (res.error === 'no posts') return this.setState({noPosts: true, loading: false});
            if (res.error) return;
            this.setState({posts: res.posts, loading: false, morePosts: res.morePosts})
            
        }).then(() => {
            this.props.stopRefreshing();
            this.props.updatePosts(this.state.posts, this.state.morePosts, this.state.count);
        }).then(() => {
            this.setState({refreshing: false})
        })
    }
    componentWillUnmount() {
        this.props.updatePosts(this.state.posts, this.state.morePosts, this.state.count);
        this.props.updateScrollPosition(this.scroll.current.scrollTop);
    }
    deletePost(id) {
        const newPosts = [];
     
        deletePost(id);

        this.state.posts.forEach(post => {
            if (post.id !== id) {
                newPosts.push(post);
            }
        })

        this.setState({posts: newPosts})
        this.props.updatePosts(newPosts, this.state.morePosts, this.state.count);
        this.toggleAlert('deleted');
    }
    toggleAlert(alert) {
        this.setState({alert: true, alertMsg: alert});

        setTimeout(() => {
            document.getElementsByClassName('feed-alert-container')[0].style.opacity = '0';
            setTimeout(() => {
                this.setState({alert: false, alertMsg: ""})
            }, 1000)
        }, 500)
    }
    unFollow(user) {
        const newPosts = [];
        this.state.posts.forEach(post => {
            if (post.username !== user) {
                newPosts.push(post);
            }
        })

        unFollow(user);

        this.setState({posts: newPosts});
        this.props.updatePosts(newPosts, this.state.morePosts, this.state.count);
        this.toggleAlert('unfollowed');
    }
    getMorePosts() {
        if (this.state.feedLoading) return;
        this.setState({feedLoading: true})
        let currentCount = this.state.count;
        currentCount+=10;
        feed(currentCount).then(res => {
            
            if (res.error) return;
            if (res.posts[0].id === undefined) return;
            if (res.posts[1].id !== this.state.posts[1].id) {
                this.setState({newPosts: true});
            }
            this.setState({posts: res.posts, feedLoading: false, morePosts: res.morePosts, count: currentCount})
        }).then(() => {
            this.props.updatePosts(this.state.posts, this.state.morePosts, this.state.count);
        })
    }
    onScroll() {
        const scroll = this.scroll.current;
        if ((scroll.scrollHeight - scroll.scrollTop) <= scroll.clientHeight + 700) {
            if (!this.state.loading && this.state.morePosts) {
                this.getMorePosts();
            }
            
        } 
    }
    scrollToTop() {
        document.getElementsByClassName('feed-container')[0].scrollTo(0, 0);
        this.setState({newPosts: false});
    }
    closeNewPostNotification() {
        this.setState({newPosts: false});
    }
    closeExpandedView(e) {
        
        if (this.state.openedPost === false) return;
        this.setState({desktopClose: false})
        document.getElementById('post_page').style.top = "100%";
        document.getElementById('post_page').style.transition = '0.5s'
        document.getElementsByClassName('post-button')[0].style = '';
        document.getElementsByClassName('close-opened-post')[0].style.display = 'none';
        setTimeout(() => {
            this.setState({selectedPost: "", openedPost: false});
        }, 1000)
            
    }
    openExpandedView(id) {
        if (this.state.openedPost) return;
        this.setState({selectedPost: id, openedPost: true, desktopClose: true});
        setTimeout(() => {
            
            document.getElementsByClassName('post_page')[0].style.top = '5px'
            document.getElementsByClassName('post_page')[0].style.bottom = '55px'
          
          //  document.getElementsByClassName('post_page')[0].style.height = '87%'
            if (matchMedia()) {
                return;
            }
            document.getElementsByClassName('post-button')[0].style.opacity = '0';
        }, 1)
    }
    clickEvent(e) {
        e.stopPropagation()
    }
    likePost(_id) {
        const name = this.props.name
        let current_posts = this.state.posts;
        const find_post = el => el.id === _id;
        const index = current_posts.findIndex(find_post);

        current_posts[index].liked = true;
        current_posts[index].likes.push(name);

        this.setState({posts: current_posts});
    }
    unlikePost(_id) {
        const name = this.props.name
        let current_posts = this.state.posts;
        const find_post = el => el.id === _id;
        const index = current_posts.findIndex(find_post);

        const likes = current_posts[index].likes.findIndex(el => el === name);
        

        current_posts[index].likes.splice(likes, 1);
        current_posts[index].liked = false;
        this.setState({posts: current_posts});
    }
    selectPostToReport(_id, nsfw)  {

        this.setState({selectPostToReport: _id, reportMenuOpen: true, selectedPostNSFW: nsfw});
    }
    closeReportMenu() {
        this.setState({reportMenuOpen: false, selectPostToReport: ""});
    }
    report(reason) {
    
        const posts = this.state.posts;
        
        const index = posts.findIndex(e => e.id === this.state.selectPostToReport);
        
        
       ReportPost(this.state.selectPostToReport, reason);

        posts.splice(index, 1);

        this.setState({alert: true, alertMsg: 'Reported', posts: posts, reportMenuOpen: false});

        setTimeout(() => {
            this.setState({alert: false})
        }, 600)


    }
    render() {
        return (
            <>
            <div className="feed">
                
                {
                    this.state.alert ?
                    <FeedAlert alert={this.state.alertMsg} /> 
                    :
                    null
                }

                {
                this.state.newPosts ? 
                <div className='new-post-notify'>
                    <p onClick={this.scrollToTop} className="new-posts">New Posts</p>
                    <div className='close-notify-container'>
                        <p onClick={this.closeNewPostNotification} className="close-notify">x</p>
                    </div>
                </div>
                :
                null
                }
                {this.state.reMounting ? <div className="remounting-transition"></div> : null}
                <div ref={this.scroll} onScroll={this.onScroll} className="feed-container">
                    {this.props.refreshing ? <RefreshLoadingIcon /> : null}
                    {
                    this.state.posts.length && !this.state.loading === 0 ? 
                    <FeedPlaceHolder />
                    :
                    this.state.posts.map(p => {
                            return (
                            <FeedPost likePost={this.likePost} 
                            unlikePost={this.unlikePost}
                            deletePost={this.deletePost} 
                            alert={this.toggleAlert} 
                            unFollow={this.unFollow} 
                            open={this.openExpandedView} 
                            blurNsfw={this.props.blurNsfw}
                            report={this.selectPostToReport}
                            key={p.id} post={p} />
                            
                            )
                        })
                    }
                    {this.state.feedLoading ? <PostLoading /> : null}
                    {this.state.loading ? <FeedLoading /> : null}
                    {
                    this.state.morePosts ? null : 
                    <div className="end-of-the-line-container">
                        <h2 className="end-of-the-line">Congrats! You Made It To The End</h2>
                    </div>
                    }
                    
                    {this.state.noPosts ? <h2 className="no-posts">No Posts! Something Is Up!</h2> : null}
                    
                </div>
                {this.state.desktopClose ? <div className="close-post-background" onClick={this.closeExpandedView} /> : null }
                {this.state.openedPost ? 
                <Post inFeed={true} selectedPost={this.state.selectedPost} />
                : 
                null}
               {this.state.reportMenuOpen ? <ReportMenu nsfw={this.state.selectedPostNSFW} report={this.report} close={this.closeReportMenu} /> : null}
            </div>
            {
                this.state.openedPost ? 
                <CloseExapned close={this.closeExpandedView} />
                :
                null
            }
            </>
        )
    }
}
