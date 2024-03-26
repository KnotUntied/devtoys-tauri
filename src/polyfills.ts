// import {
//   writeText as tauriWriteText,
//   readText as tauriReadText
// } from '@tauri-apps/api/clipboard'

// interface PolyfillProps {
//   readText(): Promise<string | null>,
//   writeText: (() => void) | ((arg0: string) => void)
// }

// function generatePolyfills(): PolyfillProps {
//   // @ts-ignore
//   if (window.__TAURI__) {
//     return {
//       readText: tauriReadText,
//       writeText: tauriWriteText
//     }
//   } else {
//     return {
//       readText: navigator.clipboard.readText,
//       writeText: value => navigator.clipboard.writeText(value)
//     }
//   }
// }

// export const { readText, writeText } = generatePolyfills()