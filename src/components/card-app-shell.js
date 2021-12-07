import React from 'react';
import { CardStateProvider } from 'context/card/index';
import MainRouter from 'routers/main-router';

export default function CardAppShell() {
  return (
    <CardStateProvider>
      <MainRouter />
    </CardStateProvider>
  );
}
