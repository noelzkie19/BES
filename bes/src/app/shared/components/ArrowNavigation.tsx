import React, {useEffect, useReducer, useState} from 'react'
import { IQuote } from '../../modules/quote/models/quote-model'



interface IProps {
  versionData: any
  onSelect: any
  defaultVersion: any
}



const ArrowNavigation: React.FC<IProps> = ({ versionData, onSelect }) => {
  const [versionDropDown, setVersionDropDown] = useState(false)
  const initialState = {selectedIndex: 0}
  const list = versionData;
  const reducer = (state: any, action: any) => {
    let selectedIndex = 0;
    switch (action.type) {
      case 'arrowLeft':
        selectedIndex = state.selectedIndex !== 0 ? state.selectedIndex - 1 : list.length - 1;
        onSelect(selectedIndex);
        return {
          selectedIndex,
          
        }
      case 'arrowRight':
        selectedIndex = state.selectedIndex !== list.length - 1 ? state.selectedIndex + 1 : 0;
        onSelect(selectedIndex);
        return {
          selectedIndex
        }
      case 'select':
        onSelect(action.payload);
        return {selectedIndex: action.payload}
  
      default:
        throw new Error()
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const dropDownHandler = () => {
    setVersionDropDown((current) => !current)
  }
  
  return (
    <React.Fragment>
      <div className='versions'>
        <div className='row'>
          <div className='col-auto'>
            <a
              onClick={() => {
                dispatch({type: 'arrowLeft',payload: list[state.selectedIndex + 1]})
                // onSelect(list[state.selectedIndex + 1])
              }}
            >
              <i className='fa fa-chevron-left' aria-hidden='true'></i>
            </a>
          </div>
          <div className='col'>
            <div
              onClick={dropDownHandler}
              className='currentVersion d-flex align-items-center justify-content-between'
            >
              <span>{list[state.selectedIndex].quoteNumber} </span>
              <i className='fa fa-angle-down' aria-hidden='true'></i>
            </div>
            {versionDropDown && (
              <div className='versionItems'>
                {list.map((item: any, i: number) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      // onSelect(item)
                      dispatch({type: 'select', payload: i})
                    }}
                    style={{
                      cursor: 'pointer',
                      color: i === state.selectedIndex ? '#ff6601' : 'black',
                    }}
                    role='button'
                    aria-pressed={i === state.selectedIndex}
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        // onSeslect(item)
                        dispatch({ type: 'select', payload: i })
                      }
                    }}
                  >
                    {item.quoteNumber}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='col-auto'>
            <a
              onClick={() => {
                dispatch({type: 'arrowRight'})
              }}
            >
              <i className='fa fa-chevron-right' aria-hidden='true'></i>
            </a>
          </div>
        </div>
      </div>
      <hr className='hrVersion'/>
    </React.Fragment>
  )
}

export {ArrowNavigation}
