import {useReducer, useRef,useState} from "react";

const ListaCom = () => {

   const inputRef = useRef();
   const [editValue, setEditValue] = useState("");
   const [tasks,dispatch] = useReducer((state = [{name:"",}], action) => {
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



    


    return <div>
    <h1>Lista Computadoras</h1>
    <form onSubmit={handleSubmit}>
        <label>Agregar Tarea: </label>
        <input type="text" name="title" ref={inputRef} />
        <input type="submit" value="Enviar"  />
    </form>
    </div>

}


export default ListaCom;