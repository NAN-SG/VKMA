import React, { useEffect, useState } from 'react';
import {
  Button,
  Div,
  TabbarItem,
  Tabbar,
  Tappable
} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import { transition, useDeserializedLocation, useHistoryState, useLocation, listeners, PUSH_EVENT, BACK_EVENT, REPLACE_EVENT } from '@unexp/router'

import './styles.css'
import { Icon28GameOutline, Icon28ListOutline } from '@vkontakte/icons';


const TabbarMy = ({ lastPath, setLastPath }) => {

  useEffect(() => {
    function listener(event, from) {
      console.log(from);
      if (from?.pathname?.includes('game')) {
        setLastPath(from?.pathname);
        console.log('setLastPath', from?.pathname)
      }
    }

    listeners.push(listener)
  }, [])

  const location = useDeserializedLocation()
  return (
    <Tabbar
      className="tabs">
      <TabbarItem
        onClick={() => { if (location.view != '/game') { transition(lastPath) } }}
        selected={location.view === '/game'}
        data-story="game"
        text="Игра">
        <Icon28GameOutline /></TabbarItem>
      <TabbarItem
        onClick={() => { if (location.view != '/list') { transition('/list') } }}
        selected={location.view === '/list'}
        data-story="list"
        text="Локации">
        <Icon28ListOutline /></TabbarItem>
    </Tabbar>


  )
}

export default TabbarMy;
