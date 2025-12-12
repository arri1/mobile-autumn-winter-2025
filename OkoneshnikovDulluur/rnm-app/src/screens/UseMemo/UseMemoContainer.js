import React, { useMemo, useState } from 'react';
import UseMemoView from './UseMemoView';

export default function UseMemoContainer({ navigation }) {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    const trimmed = text.trim();

    const chars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;

    const words = trimmed ? trimmed.split(/\s+/) : [];
    const wordCount = words.length;

    const uniqueWords = new Set(words.map((w) => w.toLowerCase()));
    const uniqueCount = uniqueWords.size;

    const preview =
      trimmed.length > 0 ? trimmed.slice(0, 60) : '';
    const previewText =
      preview.length < trimmed.length ? preview + '…' : preview;

    return {
      chars,
      charsNoSpaces,
      wordCount,
      uniqueCount,
      previewText,
    };
  }, [text]);

  return (
    <UseMemoView
      navigation={navigation}
      text={text}
      onChangeText={setText}
      stats={stats}
    />
  );
}
