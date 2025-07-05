"use client";

type CustomDividerProps = Readonly<{
  color?: string;
  height?: string;
  marginTop?: string;
  marginBottom?: string;
  width?: string;
}>;

export function CustomDivider({
  color = "#12306080",
  height = "1px",
  marginTop = "12px",
  marginBottom = "0px",
  width = "100%",
}: Readonly<CustomDividerProps>) {
  return (
    <div
      style={{
        width,
        height,
        backgroundColor: color,
        marginTop,
        marginBottom,
      }}
    />
  );
}
