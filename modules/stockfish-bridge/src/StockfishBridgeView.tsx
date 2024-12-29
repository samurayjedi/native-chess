import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { StockfishBridgeViewProps } from './StockfishBridge.types';

const NativeView: React.ComponentType<StockfishBridgeViewProps> =
  requireNativeViewManager('StockfishBridge');

export default function StockfishBridgeView(props: StockfishBridgeViewProps) {
  return <NativeView {...props} />;
}
