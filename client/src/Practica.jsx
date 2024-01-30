// Crea un componente de contador simple que tenga un botón para incrementar y otro para decrementar el valor del contador

import { createContext, useContext , useState , useEffect} from "react"

export function Counter () {
    const [Count,SetCount]=useState(0);
    return(
        <div>
            <h1>{Count}</h1>
            <button onClick={() => SetCount(Count+1)}>Increment</button>
            <button onClick={() => SetCount(Count-1)}>Decrement</button>
        </div>

    )
}export default Counter;


export function TaskList(){
    const [tasks,setTasks]=useState([]);
    const [newTask,setNewTask]=useState("");
    const addTask=()=>{
        if (newTask !== "") {
            setTasks([...tasks, { name: newTask, completed: false }]);
            setNewTask("");
        }
    }
    const CompleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    }
    const DeleteTask = (index) => {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }
    return(
        <div>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => CompleteTask(index)}
                        />
                        {task.name}
                        <button onClick={() => DeleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export function Clock(){
    const [time,setTime]=useState(new Date());

    useEffect(()=>{
        const interval=setInterval(()=>{
            setTime(new Date());
        },1000);
        return ()=>clearInterval(interval);
    },[]);
        return (
            <div>
                <h1>
                   hora actual : {time.toLocaleTimeString()} 
                </h1>
            </div>
        );
    }




export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Nombre: ${formData.name}\nCorreo electrónico: ${formData.email}\nMensaje: ${formData.message}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <label>Correo electrónico:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <label>Mensaje:</label>
        <textarea name="message" value={formData.message} onChange={handleChange} />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
}



// Creamos el contexto
const StateContext = createContext();

// Creamos un provider que contendrá el estado
export const StateProvider = ({ children }) => {
  const [state, setState] = useState("franco");

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
};

// Creamos un hook personalizado para usar el contexto
const useStateContext = () => useContext(StateContext);


export function MyComponent() {
    const { state, setState } = useStateContext();
  
    return (
      <div>
        <p>State: {state}</p>
        <button onClick={() => setState("new state")}>Set State</button>
      </div>
    );
  }

  function Square({ value, onClick }) {
    return (
      <button className="square" onClick={onClick}>
        {value}
      </button>
    );
  }
  
  function Board({ squares, onClick }) {
    return (
      <div className="board">
        {squares.map((square, i) => (
          <Square key={i} value={square} onClick={() => onClick(i)} />
        ))}
      </div>
    );
  }
  
   export function TicTacToe() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
  
    const handleClick = (i) => {
      const newSquares = [...squares];
      if (calculateWinner(newSquares) || newSquares[i]) {
        return;
      }
      newSquares[i] = xIsNext ? 'X' : 'O';
      setSquares(newSquares);
      setXIsNext(!xIsNext);
    };
  
    const winner = calculateWinner(squares);
    let status;
    if (winner) {
      status = `Ganador: ${winner}`;
    } else {
      status = `Siguiente jugador: ${xIsNext ? 'X' : 'O'}`;
    }
    const handleReset = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
      };
    
  
    return (
      <div>
        <div>{status}</div>
        <Board squares={squares} onClick={handleClick} />
        <button onClick={handleReset}>Reiniciar</button>
      </div>
    );
  }
  
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  
  