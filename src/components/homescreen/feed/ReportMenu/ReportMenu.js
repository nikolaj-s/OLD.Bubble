import React from 'react'
import { Link } from 'react-router-dom';

import './ReportMenu.css';

export const ReportMenu = (props) => {

    const [selected, toggleSelected] = React.useState(null);

    const SpamSelect = (e) => {
        const value = e.currentTarget.value;
        toggleSelected(value);
        document.getElementById('other-issue').selectedIndex = 0;
    }

    const otherIssue = (e) => {
        const value = e.currentTarget.value;
        toggleSelected(value);
        document.getElementById('spam-abuse-selector').selectedIndex = 0;
    }

    const report = () => {
        if (!selected) return;

        props.report(selected);
    }

    return (
        <div className="report-menu-outer-container">
            <div onClick={props.close} className='close-report-menu-back'></div>
            <div className="report-menu-inner-container">
                <h3>Report Post</h3>
                <div className="report-options-button">
                    <h5>It's spam or abuse</h5>
                </div>
               
                <select onChange={SpamSelect} id="spam-abuse-selector">
                    <option value="select a rule">Select A Rule</option>
                    <option value="this is spam">This Is Spam</option>
                    <option value="this is abusive or harrasing">This Is Abusive Or Harassing</option>
                </select>
                <div className="report-options-button">
                    <h5>Other Issue</h5>
                </div>
                <select onChange={otherIssue} id="other-issue">
                    <option value="select issue">Select Issue</option>
                   {props.nsfw ? null : <option value="nsfw and not flagged">NSFW post that is not flagged</option>}
                    <option value="infringes my copy right">It infringes my copyright</option>
                    <option value="infringed my trademark rights">It infringed my trademark rights</option>
                    <option value="personal or confidential">It's personal or confidential information</option>
                    <option value='suggestive or sexual content involving minors'>It's sexual or suggestive content involving minors</option>
                    <option value="involuntary pornography">It's involuntary pornography</option>
                    <option value="transaction for prohibited goods or services">Its a transaction for prohibited goods or services</option>
                    <option value="some one is considering suicide or serious self harm">Some one is considering suicide or serious self harm</option>
                </select>
                <div className="report-menu-bottom-container">
                    <p className="report-read-content-policy">Read the Bubble <Link to='/content-policy'>Content Policy</Link></p>
                    <button onClick={props.close}>Close</button>
                    <button onClick={report}>Submit</button>
                </div>
            </div>
        </div>
    )
}
