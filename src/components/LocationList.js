import React, { useState } from 'react';
import {
  Avatar,
  Cell,
  Footer,
  Group,
  Header,
  Panel,
  PanelHeader,
  Placeholder,
  RichCell,
} from '@vkontakte/vkui';

import './styles.css'

import { transition } from '@unexp/router';
import { Icon28AddOutline } from '@vkontakte/icons';


const LocationList = ({ id, userLocations, addUL, removeUL, locations }) => {

  return (
    <Panel nav='/'>
      <PanelHeader>
        Локации
      </PanelHeader>
      <Group
        header={<Header>Базовые локации</Header>}
      >
        {locations?.map((location, index) =>
          <Cell
            disabled
            key={index}
          >
            {location}
          </Cell>
        )}
      </Group>

      <Group
        header={<Header>Ваши локации</Header>}
      >
        {userLocations?.map((location, index) =>
          <Cell
            key={index}
            mode='removable'
            onRemove={() => removeUL(index)}
          >
            {location}
          </Cell>
        )}
        <Cell
          before={<Icon28AddOutline />}
          onClick={() => addUL()}
        >
          Добавить локацию
        </Cell>
        {userLocations?.length <= 2 &&
          <Footer>
            Необходимо более 2 локаций для игры
          </Footer>
        }
      </Group>
    </Panel>
  )
}

export default LocationList;