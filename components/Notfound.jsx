import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style.css";

function NotFound({ message }) {
  const err = useRouteError();

  const displayMessage =
    typeof message === "string"
      ? message
      : message?.message || JSON.stringify(message) || err?.message || "Something went wrong.";

  return (
    <>
      <h1>OOPS!..</h1>
      <h2>{displayMessage}</h2>

      {err?.status && (
        <h4>
          {err.status} {err.statusText}
        </h4>
      )}

      <Link to="/">
        <button className="errhome">Back to Home</button>
      </Link>
    </>
  );
}

export default NotFound;
