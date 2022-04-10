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

const Timer = ({ expiration, timerExpired, isFlashing, setIsFlashing }) => {
  const [isExpired, setIsExpired] = useState(false)

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp: expiration, onExpire: () => {
      timerExpired()
      setIsExpired(true)
      setIsFlashing(true)
    }
  });

  useEffect(() => {
    start()
  }, [])

  return (
    <Panel nav='/'>
      <PanelHeader>
        Таймер
      </PanelHeader>

      <Group>
        <Placeholder
          icon={<Icon56RecentOutline />}
          stretched
          header={`${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}
        >
          Осталось до конца игры
        </Placeholder>



      </Group>
      <FixedLayout
        vertical="bottom"
      >
        {isExpired ? <Div>
          {isFlashing ? <Button stretched size="l" onClick={(setIsFlashing(false))}>
            Остановить мигание
          </Button> : <Button stretched size="l" disabled>
            Не мигаю
          </Button>}
          <Spacing />
          <Button stretched size="l" mode='secondary' onClick={() => transition('/game/final')}>
            Показать шпионов
          </Button>
        </Div> : <Div>
          {isRunning ? <Button stretched size="l" onClick={pause}>
            Пауза
          </Button> : <Button stretched size="l" onClick={resume}>
            Возобновить
          </Button>}
          <Spacing />
          <Button stretched size="l" mode='secondary' onClick={() => restart(new Date() - 1)}>
            Завершить дострочно
          </Button>
        </Div>}

      </FixedLayout>
    </Panel >
  )
}

export default Timer;
