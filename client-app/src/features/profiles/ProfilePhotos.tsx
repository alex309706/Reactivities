import React, {SyntheticEvent, useState} from "react";
import {observer} from "mobx-react-lite";
import {Button, Card, Grid, Header, Image, Tab} from "semantic-ui-react";
import {Photo, Profile} from "../../app/models/profile";
import {useStore} from "../../app/stores/store";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";

interface Props {
    profile: Profile;
}

export default  observer (function ProfilePhotos({profile}: Props){
    const {profileStore: {isCurrentUser,uploadPhoto, uploading, loading, setMainPhoto, deletePhoto, deleting}} = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');
    
    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false))
    }
    
    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);        
    }
    
    return(
     <Tab.Pane>
         <Grid>
             <Grid.Column width={16}>
                 <Header floated='left' icon='image' content='Photos'/>
                 {isCurrentUser && (
                     <Button basic floated='right' content={addPhotoMode ? 'Cancel' : 'Add photo'}
                             onClick={() => setAddPhotoMode(!addPhotoMode) }
                     />)}
             </Grid.Column>
             <Grid.Column width={16}>
                 {addPhotoMode ?  (
                     <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                 ) : (
                     <Card.Group itemsPerRow={5}>
                         {profile.photos?.map(photo => (
                             <Card key = {photo.id}>
                                 <Image src={photo.url}/>
                                 {isCurrentUser && (
                                     <Button.Group fluid widths={2}>
                                         <Button 
                                            content='Main'
                                            color='green'
                                            basic
                                            name={photo.id}
                                            disabled={photo.isMain}
                                            loading={loading && target === photo.id}
                                            onClick={e => handleSetMainPhoto(photo,e)}
                                         />
                                         <Button basic color='red' 
                                                 icon='trash'
                                                 onClick={e => handleDeletePhoto(photo,e)}
                                                 name={photo.id}
                                                 loading={deleting && target === photo.id}
                                                 disabled={photo.isMain}
                                         />
                                     </Button.Group>
                                 )}
                             </Card>
                         ))}
                     </Card.Group>
                 )}
             </Grid.Column>
           
                 
         </Grid>
        
     </Tab.Pane>   
    )
})
