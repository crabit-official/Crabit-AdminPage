interface IErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: IErrorFallbackProps) {
  return (
    <div>
      <h1>
        {isApiError(error)
          ? error.response.errors[0].message
          : '알 수 없는 에러가 발생했습니다!'}
      </h1>
      <button onClick={() => resetErrorBoundary()}>다시 시도하기</button>
    </div>
  );
}

function isApiError(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
): error is { response: { errors: { message: string }[] } } {
  return error.response?.errors?.length > 0;
}
