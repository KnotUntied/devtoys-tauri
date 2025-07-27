#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_window_state::Builder::default().build())
    .plugin(tauri_plugin_clipboard_manager::init())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
fn main() {
  app_lib::run();
}
