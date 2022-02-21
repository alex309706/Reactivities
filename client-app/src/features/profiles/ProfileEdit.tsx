import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Form, Grid, Header, Icon, Input, Item, Tab, TextArea} from "semantic-ui-react";
import {Profile} from "../../app/models/profile";
import {useStore} from "../../app/stores/store";

interface Props {
    profile: Profile;
}

export default observer (function ProfileEdit ({profile}:Props){
    const {profileStore} = useStore();
    const {isCurrentUser} = profileStore;
    const [editMode, setEditMode] = useState(false);
    
    return(
        <Tab.Pane>
            <Grid width={15}>
                <Grid.Column>
                    <Icon name='user' size='big' />
                </Grid.Column>
                <Grid.Column width={12}>
                    <h1>About {profile.displayName}</h1>
                </Grid.Column>
                <Grid.Column width={3} textAlign='right'>
                    <Button
                        basic
                        onClick={ e => setEditMode(!editMode)}
                    >{!editMode ? 'Edit Profile' : 'Cancel'}</Button>
                </Grid.Column>
            </Grid>
            {editMode &&
            <Form>
                <Grid>
                    <Grid.Column width={16}>
                        <Input
                            type="text"
                            fluid
                            value = {currentName} 
                            onChange={e => setCurrentName(e.target.value) }
                        />
                    </Grid.Column>

                    <Grid.Column width={16}>
                        <TextArea />
                    </Grid.Column>

                    <Grid.Column width={16} textAlign='right'>
                        <Button color='green'
                        onClick={}
                        
                       >
                            Update 
                        </Button>
                    </Grid.Column>
                </Grid>
            </Form>}
           
        </Tab.Pane>
    )
})