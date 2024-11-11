import { DatePicker, ToggleButton } from "@progress/kendo-react-dateinputs";

export const DateFilterCell = (props: any) => {
    
    const customToggleButton = (toggleProps: any) => {
        const { onClick, onMouseDown, ...others } = toggleProps;
        return (
          <>
            <ToggleButton {...others}>
              <span
                className="k-icon k-i-calendar me-2"
                onClick={onClick}
                onMouseDown={onMouseDown}
              />
              <span
                className="k-link k-link-clear"
                onClick={() => {
                    props.onDateFilterChange({
                        value: null,
                        operator: "gt",
                    })
                }}
              >
                <span
                  unselectable="on"
                  className="k-icon k-i-close"
                />
              </span>
            </ToggleButton>
          </>
        );
      };


    return (
        <div className="k-filtercell custom-date-filter">
            <DatePicker
                toggleButton={customToggleButton}
                format='dd/MM/yyyy'
                value={props.value === '' ? null : props.value}
                onChange={(e: any) => {
                    let dateResult = null;
                    if (e.target.value) {
                        dateResult = new Date(e.target.value);
                    }
                    props.onDateFilterChange({
                        value: dateResult,
                        operator: "gt",
                    });
                }}
            />
            <button
                className="k-button k-button-icon k-clear-button-visible"
                title="Clear"
                onClick={() => props.onDateFilterClear()}
            >
                <span className="k-icon k-i-filter-clear" />
            </button>
        </div>
    );
}