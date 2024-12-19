// Import the native module. On web, it will be resolved to StockfishBridge.web.ts
// and on native platforms to StockfishBridge.ts
import StockfishBridgeModule from './src/StockfishBridgeModule';

// Get the native constant value.
export const PI = StockfishBridgeModule.PI;

export function hello(): string {
  return StockfishBridgeModule.hello();
}

export async function setValueAsync(value: string) {
  return await StockfishBridgeModule.setValueAsync(value);
}
