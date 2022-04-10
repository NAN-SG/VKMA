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
  Spacing,
  Spinner,
  Tappable,
  Text,
  Tooltip
} from '@vkontakte/vkui';
import './styles.css'

import { transition } from '@unexp/router';
import { Icon24Info, Icon28CancelCircleFillRed, Icon28CancelOutline, Icon28IncognitoOutline, Icon28InfoCircleOutline, Icon28Like, Icon28LikeCircleFillRed, Icon28PlaceOutline, Icon28User, Icon28UserOutgoingOutline, Icon28UserOutline, Icon56RecentOutline } from '@vkontakte/icons';
import { useTimer } from 'react-timer-hook';



const isDesktop = new URLSearchParams(window.location.search).get("vk_platform") == "desktop_web"

const Final = ({ gamers }) => {
  return (
    <Panel nav='/'>
      <PanelHeader>
        Шпионы
      </PanelHeader>
      <Group>
        <Placeholder
          icon={<Icon28IncognitoOutline style={{ transform: 'scale(1.7)' }} />}
          stretched
          header="Шпионами были:"
        >
          {gamers.filter(g => g.isSpy).map(g => <Text>{g.name}</Text>)}
        </Placeholder>
      </Group>
      <FixedLayout
        vertical="bottom"
      >
        <Div>
          <Button stretched size="l" mode='secondary' onClick={() => transition('/game')}>
            Сыграть ещё
          </Button>
        </Div>
      </FixedLayout>
    </Panel>
  )
}

export default Final;
