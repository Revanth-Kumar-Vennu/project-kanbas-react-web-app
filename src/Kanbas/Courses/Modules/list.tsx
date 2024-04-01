import React, { useEffect, useState } from "react";
import {
  FaEllipsisV,
  FaCheckCircle,
  FaPlus,
  FaAngleDown,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { useParams } from "react-router";
import "./index.css";
import Popup from "./popup";
import { useSelector, useDispatch } from "react-redux";
import {
  addModule,
  deleteModule,
  updateModule,
  setModule,
  setModules,
} from "./reducer";
import { KanbasState } from "../../store";
import * as client from "./client";

function ModuleList() {
  const { courseId } = useParams();
  const moduleList = useSelector(
    (state: KanbasState) => state.modulesReducer.modules
  );
  const module = useSelector(
    (state: KanbasState) => state.modulesReducer.module
  );
  const dummyModule = useSelector(
    (state: KanbasState) => state.modulesReducer.dummyModule
  );

  const dispatch = useDispatch();
  const [selectedModule, setSelectedModule] = useState(moduleList[0]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState("Add Module");
  useEffect(() => {
    client
      .findModulesForCourse(courseId)
      .then((modules) => dispatch(setModules(modules)));
  }, [courseId, dispatch]);

  const handleEditModule = async () => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
    setShowPopup(false);
    dispatch(setModule(dummyModule));
  };

  const handleAddModule = () => {
    client.createModule(courseId, module).then((module) => {
      dispatch(addModule(module));
      setShowPopup(false);
      dispatch(setModule(dummyModule));
    });
  };
  const handleDeleteModule = (moduleId: string) => {
    client.deleteModule(moduleId).then((status) => {
      dispatch(deleteModule(moduleId));
    });
  };

  const handleCancel = () => {
    dispatch(setModule(dummyModule));
    setShowPopup(false);
  };

  return (
    <div className="flex-grow-1" style={{ marginRight: 55 }}>
      <div className="d-flex justify-content-end mb-3 wd-module-buttons-group ">
        <button className="btn btn-secondary me-2 wd-module-button">
          Collapse All
        </button>
        <button className="btn btn-secondary me-2 wd-module-button">
          View Progress
        </button>
        <div className="dropdown me-1">
          <button
            className="btn btn-secondary dropdown-toggle wd-module-button"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaCheckCircle className="text-success" /> Publish All
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>Publish All</li>
            <li>Unpublish All</li>
          </ul>
        </div>
        <button
          className="btn btn-danger me-2"
          onClick={() => {
            setShowPopup(true);
            setPopupTitle("Add Module");
          }}
        >
          <FaPlus className="fas fa-plus me-2" /> Module
        </button>
        <button className="btn btn-secondary me-2 wd-module-button">
          <FaEllipsisV className="float-end" />
        </button>
      </div>
      <hr />
      {showPopup && (
        <Popup
          title={popupTitle}
          module={module}
          onSubmit={
            popupTitle === "Add Module" ? handleAddModule : handleEditModule
          }
          onCancel={handleCancel}
        />
      )}
      <div style={{ width: "100%" }}>
        <ul className="list-group wd-modules">
          {moduleList
            .filter((module) => module.course === courseId)
            .map((module) => (
              <li
                className="list-group-item wd-module-item remove-padding"
                onClick={() => setSelectedModule(module)}
              >
                <div style={{ height: 50 }} className="align-items-center">
                  <div style={{ padding: 10 }}>
                    <FaEllipsisV className=" wd-dots ms-2" />
                    <FaAngleDown className=" wd-dots me-2" />

                    {module.name}
                    <span className="float-end">
                      <FaCheckCircle className="text-success" />
                      <FaPlus className="wd-dots ms-2" />
                      <FaEllipsisV className=" wd-dots ms-2" />
                      <FaEdit
                        className=" wd-dots ms-2"
                        onClick={() => {
                          setShowPopup(true);
                          dispatch(setModule(module));
                          setPopupTitle("Edit Module");
                        }}
                      />
                      <FaTrash
                        className="wd-dots ms-2"
                        onClick={() => handleDeleteModule(module?._id)}
                      />
                    </span>
                    <br />
                  </div>
                </div>
                {selectedModule?._id === module?._id && (
                  <ul className="list-group">
                    {module.lessons?.map((lesson: any) => (
                      <li className="list-group-item remove-padding">
                        <div
                          style={{ height: 50 }}
                          className="align-items-center"
                        >
                          <div style={{ padding: 10 }}>
                            <FaEllipsisV className=" wd-dots me-2" />
                            {lesson.name}
                            <span className="float-end">
                              <FaCheckCircle className="text-success" />
                              <FaEllipsisV className=" wd-dots ms-2" />
                            </span>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
export default ModuleList;
