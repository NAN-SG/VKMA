import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardGrid,
  Cell,
  ContentCard,
  Div,
  FixedLayout,
  Footer,
  FormItem,
  Group,
  Header,
  IconButton,
  Panel,
  PanelHeader,
  Placeholder,
  RichCell,
  SegmentedControl,
  Slider,
  Spinner,
  Tappable,
  Text,
  Tooltip
} from '@vkontakte/vkui';
import './styles.css'

import { transition } from '@unexp/router';
import { Icon24Info, Icon28CancelCircleFillRed, Icon28CancelOutline, Icon28IncognitoOutline, Icon28InfoCircleOutline, Icon28Like, Icon28LikeCircleFillRed, Icon28PlaceOutline, Icon28User, Icon28UserOutgoingOutline, Icon28UserOutline } from '@vkontakte/icons';



const isDesktop = new URLSearchParams(window.location.search).get("vk_platform") == "desktop_web"

const Cards = ({ gamers, location, activeCard, setActiveCard, startTimer }) => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    let tmpCards = [];
    for (let i = 0; i < gamers.length; i++) {
      tmpCards.push(
        <Placeholder
          stretched
          icon={<Icon28UserOutgoingOutline style={{ transform: 'scale(1.7)' }} />}
          header={'Передайте следующему игроку'}
        >
          Следующий игрок: {gamers[i].name}
        </Placeholder>,
        <Placeholder
          stretched
          icon={gamers[i].isSpy ? <Icon28IncognitoOutline style={{ transform: 'scale(1.7)' }} /> : <Icon28PlaceOutline style={{ transform: 'scale(1.7)' }} />}
          header={gamers[i].isSpy ? "Вы шпион" : "Вы обычный игрок"}
        >
          {gamers[i].isSpy ? "" : `Ваша локация: ${location}`}
        </Placeholder>
      );
    }
    tmpCards.push(
      <Placeholder
        stretched
        icon={<Icon28UserOutgoingOutline style={{ transform: 'scale(1.7)' }} />}
        header={'Начать игру?'}
      >
        После нажатия кнопки запустится таймер на {gamers.length} минут
      </Placeholder>)
    setCards(tmpCards);
  }, [gamers]);



  return (
    <Panel nav='/'>
      <PanelHeader>
        Карты
      </PanelHeader>

      <Group>
        {cards[activeCard]}
      </Group>
      <FixedLayout
        vertical="bottom"
      >
        <Div>
          {activeCard == cards.length - 1 ?
            <Button stretched size="l" onClick={() => {
              transition('/game/timer')
              setActiveCard(0)
              startTimer(gamers.length)
            }}>
              Начать
            </Button>
            : <Button stretched size="l" onClick={() => {
              setActiveCard(activeCard + 1);
            }}>
              {activeCard % 2 == 0 ? 'Показать роль' : 'Передать'}
            </Button>}
        </Div>
      </FixedLayout>
    </Panel>
  )
}

export default Cards;
