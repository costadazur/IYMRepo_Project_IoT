import React, {  useEffect } from 'react';

import { AuthService } from '../pages/AuthMainPage';
import { RouteComponentProps } from 'react-router';



interface EndRedirectPageProps extends RouteComponentProps {}

const EndRedirect : React.FC<EndRedirectPageProps> = (props: EndRedirectPageProps) => {

    useEffect(() => {
        AuthService.Instance.EndSessionCallBack();
        props.history.replace('landing');
    },[props.history]);

    return (
        <p>Signing out...</p>
    ); 
};

export default EndRedirect;
