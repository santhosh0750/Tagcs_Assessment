import React from "react";
import Topbar from "./Topbar";

export default function layout({ children }) {
  return (
    <div>
      <Topbar>{children}</Topbar>
    </div>
  );
}
