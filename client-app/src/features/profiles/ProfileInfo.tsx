import React from "react";
import {observer} from "mobx-react-lite";
import {Grid, Header, Icon, Item, Tab} from "semantic-ui-react";
import {Profile} from "../../app/models/profile";
import {useStore} from "../../app/stores/store";

interface Props {
    profile: Profile;
}

export default observer (function ProfileInfo ({profile}:Props){
    const {profileStore} = useStore();
    const {isCurrentUser} = profileStore;
    
    return(
        <Tab.Pane>
            
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Content verticalAlign="middle" >
                                <Icon name='user' size='big' />
                                <h1>About {profile.displayName}</h1>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
            </Grid>
           
        </Tab.Pane>
    )
})