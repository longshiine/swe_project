interface IError {
  statusCode: number;
  message: string;
}

export const throwErrorMessage = ({ statusCode, message }: IError) => {
  const error = new Error();
  error.name = String(statusCode);
  error.message = message;
  throw error;
};

export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const today = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const milliseconds = date.getMilliseconds();
  return new Date(
    Date.UTC(year, month, today, hours, minutes, seconds, milliseconds),
  );
};
