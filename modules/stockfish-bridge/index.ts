import {
  NativeModulesProxy,
  EventEmitter,
  Subscription,
} from 'expo-modules-core';

// Import the native module. On web, it will be resolved to StockfishBridge.web.ts
// and on native platforms to StockfishBridge.ts
import StockfishBridgeModule from './src/StockfishBridgeModule';
import StockfishBridgeView from './src/StockfishBridgeView';
import {
  ChangeEventPayload,
  StockfishBridgeViewProps,
} from './src/StockfishBridge.types';

// Get the native constant value.
export const PI = StockfishBridgeModule.PI;

export function hello(): string {
  return StockfishBridgeModule.hello();
}

export function getMove(state: string): string {
  return StockfishBridgeModule.getMove(state);
}

export async function setValueAsync(value: string) {
  return await StockfishBridgeModule.setValueAsync(value);
}

const emitter = new EventEmitter(
  StockfishBridgeModule ?? NativeModulesProxy.StockfishBridge,
);

export function addChangeListener(
  listener: (event: ChangeEventPayload) => void,
): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { StockfishBridgeView, StockfishBridgeViewProps, ChangeEventPayload };
