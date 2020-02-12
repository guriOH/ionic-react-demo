import React, { useEffect } from "react";
import { IonPage, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonList, IonGrid, IonRow, IonCol, IonTabBar, IonTabButton, IonIcon, IonLabel, IonButton } from "@ionic/react";
import { connect } from "../data/connect";
import { calendar, contacts, map, informationCircle, addCircle } from 'ionicons/icons';

import * as selectors from '../data/selectors';
import { Post } from "../models/post";
import { deletePost } from "../data/sessions/sessions.actions";
import PostCard from "../components/PostCard";

interface OwnProps { };

interface StateProps {
  posts: Post[];
};

interface DispatchProps {
  deletePost: typeof deletePost
 };

interface PostListProps extends OwnProps, StateProps, DispatchProps { };

const MainView = ({ posts,  deletePost }: PostListProps) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Board2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonGrid fixed>
            <IonRow align-items-stretch>

              {posts.map(post => (
                <IonCol size="12" size-md="6" key={post.id}>
                  <PostCard 
                    key={post.id}
                    post={post}
                    deletePost = {deletePost}
                    />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>

    </IonPage>
  );
}

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    posts: selectors.getPosts(state)
  }),
  mapDispatchToProps: {
    deletePost
  },
  component: React.memo(MainView)
});
