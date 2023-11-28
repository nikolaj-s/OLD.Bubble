import React, { Component} from 'react'
import { getPost, deletePost } from '../../util/postUtil/postCommunication';
import './post.css'
import { Image } from './image'; 
import { Video } from './video';
import { Website } from './website';
import history from '../history';
import { Close } from './closeExpanded';

import { DeleteButton } from './deleteButton';
import { BottomPost } from './PostBottomComponent/BottomPost';
import { imageNightMode } from '../menu/NightMode/nightModeFunction';
import { SubLoading } from '../loading/subLoading/SubLoading';
import { BackButton } from '../icons/BackButton';
import { matchMedia } from '../matchMedia';
import { SubmenuButton } from '../GlobalUiButtons/SubMenuButton';
import { PostSubMenu } from './PostSubMenu/PostSubMenu';
import { ReportMenu } from '../homescreen/feed/ReportMenu/ReportMenu';
import { PinPost, ReportPost } from '../../util/postUtil/feedComs';
import { Error } from '../error/error';
import { Pin } from './pin/Pin';



export class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            images: [], 
            videos: [], 
            website: [], 
            post: "", 
            username: "", 
            date: "", 
            clicks: 0, 
            toggleBig: false,
            comments: 0,
            loading: true,
            yourPost: false,
            subMenuOpen: false,
            reportMenuOpen: false,
            nsfw: false,
            error: false,
            pinned: false
        }
        
        this.generateRandomKey = this.generateRandomKey.bind(this);
        this.expandContent = this.expandContent.bind(this);
        this.goToUser = this.goToUser.bind(this);
        this.deletePost = this.deletePost.bind(this);
        this.fetchPost = this.fetchPost.bind(this);
        this.toggleSubMenu = this.toggleSubMenu.bind(this);
        this.toggleReportMenu = this.toggleReportMenu.bind(this);
        this.closeError = this.closeError.bind(this);
        this.report = this.report.bind(this);
        this.pin = this.pin.bind(this);
    }
    UNSAFE_componentWillUpdate(newProps) {
        if (!this.state.id || window.location.pathname === '/') return;
        if (newProps.match.params.id !== this.state.id) {
            this.fetchPost(newProps.match.params.id)
        }
       
    }
    fetchPost(post_id) {
        getPost(post_id).then(post => {

            if (!post) return;
            this.setState({
                id: post_id,
                username: post.username,
                clicks: post.clicks,
                date: post.date.split('T')[0],
                post: post.text,
                images: post.image,
                videos: post.video,
                website: post.website,
                comments: post.comments,
                yourPost: post.yourPost,
                loading: false,
                deleteLoading: false,
                nsfw: post.nsfw,
                pinned: post.pinned
            })
        })
    }
    componentDidMount() {
        
        const post_id = window.location.pathname.split('/')[2] || this.props.selectedPost;
        this.fetchPost(post_id);
        if (this.props.inFeed) {
            if (matchMedia()) {
               document.getElementById('post_page').style.left = '24%';
            }
        }
    }
    expandContent(e) {
        if (e.target.classList.length === 0) {
            e.target.classList.add('expanded')
            e.target.controls = true;
            e.target.style.objectFit = "contain"
            e.target.style.height = "100%"
            e.target.style.border = "solid black 2px"
            document.getElementsByClassName('post-button')[0].style.display = 'none'
            document.getElementsByClassName('close-expanded')[0].style.display = 'block';
            document.getElementsByClassName('bottomNav')[0].style.display = 'none';
            try {
                document.getElementsByClassName('close-opened-post')[0].style.display = 'none'
            } catch(error) {

            }
        } else {
            e.target.classList.remove('expanded')
            e.target.controls = false
            e.target.style = ""
            e.target.style.filter = imageNightMode();
            document.getElementsByClassName('bottomNav')[0].style = '';
            document.getElementsByClassName('post-button')[0].style = ''
            document.getElementsByClassName('close-expanded')[0].style.display = 'none';
            try {
                document.getElementsByClassName('close-opened-post')[0].style = ''
            } catch(error) {

            }
        }
    }
    componentWillUnmount() {
        document.getElementsByClassName('post-button')[0].style = ''
        document.getElementsByClassName('bottomNav')[0].style = '';
        try {
            document.getElementsByClassName('close-opened-post')[0].style.display = ''
        } catch(error) {

        }
    }
    generateRandomKey(k) {
        return this.state.username + Math.random() * k
    }
    goToUser() {
        history.push(`/user/${this.state.username}`)
    }
    closeExpanded() {
        history.push(window.location.pathname);
        document.getElementsByClassName('close-expanded')[0].style.display = 'none';
        document.getElementsByClassName('bottomNav')[0].style = '';
        try {
            document.getElementsByClassName('close-opened-post')[0].style = ''
        } catch(error) {

        }
    }
    deletePost() {
        this.setState({deleteLoading: true});
        if (this.state.yourPost) {
            deletePost(this.state.id).then((res) => {
                if (res === false) {
                    history.push(`/user/${this.state.username}`);
                }
            })
        }
    }
    toggleSubMenu() {
        if (this.state.subMenuOpen) {
            this.setState({subMenuOpen: false})
        } else {
            this.setState({subMenuOpen: true});
        }
    }
    toggleReportMenu() {
        this.setState({subMenuOpen: false})

        if (this.state.reportMenuOpen) {
            this.setState({reportMenuOpen: false})
        } else {
            this.setState({reportMenuOpen: true});
        }
    }
    report(reason) {

        this.setState({deleteLoading: true});

        ReportPost(this.state.id, reason).then(res => {
            if (res.error) {
                this.setState({error: res.error, deleteLoading: false});
                return;
            }
            history.goBack();
        })

    }
    pin() {
        this.setState({pinned: true});
        PinPost(this.state.id).then(res => {
            if (res.error) {
                this.setState({error: res.error})
                return;
            }
            this.setState({error: "Pinned"});
        })
    }
    closeError() {
        this.setState({error: false})
    }
    render() {
        
        return (
            <div style={this.props.inFeed ? {top: '100%', transition: '0.5s', position: "fixed", marginTop: '45px'} : this.props.inFeed && !matchMedia() ? {top: '100%', transition: '0.5s', left: '24%', position: "fixed", marginTop: '53px'} : null} id="post_page" className="post_page">
                {this.state.deleteLoading ? <SubLoading /> : null}
                <Close close={this.closeExpanded} />
                {this.state.error ? <Error  message={this.state.error} action={this.closeError} /> : null}
                {this.state.subMenuOpen ? <PostSubMenu openReportMenu={this.toggleReportMenu} toggle={this.toggleSubMenu} /> : null}
                {this.state.reportMenuOpen ? <ReportMenu report={this.report} nsfw={this.state.nsfw} close={this.toggleReportMenu} /> : null}
                <div className="post-user-container">
                    {window.location.pathname !== '/' ? this.state.loading ? null : <BackButton className="post-goback-button" /> : null}
                    {this.state.loading ? <div className="post-username-loading loading-gradient"></div> :<h2 style={{marginLeft: window.location.pathname !== '/' ? '3rem' : '1rem'}} onClick={this.goToUser}>{this.state.username}</h2>}
                    <div className="date-delete-container">
                        {this.state.loading ? null : <p className="date-and-time-stamp-post">Posted: {this.state.date}</p>}
                        {this.state.loading ? null : this.state.yourPost && !this.state.pinned ? <Pin action={this.pin} /> : null}
                        {
                        this.state.loading ? null :
                        this.state.yourPost ? <DeleteButton onClick={this.deletePost} /> : <SubmenuButton className="post-submenu-button" classList="post-submenu" open={this.toggleSubMenu} />
                        }
                    </div>  
                </div>
                <div className="content-container">
                    {this.state.loading ?
                    <>
                    <div className="content-loading loading-gradient"></div>
                    </>
                     :
                    this.state.images.map(i => {
                        return <Image expand={this.expandContent} key={this.generateRandomKey(6)} image={i} />
                    })}
                    {this.state.videos.map(v => {
                        return <Video expand={this.expandContent} key={this.generateRandomKey(4)} video={v} />
                    })}
                </div>
                {this.state.loading ? null :
                <div className="website-outer-container">
                    {this.state.website.map(w => {
                        return <Website key={this.generateRandomKey(3)} website={w} />
                    })}
                </div>}
                {this.state.loading ?
                <div className="text-loading loading-gradient"></div>
                 :
                <div className="post_text">
                    <p style={{filter: imageNightMode(), color: imageNightMode() ? "white" : "black"}}>
                        {this.state.post}
                    </p>
                </div>}
                <BottomPost id={this.state.id} commentCount={this.state.comments}  clicks={this.state.clicks} loading={this.state.loading} />
            </div>
        )
    }
}


