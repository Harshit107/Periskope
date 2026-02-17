export type SuccessResponse<T> = {
  response: "SUCCESS";
  data: T;
  error: null;
};

export type FailResponse<E> = {
  response: "FAIL";
  data: null;
  error: E;
};

export type ResponseType<T, E> = SuccessResponse<T> | FailResponse<E>;
