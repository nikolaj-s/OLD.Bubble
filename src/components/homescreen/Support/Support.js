import React from 'react'
import { SendSupportRequest } from '../../../util/support/supportComs';
import { CopyRight } from '../../copyRight/CopyRight';
import { Error } from '../../error/error';
import history from '../../history';
import { SubLoading } from '../../loading/subLoading/SubLoading';

import './Support.css';

export const Support = (props) => {

    const [loading, setLoading] = React.useState(false);

    const [request, setRequest] = React.useState("");

    const [sent, toggleSent] = React.useState(false);

    const [error, setError] = React.useState(false);

    const updateRequest = (e) => {
        setRequest(e.currentTarget.value);
    } 

    const sendSupportRequest = (e) => {
        e.preventDefault();
        if (!request) return;
        if (request.length > 500) return;

        setLoading(true);

        SendSupportRequest(request).then(res => {
            if (res.error) {
                setError(res.error);
                setLoading(false);
                return;
            }
            toggleSent(true);
            setLoading(false);
        })
    }

    const closeError = () => {
        setError(false);
    }

    const goBack = () => {
        history.goBack();
    }

    return (
        <div className="outer-support-container">
            <div className="inner-support-container">
                {loading ? <SubLoading /> : null}
                {error ? <Error message={error} action={closeError} /> : null}
                <h3>The Bubble Support Page</h3>
                {
                sent ? 
                <>
                <p>Your Support Request has been sent, you will find a confirmation email in your inbox and we will be in contact with you within 3 business days, thank you</p>
                <button className="go-back-button-support" onClick={goBack}>Go Back</button>
                </>
                :
                <>
                <p>Have a bug to report, feature request, user to report, please send us a support request.</p>
                <textarea value={request} onChange={updateRequest} maxLength="500" id="support-request-input" placeholder="Support Request"></textarea>
                <div className="word-count-container">
                    <h4>{request.length} / 500</h4>
                </div>
                <button onClick={sendSupportRequest}>Send Request</button>
                </>
                }
                <CopyRight />
            </div>
        </div>
    )
}
