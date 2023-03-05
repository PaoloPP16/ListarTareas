 import {useReducer,useRef,useState} from "react";

 const ListaTareas = () => {

    const inputRef =   useRef   ();
    const [editValue, setEditValue] = useState("");
    const [tasks,dispatch] = useReducer((state = [], action) => {
        switch(action.type){
            case 'add_task':{
                return [
                    ...state,
                    {id: state.length, title: action.title}
                ]
            }
            case 'remove_task': {
                return state.filter((task,index)=> index != action.index);
            }
            case 'edit_task': {
                return state.map((v,idx)=>{
                    if (idx === action.index){
                        v.title=action.title
                    }
                    return {...v}
                });

            }
            default :{
               console.log("error")
            }
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: 'add_task',
            title: inputRef.current.value
            
        })
    
    }
    const handleEdit = (event,idx) =>{
        event.preventDefault();
        dispatch({
            type:"edit_task",
            title:editValue,
            index: idx
        })

    }
    console.log(tasks)
    return <div>
        <h1>Lista de tareas</h1>
        <form onSubmit={handleSubmit}>
            <label>Agregar Tarea: </label>
            <input type="text" name="title" ref={inputRef} />
            <input type="submit" value="Enviar"  />
        </form>
        <div className="tasks">
            {tasks && tasks.map((task, index) => (
                <div className="task" key={index}>
                    <p>{task.title}</p>
                    <button onClick={()=>dispatch({type:'remove_task', index:index})}>Borrar
                    </button>
                    <form onSubmit={(ev)=>handleEdit(ev,index)}>
                        <input type="text" name="title" value={editValue} onChange={(e)=>setEditValue(e.target.value)} />
                        <input type="submit" value="Editar"  />
                    </form>
                </div>
            ))}
        </div>
    </div>

 }


 export default ListaTareas;