"use client";

import { PropsWithChildren, useEffect, useState } from "react";

export default function RenderOnClient(props: PropsWithChildren) {
  const [canRender, setCanRender] = useState(false);
  useEffect(() => {
    setCanRender(true);
  }, []);
  if (canRender) return props.children;
}
