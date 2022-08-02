import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Api from '../utils/Api';
import * as AuthApi from '../utils/AuthApi';
import ProtectedRoute from './ProtectedRouter';
import Register from './Register';
import Login from './Login';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCard, setCurrentCard] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const navigate = useNavigate();
  
  React.useEffect(() => {
    Api.getUserInfo()
    .then((data) => {
      setCurrentUser(data);
    })
    .catch((error) => {
      console.log(error);
    });
    Api.getCardList()
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
    setIsInfoTooltip(false);
    setSelectedCard({name: '', link: ''});
  } 

  const auth = async (jwt) => {
    const content = await AuthApi.getContent(jwt).then(() => {
      if (email) {
        setLoggedIn(true);
        setEmail(email);
      }
    })
    return content;
  }

  React.useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth(jwt);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      navigate('/');
    }
  }, [loggedIn])

  function handleInfoTooltip (outcome) {
    setIsInfoTooltip({ ...isInfoTooltip, isOpen: true, ok: outcome });
  }
  
  function handleRegister (email, password) {
    AuthApi.register(email, password)
    .then((res) => {
      if (res) {
        handleInfoTooltip(true);
        navigate('/sign-in');
      }
    })
    .catch((err) => {
      handleInfoTooltip(false);
      console.log(err);
    })
  }

  function handleLogin (email, password) {
    AuthApi.authorize(email, password)
      .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        setEmail(email);
        navigate('/');
      }
      })
      .catch((err) => {
        console.log(err);
        console.log(email, password);
      })
  }

  function handleCardLike (card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
   
    Api.changeLikeCardStatus(card._id, (!isLiked ? 'PUT' : 'DELETE'))
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
    Api.deleteCard(card._id)
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
    Api.setUserInfo(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch ((err) => {
        console.log (err);
      })
  }

  function handleUpdateAvatar (data) {
    Api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch ((err) => {
        console.log (err);
      })
  }

  function handleAddPlaceSubmit (data) {
    Api.addCard(data)
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
      <div className="root">
        <div className="page">
          <Header email={email} buttonText='Выйти' />
            <Routes>
              <Route 
                path="/sign-in" 
                element={
                  <>
                <Login onLogin={handleLogin} />
                </>
              }
              />
              <Route
                path="/sign-up" 
                element={<Register onRegister={handleRegister} />}
              />
              <Route element={
                <>
                  {loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />}
                </>}
              />
            
              <Route
                path="/"
                element={
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    component={Main} 
                    onEditProfile={setIsEditProfilePopupOpen}
                    onEditAvatar={setIsEditAvatarPopupOpen}
                    onAddPlace={setIsAddPlacePopupOpen}
                    cards={currentCard}
                    onCardClick={setSelectedCard}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                }
              />
            </Routes>

            <Footer />
            
            <EditProfilePopup 
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onCloseOverlay ={onCloseOverlay}
              onUpdateUser={handleUpdateUser}
            />
            <EditAvatarPopup 
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onCloseOverlay={onCloseOverlay}
              onUpdateAvatar={handleUpdateAvatar}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onCloseOverlay={onCloseOverlay}
              onUpdatePlace={handleAddPlaceSubmit}
            />
            <PopupWithForm name="confirm" title="Вы уверены?" buttonText="Да">
            </ PopupWithForm>
            <ImagePopup 
              card={selectedCard} 
              onClose={closeAllPopups} 
              onCloseOverlay={onCloseOverlay} 
            />
            <InfoTooltip
              outcome={isInfoTooltip} 
              onClose={closeAllPopups} 
              onCloseOverlay={onCloseOverlay}
            />
          </div>
        </div>
    </ CurrentUserContext.Provider>
  );
}

export default App;
