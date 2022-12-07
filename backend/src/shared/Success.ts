export function Success<T>(data: SuccessData) {
  return {
    message: data.message,
    result: data.result as T,
    status: 200,
  };
}

interface SuccessData {
  message: string;
  result: any;
}
