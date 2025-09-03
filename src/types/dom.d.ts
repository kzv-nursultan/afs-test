// src/types/dom.d.ts
export {};

declare global {
  interface HTMLInputElement {
    /** Non-standard, supported by Chromium & Safari 17+ */
    showPicker?: () => void;
  }
}
