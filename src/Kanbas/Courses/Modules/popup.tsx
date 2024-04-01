import React from "react";
import { useDispatch } from "react-redux";
import {
    setModule,
  } from "./reducer";

function Popup({
  title,
    module,
  onSubmit,
  onCancel,
}: {
  title: string;
    module: any;
  onSubmit: () => void;
  onCancel: () => void;
}) {
    
    const dispatch = useDispatch();
   


  return (
    <div className="popup-container">
      <div className="popup">
        <div>
          <h2>{title}</h2>
        <div className="mb-3">
            <label htmlFor="moduleName" className="form-label">
                Module Name
            </label>
            <input
                type="text"
                className="form-control"
                id="moduleName"
                name="moduleName"
                value={module.name}
                onChange={(e) =>
                    dispatch(setModule({ ...module, name: e.target.value }))
                  }/>
        
            
        </div>
          <div className="mb-3">
            <label htmlFor="moduleDescription" className="form-label">
              Module Description
            </label>
            <textarea
              className="form-control"
              id="moduleDescription"
              name="moduleDescription"
              value={module.description}
              onChange={(e) =>
                dispatch(setModule({ ...module, description: e.target.value }))
              }
            ></textarea>
          </div>
          <div className="d-flex">
            <button className="btn btn-success" onClick={onSubmit}>
              {title}
            </button>{" "}
            &nbsp;
            <button className="btn btn-danger ms-auto" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
