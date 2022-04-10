import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardGrid,
  Cell,
  ContentCard,
  Div,
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
import { Icon28UserOutline } from '@vkontakte/icons';



const isDesktop = new URLSearchParams(window.location.search).get("vk_platform") == "desktop_web"

const Game = ({ gamers, setGamers, changeName, userLocations, setLocation, locations }) => {
  const [sliderValue, setSliderValue] = useState(6);
  const [isUL, setIsUL] = useState(false);

  useEffect(() => {

    let Tgamers = [];
    if (gamers.length == 0) {
      for (let i = 0; i < sliderValue; i++) {
        Tgamers.push({
          name: `Игрок ${i + 1}`,
          isSpy: false
        });
      }
    } else {
      if (gamers.length > sliderValue) {
        Tgamers = gamers.slice(0, sliderValue);
      } else if (gamers.length < sliderValue) {
        Tgamers = gamers;
        for (let i = gamers.length; i < sliderValue; i++) {
          Tgamers.push({
            name: `Игрок ${i + 1}`,
            isSpy: false
          });
        }
      } else {
        Tgamers = gamers;
      }
    }

    Tgamers.forEach(Tgamer => {
      Tgamer.isSpy = false;
    });
    let randomIndex = Math.floor(Math.random() * Tgamers.length);
    Tgamers[randomIndex].isSpy = true;
    if (gamers.length > 7) {
      let randomIndex2 = Math.floor(Math.random() * Tgamers.length);
      while (randomIndex2 == randomIndex) {
        randomIndex2 = Math.floor(Math.random() * Tgamers.length);
      }
      Tgamers[randomIndex2].isSpy = true;
    }

    setGamers([...Tgamers]);

  }, [sliderValue]);


  return (
    <Panel nav='/'>
      <PanelHeader>
        Шпион
      </PanelHeader>
      <Group>
        <FormItem top={`Игроков: ${sliderValue}, шпионов: ${sliderValue > 7 ? 2 : 1}`}>
          <Slider
            min={3}
            max={12}
            step={1}
            value={sliderValue}
            onChange={(v) => setSliderValue(v)}
          />
        </FormItem>

        <FormItem
          top='Список локаций'
          bottom={userLocations?.length <= 2 ? "Необходимо более 2 локаций в пользовательском списке для его использования" : ""}
        >
          {/* <Div> */}
          <SegmentedControl
            defaultChecked={0}
            onChange={(e) => { setIsUL(e == "user") }}
            options={userLocations?.length <= 2 ? [
              {
                label: 'Базовый',
                value: "base",
                "aria-label": "Базовый",
              },
            ] : [
              {
                label: 'Базовый',
                value: "base",
                "aria-label": "Базовый",
              },
              {
                label: 'Пользовательский',
                value: "user",
                "aria-label": "Пользовательский",
              },
            ]}
          />
          {/* </Div> */}
        </FormItem>
      </Group>
      <Group
        header={<Header mode="secondary">Игроки</Header>}
      >
        {gamers.map((gamer, index) =>
          <Cell
            key={index}
            before={<Icon28UserOutline />}
            onClick={() => changeName(index)}
          >
            {gamer.name}
          </Cell>
        )}

      </Group>

      <Footer>Нажмите на игрока для редактирования имени</Footer>

      <Div>
        <Button
          size='l'
          stretched
          onClick={() => {
            let tmpLoc = isUL ? userLocations : locations;
            let randomIndex = Math.floor(Math.random() * tmpLoc.length)
            setLocation(tmpLoc[randomIndex])
            transition('/game/cards')
          }
          }
        >
          Раздать карты

        </Button>
      </Div>

    </Panel>
  )
}

export default Game;
