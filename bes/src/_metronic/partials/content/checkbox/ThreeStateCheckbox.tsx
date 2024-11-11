import { useState } from "react";
import '../checkbox/three-state-checkbox.scss'; // Import your CSS file
export enum TREE_STATE_STATUS {
  ALL = 'all',
  CHECKED = 'checked',
  UNCHECKED = 'unchecked'
}

const ThreeStateCheckbox = ({ initialState, changeHandler, isLoading, checkText }: any) => {
    const [checkboxState, setCheckboxState] = useState(initialState || TREE_STATE_STATUS.ALL);
  
    const handleCheckboxChange = () => {
      let newState;
  
      switch (checkboxState) {
        case TREE_STATE_STATUS.UNCHECKED:
          newState = TREE_STATE_STATUS.CHECKED;
          break;
        case TREE_STATE_STATUS.CHECKED:
          newState = TREE_STATE_STATUS.ALL;
          break;
        case TREE_STATE_STATUS.ALL:
          newState = TREE_STATE_STATUS.UNCHECKED;
          break;
        default:
          newState = TREE_STATE_STATUS.UNCHECKED;
      }
      changeHandler(newState);
      setCheckboxState(newState);
    };
  
    return (
      <div className="checkbox-container">
        <input
          type="checkbox"
          checked={checkboxState === 'checked'}
          onChange={handleCheckboxChange}
          className={`custom-checkbox ${checkboxState}`}
          disabled={isLoading}
        />
        <label className="checkbox-label">
          {checkboxState === TREE_STATE_STATUS.ALL && <span className="all-fill" />}
          {checkText || ''}
        </label>
      </div>
    );
  };
  
  export default ThreeStateCheckbox;