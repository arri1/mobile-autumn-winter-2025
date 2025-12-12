import React, { useState } from 'react';
import ZustandControlView from './ZustandControlView';
import { useDemoStore } from '@/store/demoStore';

export default function ZustandControlContainer() {
  const count = useDemoStore((s) => s.count);
  const inc = useDemoStore((s) => s.inc);
  const dec = useDemoStore((s) => s.dec);
  const reset = useDemoStore((s) => s.reset);
  const addMessage = useDemoStore((s) => s.addMessage);

  const [text, setText] = useState('');

  const onAdd = () => {
    addMessage(text);
    setText('');
  };

  return (
    <ZustandControlView
      count={count}
      onInc={inc}
      onDec={dec}
      onReset={reset}
      text={text}
      onChangeText={setText}
      onAdd={onAdd}
    />
  );
}
