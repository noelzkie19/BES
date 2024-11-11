import React from "react"
import { Editor, EditorBlurEvent, EditorChangeEvent, EditorTools, ProseMirror } from "@progress/kendo-react-editor";
import FontSizeTool from "./tools/FontSize";
import { extractBase64ImageData, insertImageFiles } from "../../../../app/shared/service/utils";
import { insertImagePlugin, onMount } from "./tools/ImageTool";
const {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignRight,
    AlignCenter,
    Indent,
    Outdent,
    OrderedList,
    UnorderedList,
    Undo,
    Redo
  } = EditorTools;

type Props = {
    content: string
    changeHandler?: (content: string) => void
    blurHandler?: (content: string) => void
  }

  const editorStyles = {
    fontSize: '12px' // Set your desired font size here
  };
  
  const Editor1: React.FC<Props> = ({content, changeHandler, blurHandler}) => {
    const onChangeHandler = (event: EditorChangeEvent) => {
        if (changeHandler)
            changeHandler(event.html)
    }

    const onBlurHandler = (event: EditorBlurEvent) => {
        if (blurHandler)
            blurHandler(event.target.props.defaultContent || '')
    }
 
    return (
      <React.Fragment>
      <Editor
            tools={[
                [Bold, Italic, Underline],
                [Undo, Redo],
                [FontSizeTool],
                [AlignLeft, AlignCenter, AlignRight],
                [OrderedList, UnorderedList, Indent, Outdent]
            ]}
            defaultContent={content}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            onMount={onMount}
            contentStyle={{
                height: 420,
            }}
        >
            <EditorTools.FontSize defaultValue="12px"
            style={editorStyles} 
            >
            </EditorTools.FontSize>
        </Editor>
      </React.Fragment>
       
    )
  }

  export {Editor1}
