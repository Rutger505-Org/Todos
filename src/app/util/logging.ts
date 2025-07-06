"use client";

import toast from "react-hot-toast";

export class Logging {
  static error(message: string) {
    console.error(message);
    toast.error(message);
  }

  static warning(message: string) {
    console.warn(message);
    toast(message, {
      icon: "⚠️",
      style: { background: "#fbbf24", color: "#000" },
    });
  }

  static notice(message: string) {
    console.info(message);
    toast(message, {
      icon: "ℹ️",
      style: { background: "#38bdf8", color: "#fff" },
    });
  }

  static info(message: string) {
    console.info(message);
    toast(message, {
      icon: "💡",
      style: { background: "#a3e635", color: "#000" },
    });
  }

  static debug(message: string) {
    console.debug(message);
  }
}
