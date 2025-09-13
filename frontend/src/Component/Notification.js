import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const handleSuccess = (msg) => {
  toast.success(msg, {
    toastId: "success",

    position: "top-right",
  });
};

export const handleError = (msg) => {
  toast.error(msg, {
    toastId: "error",
    position: "top-right",
  });
};
