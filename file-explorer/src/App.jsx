/* eslint-disable react/prop-types */
import { useState } from "react";
import mockdata from "./data.json";
import { FolderOpen } from "lucide-react";
import "./App.css";
import { Trash } from "lucide-react";
const List = ({ nodeList, handleAddNode, handleDeleteNode }) => {
  const [expanded, setExpanded] = useState({});

  return (
    <div className="container">
      {nodeList?.map((node) => {
        return (
          <div key={node.id}>
            <div className="list-item">
              {node?.isFolder && (
                <span
                  style={{ fontSize: "20px" }}
                  onClick={() =>
                    setExpanded({
                      ...expanded,
                      [node.name]: !expanded[node.name],
                    })
                  }
                >
                  {expanded[node.name] ? " - " : " + "}
                </span>
              )}
              <span>{node.name}</span>
              {node.isFolder && (
                <span onClick={() => handleAddNode(node.id)}>
                  <FolderOpen size={15} />
                </span>
              )}

              <span onClick={() => handleDeleteNode(node.id)}>
                <Trash size={15} />
              </span>
            </div>
            {node?.isFolder && expanded[node.name] && (
              <List
                nodeList={node.children}
                handleAddNode={handleAddNode}
                handleDeleteNode={handleDeleteNode}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

function App() {
  const [data, setData] = useState(mockdata);

  const addFolderRecursive = (nodes, id, name) => {
    return nodes.map((node) => {
      if (node.id === id) {
        return {
          ...node,
          children: [
            ...(node.children || []),
            {
              id: Date.now().toString(),
              name,
              isFolder: true,
              children: [],
            },
          ],
        };
      }
      if (node.children) {
        return {
          ...node,
          children: addFolderRecursive(node.children, id, name),
        };
      }
      return node;
    });
  };

  const deleteFolderRecursive = (nodes, id) => {
    return nodes
      .filter((node) => node.id !== id)
      .map((node) => {
        if (node.children) {
          return {
            ...node,
            children: deleteFolderRecursive(node.children, id),
          };
        }
        return node;
      });
  };

  const handleAddNode = (id) => {
    console.log(id);

    let name = prompt("Enter folder name");
    if (!name) return;
    setData((prev) => addFolderRecursive(prev, id, name));
  };

  const handleDeleteNode = (id) => {
    setData((prev) => deleteFolderRecursive(prev, id));
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>File Explorer</h1>
      <List
        nodeList={data}
        handleAddNode={handleAddNode}
        handleDeleteNode={handleDeleteNode}
      />
    </div>
  );
}

export default App;
