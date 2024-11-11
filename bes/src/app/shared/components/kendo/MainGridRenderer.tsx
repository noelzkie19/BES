import { cloneElement } from "react";

export const MainRowRender = (props: any) => {
    const trProps = {
        ...props.tr.props,
        //view the data on the grid
        onDoubleClick: () => {
            props.onDoubleClick();
        },
    };
    return cloneElement(props.tr, { ...trProps }, props.tr.props.children);
};
