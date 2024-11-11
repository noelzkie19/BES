import * as React from "react";
import { EditorTools, EditorToolsSettings } from "@progress/kendo-react-editor";
const fontSizeToolSettings = {
  ...EditorToolsSettings.fontSize,
  items: [
    {
      text: "10",
      value: "10px",
    },
    {
      text: "12",
      value: "12px",
    },
    {
      text: "14",
      value: "14px",
    },
    {
      text: "18",
      value: "18px",
    },
    {
      text: "22",
      value: "22px",
    },
    {
      text: "36",
      value: "36px",
    },
  ],
};

// Creates custom FontSize tool.
const CustomFontSize =
  EditorTools.createStyleDropDownList(fontSizeToolSettings);

// Styles the FontSize tool (DropDownList).
const FontSizeTool = (props: any) => (
  <CustomFontSize
    {...props}
    style={{
      width: "110px",
      ...props.style,
    }}
  />
);
export default FontSizeTool;