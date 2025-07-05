"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

interface ChevronDownIconProps {
  width?: number;
  height?: number;
  style?: CSSProperties;
}

export function ChevronDownIcon({
  width = 16,
  height = 10,
  style = {},
}: Readonly<ChevronDownIconProps>) {
  return (
    <Image
      src="/images/chevron-down.jpg"
      alt="dropdown"
      width={width}
      height={height}
      style={{ marginRight: 10, ...style }}
    />
  );
}
