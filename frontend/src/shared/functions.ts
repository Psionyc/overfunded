import { BACKEND_URL } from "@/config";
import { ToastType } from "@/events";
import { EventManager } from "@/main";
import axios from "axios";

const http = axios.create({
  baseURL: BACKEND_URL,
});

export async function uploadFile(file: any): Promise<string> {
  const data = new FormData();
  data.append("image", file, file.name);
  const res = await http.post("/files/upload", data);
  console.log(res.data);
  return `${BACKEND_URL}/files/${res.data.result}`;
}

export function ensure(evaluation: boolean, error: string) {
  if (evaluation == false)
    throw {
      message: error,
      type: "AssertionError",
    };
}

export function selectFile(contentType: string) {
  return new Promise((resolve) => {
    let files;
    let input = document.createElement("input");
    input.type = "file";
    input.accept = contentType;

    input.onchange = () => {
      files = Array.from((input as any).files);
      resolve(files[0]);
    };

    input.click();
  });
}

export function handleFunctionErrors(e: any) {
  console.table(e);
  if (e.code == "ACTION_REJECTED")
    EventManager.emit("toast", {
      message: "Transaction Rejected",
      type: ToastType.ERROR,
    });
  else if (e.type == "AssertionError") {
    EventManager.emit("toast", {
      message: e.message,
      type: ToastType.ERROR,
    });
  } else
    EventManager.emit("toast", {
      message: "Transaction failed",
      type: ToastType.ERROR,
    });
}

export async function createMetadata(image: string) {
  try {
    const res = await http.post("/files/create-metadata", {
      image,
    });

    return `${BACKEND_URL}/files/${res.data.result}`;
  } catch (e) {
    return ''
  }
}
