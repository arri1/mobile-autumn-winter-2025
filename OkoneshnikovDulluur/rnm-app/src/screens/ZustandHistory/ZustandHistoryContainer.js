import React from 'react';
import ZustandHistoryView from './ZustandHistoryView';
import { useDemoStore } from '@/store/demoStore';

export default function ZustandHistoryContainer() {
  const count = useDemoStore((s) => s.count);
  const history = useDemoStore((s) => s.history);
  const clearHistory = useDemoStore((s) => s.clearHistory);
  const reset = useDemoStore((s) => s.reset);

  return (
    <ZustandHistoryView
      count={count}
      history={history}
      onClearHistory={clearHistory}
      onReset={reset}
    />
  );
}
