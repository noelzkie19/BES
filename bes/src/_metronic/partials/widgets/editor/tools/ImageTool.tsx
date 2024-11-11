import { ProseMirror } from "@progress/kendo-react-editor";
import { insertImageFiles } from "../../../../../app/shared/service/utils";
export const insertImagePlugin = (onInsert: any) =>
  new ProseMirror.Plugin({
    props: {
      handleDOMEvents: {
        paste: (view, event) => insertImages(view, event, onInsert),
        drop: (view, event) => insertImages(view, event, onInsert),
      },
    },
    key: new ProseMirror.PluginKey("insert-image-plugin"),
  });
const insertImages = (view: any, event: any, onInsert: any) => {
  const items =
    (event.clipboardData && event.clipboardData.items) ||
    (event.dataTransfer && event.dataTransfer.files);
  if (items) {
    const files = [];
    let file;
    for (let i = 0; i < items.length; i++) {
      file =
        items[i].type.indexOf("image") !== -1
          ? "getAsFile" in items[i]
            ? items[i].getAsFile()
            : items[i]
          : null;
      if (file) {
        files.push(file);
      }
    }
    if (files.length) {
      event.preventDefault();
    }
    return onInsert({
      view,
      files,
      event,
    });
  }
};

const onImageInsert = (args: any) => {
  const { files, view, event } = args;
  const nodeType = view.state.schema.nodes.image;
  const position =
    event.type === "drop"
      ? view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        })
      : null;
  insertImageFiles({
    view,
    files,
    nodeType,
    position,
  });
  return files.length > 0;
};
export const onMount = (event: any) => {
  const state = event.viewProps.state;
  const plugins = [...state.plugins, insertImagePlugin(onImageInsert)];
  return new ProseMirror.EditorView(
    {
      mount: event.dom,
    },
    {
      ...event.viewProps,
      state: ProseMirror.EditorState.create({
        doc: state.doc,
        plugins,
      }),
    }
  );
};