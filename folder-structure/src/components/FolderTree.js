import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const FolderTree = ({ data, depth = 0, onEdit, onDelete, onAdd }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => setIsOpen(!isOpen);

  return (
    <div style={{ paddingLeft: `${depth * 20}px`, marginBottom: "5px" }}>
      {Object.entries(data).map(([key, value]) => {
        const isFolder = typeof value === "object" && !Array.isArray(value);

        return (
          <div key={uuidv4()}>
            <div style={{ display: "flex", alignItems: "center" }}>
              {isFolder ? (
                <>
                  <span
                    style={{ cursor: "pointer", marginRight: "8px" }}
                    onClick={toggleFolder}
                  >
                    {isOpen ? "▼" : "▶"}
                  </span>
                  <strong>{key}</strong>
                </>
              ) : (
                <span>{key}</span>
              )}
              <button style={{ marginLeft: "8px" }} onClick={() => onEdit(key)}>
                Edit
              </button>
              <button onClick={() => onDelete(key)}>Delete</button>
              {isFolder && <button onClick={() => onAdd(key)}>Add</button>}
            </div>
            {isFolder && isOpen && (
              <FolderTree
                data={value}
                depth={depth + 1}
                onEdit={onEdit}
                onDelete={onDelete}
                onAdd={onAdd}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FolderTree;