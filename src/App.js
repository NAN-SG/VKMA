import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {
  // View,
  withAdaptivity,
  SplitLayout,
  SplitCol,
  ViewWidth,
  Button,
  Avatar,
  Snackbar,
  // Epic,
  Tabbar,
  TabbarItem,
  Spinner,
  Div,
  Text,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Platform,
  Panel,
  FixedLayout,
  Gallery,
  Placeholder,
  Alert,
  ModalRoot,
  ModalCard,
  ModalPage,
  ModalPageHeader,
  PanelHeaderBack,
  Group,
  RichCell,
  PanelHeaderClose,
  Input
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import {
  Icon28CancelCircleFillRed,
  Icon28CheckCircleFill
} from "@vkontakte/icons"

import './components/styles.css';

import LocationList from './components/LocationList';
import Game from './components/Game';

import TabbarMy from './components/TabbarMy';
import {
  Match, View, Root, Epic, transition, EXPERIENCE_DRIVEN_STYLE, useParams, useLocation, listeners, PUSH_EVENT, BACK_EVENT, REPLACE_EVENT, useHistoryState
} from '@unexp/router'
import Cards from './components/Cards';
import Timer from './components/Timer';
import { useTimer } from 'react-timer-hook';
import Final from './components/Final';

const locations = [
  "Зингер",
  "Эрмитаж",
  "Пыточная",
  "Невский проспект",
  "Купол Зингера"
]

const App = withAdaptivity(({ viewWidth }) => {

  const [popout, setPopout] = useState(null)
  const [snackbar, setSnackbar] = useState(null)
  const [userLocations, setUserLocations] = useState([])
  const loc = useLocation()
  const par = useParams()
  const [gamers, setGamers] = useState([])
  const [nameIndex, setNameIndex] = useState(0)

  //timer 
  const [lastPath, setLastPath] = useState('/game/');
  const [location, setLocation] = useState('')
  const [activeCard, setActiveCard] = useState(0)
  const [expiration, setExpiration] = useState(new Date())
  const [isFlashing, setIsFlashing] = useState(false)
  const [ledState, setLedState] = useState(false)
  const [isFlashSupported, setIsFlashSupported] = useState(false)

  function startTimer(minutes) {
    const time = new Date()
    time.setSeconds(time.getSeconds() + 60 * minutes);
    setExpiration(time)
  }
  let intId;

  useEffect(() => {
    bridge.send('VKWebAppFlashGetInfo')
      .then(data => {
        setIsFlashSupported(data.supported)
      })
  }, [])

  useEffect(() => {

    if (isFlashing) {
      intId = setInterval(() => {
        setLedState(!ledState)
      }, 1000);
    } else {
      clearInterval(intId);
      setLedState(false)
    }
  }, [isFlashing])

  useEffect(() => {
    if (bridge.supports('VKWebAppFlashSetLevel') && isFlashSupported) {
      bridge.send('VKWebAppFlashSetLevel', { level: ledState ? 1 : 0 })
        .catch((e) => {
          console.log(e)
          showSnackbar('Не удалось включить фонарик')
        })
    }
  }, [ledState])

  function showSnackbar(txt, iconType = null, actLabel = null, action = null) {
    let icon
    switch (iconType) {
      case "ok":
        icon = <Icon28CheckCircleFill />
        break
      case "error":
        icon = <Icon28CancelCircleFillRed />
        break
      case "fav":
        break
      default:
        icon = null
    }
    setSnackbar(<Snackbar
      style={!isDesktop
        ? { marginBottom: 'calc(var(--tabbar_height) + var(--safe-area-inset-bottom) + 6px)' }
        : { marginBottom: '430px', marginLeft: '20px' }}
      before={icon}
      duration={action ? 8000 : 4000}
      action={actLabel}
      onActionClick={action}
      onClose={() => setSnackbar(null)}
    >{txt}</Snackbar>)
  }

  function setTab(tab) {
    setSnackbar(null); // убираем снекбар при переходе
    transition(tab); // меняем таб
  }



  function putUL(loc) {
    setUserLocations([...userLocations, loc]);
  }

  function removeUL(index) {
    setUserLocations(userLocations.filter((_, i) => i !== index));
  }

  function addUL() {
    transition('/list?m=addUL')
  }
  function changeName(index) {
    setNameIndex(index)
    transition('/game?m=name')
  }
  function setName(val) {
    setGamers(gamers.map((gamer, i) => {
      if (i === nameIndex) {
        gamer.name = val
      }
      return gamer
    }))
  }

  function timerExpired() {
    console.log('timer expired')
  }

  function Modals() {

    let close = () => (
      transition(-1)
    )
    const inputRef = React.createRef()
    return (
      <ModalRoot activeModal={par?.m} onClose={close}>
        <ModalCard
          id='addUL'
          onClose={() => close()}
          header="Новая локация"
          actions={
            <Button
              size="l"
              mode="primary"
              onClick={() => {
                transition(-1)
                putUL(inputRef.current.value)
              }}
            >
              Сохранить
            </Button>
          }
        >
          <Input
            getRef={inputRef}
          />
        </ModalCard>
        <ModalCard
          id='name'
          onClose={() => close()}
          header="Имя"
          actions={
            <Button
              size="l"
              mode="primary"
              onClick={() => {
                transition(-1)
                setName(inputRef.current.value)
              }}
            >
              Сохранить
            </Button>
          }
        >
          <Input
            getRef={inputRef}
          />
        </ModalCard>

      </ModalRoot>
    )
  }

  const isDesktop = new URLSearchParams(loc.search).get("vk_platform") == "desktop_web";
  return (
    <ConfigProvider
      scheme="inherit"
    >
      <AdaptivityProvider>
        <AppRoot>
          <Match
            style={EXPERIENCE_DRIVEN_STYLE}
            fallbackURL="/game"
          >
            <SplitLayout style={{ justifyContent: "center" }}
              header={null}
              popout={popout}
              modal={<Modals />}
            >
              <SplitCol
                width='100%'
                maxWidth='100%'>
                <Epic
                  className="epic"
                  tabbar={
                    <TabbarMy
                      showSnackbar={showSnackbar}
                      lastPath={lastPath}
                      setLastPath={setLastPath}
                    />}>
                  <View
                    nav='/game'
                  >
                    <Game
                      nav='/'
                      gamers={gamers}
                      setGamers={setGamers}
                      changeName={changeName}
                      userLocations={userLocations}
                      locations={locations}
                      setLocation={setLocation}
                    />
                    <Cards
                      nav='/cards'
                      location={location}
                      gamers={gamers}
                      activeCard={activeCard}
                      setActiveCard={setActiveCard}
                      startTimer={startTimer}
                    />
                    <Timer
                      nav='/timer'
                      expiration={expiration}
                      timerExpired={timerExpired}
                      isFlashing={isFlashing}
                      setIsFlashing={setIsFlashing}
                    />
                    <Final
                      nav='/final'
                      gamers={gamers}
                    />
                  </View>
                  <View nav='/list'>
                    <LocationList
                      nav='/'
                      userLocations={userLocations}
                      addUL={addUL}
                      removeUL={removeUL}
                      locations={locations}
                    />
                  </View>
                </Epic>
                {snackbar}
              </SplitCol>
            </SplitLayout>
          </Match>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider >
  );
},
  {
    viewWidth: true,
    sizeX: true,
    sizeY: true
  }
);
export default App;

