import React from 'react';
import { observer } from 'mobx-react-lite';
import {Image, List, Popup} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {Profile} from '../../../app/models/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface Props {
    attendees: Profile[];
}

export default observer (function ActivityListItemAttendee ({attendees}: Props) {

    const  styles = {
        borderColor : 'orange',
        borderWidth : 2
    } 
    return (
        <List horizontal>
            {
                attendees.map(attendee => (
                    <Popup
                    hoverable
                    key={attendee.username}
                    trigger={
                        <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                            <Image 
                                size = 'mini' 
                                src={attendee.image ||  '/assets/user.png'} circular 
                                bordered
                                style = {attendee.following ? styles : null}
                            />
                        </List.Item>
                    }
                    >
                        <Popup.Content>
                            <ProfileCard profile={attendee} />
                        </Popup.Content>
                    </Popup>
                   
                ))
            }
        </List>
    )
});