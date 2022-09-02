# DevToys Tauri

Shamelessly derived from [DevToys](https://devtoys.app/) by Etienne Baudoux.

Work in progress.

## Todo

- More tools (may or may not be in parity with DevToys)
- License and view for third-party licenses
- App icon
- Test suite
- Make router use data instead of hardcoding routes
- Monaco editor settings
- Switch from localStorage and navigator clipboard to Tauri-provided solutions
  - [tauri-plugin-store](https://github.com/tauri-apps/tauri-plugin-store) exists, but there is not enough incentive to switch from localStorage
  - As of writing, Tauri has a less comprehensive clipboard API than the browser's
- Better name