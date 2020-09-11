import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./Welcome";
import { BrowserRouter } from "react-router-dom";

it.only("should render welcome page", () => {
  const div = document.createElement("div");
  ReactDOM.render(
<BrowserRouter>
      <Welcome />
      </BrowserRouter>
,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
