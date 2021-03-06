import React, { useEffect } from "react";
import { IonCard, IonCardHeader, IonItem, IonCardContent, IonAvatar, IonReorder, IonLabel, IonReorderGroup, IonBadge, IonButton, IonCol, IonHeader, IonContent, IonPage, IonList, IonGrid, IonRow, IonIcon } from "@ionic/react";
import { ItemReorderEventDetail } from '@ionic/core';
import { deletePost, addToCart, getBook, searchBook } from "../../data/sessions/sessions.actions";

import * as selectors from '../../data/selectors';
import { connect } from "../../data/connect";
import { Books } from "../../models/books";
import BookCard from "../../components/BookCard";
import SearchBookBar from "../../components/SearchBookBar";
import {arrowForward, arrowBack } from "ionicons/icons";

interface OwnProps {

}

interface StateProps {
  books: Books;
}


interface DispatchProps {
  addToCart: typeof addToCart;
  getBook: typeof getBook;
  searchBook: typeof searchBook;
}


interface BookListProps extends OwnProps, StateProps, DispatchProps { };

const BookList = ({ books, addToCart, getBook, searchBook }: BookListProps) => {
  function doReorder(event: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    console.log('Drsagged from index', event.detail.from, 'to', event.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  const leftClick = ()=>{
    console.log("click left")
  }

  const rightClick = ()=>{
    console.log("click right")
  }
  
  useEffect(() => {

  }, [])

  return (
    <IonPage>
      <IonHeader>

      </IonHeader>
      <IonContent>
        <IonList>
          <SearchBookBar
            searchBook={searchBook}
          />

          <IonGrid fixed>
            <IonRow align-items-stretch>
              {books.data.documents.map(book => (
                <IonCol size="12" size-md="12">
                  <BookCard
                    key={book.bookId}
                    book={book}
                    addToCart={addToCart}
                    getBook={getBook}
                  />
                </IonCol>
              ))
              }
                  <IonIcon size="large" icon={arrowBack} onClick={leftClick}/>
                  <IonIcon size="large" icon={arrowForward} onClick={rightClick} />
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonPage>

  );
}

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    books: selectors.getBooks(state)
  }),
  mapDispatchToProps: {
    addToCart,
    getBook,
    searchBook
  },
  component: React.memo(BookList)
});