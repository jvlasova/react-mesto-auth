import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CardContext } from '../contexts/CardContext';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCard, setCurrentCard] = React.useState([]);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

  React.useEffect(() => {
    api.getUserInfo()
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((error) => {
      console.log(error);
    });
    api.getCardList()
    .then ((data) => {
      setCurrentCard(data);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  React.useEffect(()=> {
    function onCloseEsc (evt) {
      if (evt.key === 'Escape') {closeAllPopups()}
    }
    document.addEventListener('keydown', onCloseEsc);
    return () => {document.removeEventListener('keydown', onCloseEsc);
    }
  })

  function onCloseOverlay (evt) {
    (evt.target === evt.currentTarget) && closeAllPopups()
  }

  function closeAllPopups () {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({name: '', link: ''});
  }  

  function handleCardLike (card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
   
    api.changeLikeCardStatus(card._id, (!isLiked ? 'PUT' : 'DELETE'))
      .then((newCard) => {
        setCurrentCard(currentCard => {
          return currentCard.map( c => {return c._id === card._id ? newCard : c})
        });
      })
      .catch ((err) => {
          console.log (err);
      })
  }

  function handleCardDelete (card) {
    api.deleteCard(card._id)
      .then (() => {
        setCurrentCard(currentCard => {
          return currentCard.filter(c => {return c._id !== card._id})
        })
        closeAllPopups()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  function handleUpdateUser (data) {
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch ((err) => {
        console.log (err);
      })
  }

  function handleUpdateAvatar (data) {
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch ((err) => {
        console.log (err);
      })
  }

  function handleAddPlaceSubmit (data) {
    api.addCard(data)
    .then((newCard) => {
        setCurrentCard([newCard, ...currentCard])
        closeAllPopups()
    })
    .catch ((err) => {
        console.log (err);
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={currentCard}>
        <div className="root">
          <div className="page">
            <Header />
            <Main
              onEditProfile={setIsEditProfilePopupOpen}
              onEditAvatar={setIsEditAvatarPopupOpen}
              onAddPlace={setIsAddPlacePopupOpen}
              cards = {currentCard}
              onCardClick={setSelectedCard}
              onCardLike = {handleCardLike}
              onCardDelete = {handleCardDelete}
            />
            <Footer />
            
            <EditProfilePopup 
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onCloseOverlay = {onCloseOverlay}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup 
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onCloseOverlay = {onCloseOverlay}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onCloseOverlay ={onCloseOverlay}
              onUpdatePlace={handleAddPlaceSubmit}
            />
            <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да">
            </ PopupWithForm>
            <ImagePopup 
              card={selectedCard} 
              onClose={closeAllPopups} 
              onCloseOverlay={onCloseOverlay} />
          </div>
        </div>
      </ CardContext.Provider>  
    </ CurrentUserContext.Provider>
  );
}

export default App;
