import { GridHeaderCellProps } from "@progress/kendo-react-grid";

interface ButtonHeaderProps {
    title: any;
    clickHandler: () => void
    isCanEdit?: boolean
  }
  
export const AddButtonHeader = (props: ButtonHeaderProps) => {
    return (
      <a className="k-link" onClick={props.clickHandler}>
        { (props.isCanEdit === undefined || props.isCanEdit) && (
          <button type="button" className="btn btn-primary">
              <span className="k-icon k-i-plus" /> 
              {/* <span>{props.title}</span> */}
          </button>
        )}
      </a>
    );
  };