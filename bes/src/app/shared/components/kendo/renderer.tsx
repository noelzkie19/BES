import { cloneElement } from "react";

export const RowRender = (props: any) => {
    const trProps = {
        ...props.tr.props,
        
        onBlur: () => {
            props.exitEdit();
        },
    };
    return cloneElement(props.tr, { ...trProps }, props.tr.props.children);
};

export const CellRender = (props: any) => {
    const dataItem = props.originalProps.dataItem;
    const dataIndex = props.originalProps.dataIndex;
    const cellField = props.originalProps.field;
    const tabIndex = props.originalProps.tabIndex ? props.originalProps.tabIndex : 0;
    const inEditField = dataItem[props.editField || ""];
    let additionalProps =
        cellField && cellField === inEditField
            ? {
                ref: (td: any) => {
                    const input = td && td.querySelector("input");
                    const activeElement = document.activeElement;

                    if (
                        !input ||
                        !activeElement ||
                        input === activeElement ||
                        !activeElement.contains(input)
                    ) {
                        return;
                    }

                    if (input.type === "checkbox") {
                        input.focus();
                    } else {
                        input.select();
                    }
                },
            }
            : {
                onClick: () => {
                    props.enterEdit(dataItem, cellField, dataIndex);
                },
            };
    const clonedProps = { ...props.td.props, ...additionalProps, tabIndex: tabIndex};
    return cloneElement(props.td, clonedProps, props.td.props.children);
};

