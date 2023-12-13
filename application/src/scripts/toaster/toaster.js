import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";

export const ToastType = {
  Success: "success", // Green
  Error: "error", // Red
  Info: "info", // Blue
  Warning: "warning", // Yellow
  Default: "default", // Grey
};

export class Toaster {
  #toast;

  constructor() {
    this.toast = useToast();
  }

  display(type, message) {
    this.toast.open({
      message: message,
      type: type,
      position: "bottom-left",
      pauseOnHover: true,
      dismissible: true,
      duration: 3000,
    });
  }
}
