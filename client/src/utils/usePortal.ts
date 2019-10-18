import React, { useEffect } from "react";

export default function usePortal(id: string) {
  const rootElementRef = React.useRef(document.createElement("div"));

  useEffect(
    function setupElement() {
      const parentElement = document.querySelector(`#${id}`);
      const current = rootElementRef.current;

      if (parentElement) {
        parentElement.appendChild(current);
      }

      return function removeElement() {
        current.remove();
      };
    },
    [id]
  );

  return rootElementRef.current;
}
