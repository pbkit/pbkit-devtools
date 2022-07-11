import React from "react";
import dynamic from "next/dynamic";
import { ReactJsonViewProps } from "react-json-view";
import style from "./index.module.scss";

const DynamicReactJson = dynamic(import("react-json-view"), { ssr: false });

export const JsonView = ({ style: _style, ...props }: ReactJsonViewProps) => {
  const theme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "twilight"
    : "rjv-default";
  return (
    <div className={style["react-json-view"]}>
      <DynamicReactJson
        theme={theme}
        name={false}
        quotesOnKeys={false}
        style={{
          fontFamily: "menro, monospace",
          backgroundColor: "transparent",
          ..._style,
        }}
        {...props}
      />
    </div>
  );
};

export default React.memo(JsonView);
