// routes/ErrorPage.jsx
import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="p-8 flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="text-gray-600 text-2xl">Something went wrong.</p>
      {error?.statusText || error?.message ? (
        <p className="mt-4 text-md text-red-500">
          {error.statusText || error.message}
        </p>
      ) : null}
    </div>
  );
}

export default Error;
