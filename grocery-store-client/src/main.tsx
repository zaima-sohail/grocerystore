import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51TqTceA78Mb0LybA1Oq3rDHYhncoDKHrLQVjuNBCmOPHfAWyGhQHZE5zVgwwAr3zrpsEEkeK7o3YbULCwFEaJ95h00VXmjd29U"
);

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>

    <Elements stripe={stripePromise}>
      <App />
    </Elements>

  </React.StrictMode>
);