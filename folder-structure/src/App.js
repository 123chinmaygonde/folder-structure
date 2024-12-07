import React,{useState} from 'react'
import FolderTree from './components/FolderTree'
import folderData from './Data/FolderData'
import "./App.css"
const App = () => {
  const [data,setData]= useState(folderData)
  const handleEdit=(key)=>{
    const newName = prompt("Enter new name:",key)
    if(!newName) return
    const updateData=(obj)=>{
      const newObj = {...obj}
      Object.entries(newObj).forEach(([k,v])=>{
        if(k===key){
          newObj[newName]= v
          delete newObj[key]
        }else if(typeof v === "object" && !Array.isArray(v)){
          newObj[k]=updateData(v)
        }
      })
      return newObj
    }
    setData(updateData(data))
  }
  const handleDelete=(key)=>{
    const deleteData=(obj)=>{
      const newObj ={...obj}
      Object.entries(newObj).forEach(([k,v])=>{
        if(k===key){
          delete newObj[key]

        }else if(typeof v === "object" && !Array.isArray(v)){
          newObj[k]= deleteData(v)
        }
      })
      return newObj
    }
    setData(deleteData(data))
  }
  const handleAdd = (parentKey) => {
    const newName = prompt("Enter name for new file/folder:");
    if (!newName) return;

    const addData = (obj) => {
      const newObj = { ...obj };
      Object.entries(newObj).forEach(([k, v]) => {
        if (k === parentKey) {
          if (typeof v === "object" && !Array.isArray(v)) {
            newObj[k][newName] = [];
          } else if (Array.isArray(v)) {
            newObj[k].push(newName);
          }
        } else if (typeof v === "object" && !Array.isArray(v)) {
          newObj[k] = addData(v);
        }
      });
      return newObj;
    };

    setData(addData(data));
  };

  return (
    <div className='App'>
      <h1>Folder Structure</h1>
      <FolderTree data={data} onEdit={handleEdit} onDelete={handleDelete} onAdd={handleAdd}/>
      
    </div>
  )
}

export default App
