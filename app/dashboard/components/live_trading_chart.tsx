'use client';

import React, { useEffect, useRef } from 'react';

let tvScriptLoadingPromise: Promise<void> | undefined;
declare global {
  interface Window {
    TradingView: any; // You can use 'any' if the type is unknown
  }
}

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise<any>((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (
        document.getElementById('tradingview_1fdf4') &&
        'TradingView' in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: 'BITSTAMP:BTCUSD',
          interval: '30',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '3',
          locale: 'en',
          enable_publishing: false,
          allow_symbol_change: true,
          container_id: 'tradingview_1fdf4',
        });
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container h-full">
      <div id="tradingview_1fdf4" className="h-full" />
      <div className="tradingview-widget-copyright h-full">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow"
          target="_blank"
        >
          <span className="blue-text"></span>
        </a>
      </div>
    </div>
  );
}
