import { AnimatePresence, motion } from "framer-motion";
import React, { useReducer, useRef } from "react";

interface Todo {
  isCompleted: boolean;
  todo: string;
  id: number;
}

interface AddTodo {
  type: "ADD";
  payload: Todo;
}

interface DeleteTodo {
  type: "DELETE";
  payload: number;
}

interface TodoState {
  todo: Todo[];
}

type Action = DeleteTodo | AddTodo;

const reducer = (state: TodoState, actions: Action): TodoState => {
  const { payload, type } = actions;
  switch (type) {
    case "ADD": {
      const newTodo = [payload, ...state.todo];
      return { ...state, todo: newTodo };
    }
    case "DELETE": {
      const newState = state.todo.filter(
        (singleTodo) => singleTodo.id !== payload,
      );
      return { ...state, todo: newState };
    }
    default:
      return state;
  }
};

const Todo = () => {
  const id = useRef(3);
  const [state, dispatch] = useReducer(reducer, {
    todo: [
      {
        todo: "third level",
        isCompleted: false,
        id: 3,
      },
      {
        todo: "second level",
        isCompleted: false,
        id: 2,
      },
      {
        todo: "another level",
        isCompleted: false,
        id: 1,
      },
    ],
  });

  return (
    <>
      <motion.button
        className="mx-auto block rounded-full bg-red-400 p-4 text-3xl font-medium text-red-800"
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          id.current++;
          dispatch({
            payload: {
              todo: `level number: ${id.current}`,
              id: id.current,
              isCompleted: false,
            },
            type: "ADD",
          });
        }}
      >
        Add Item
      </motion.button>
      <motion.ul>
        <AnimatePresence>
          {state.todo.map((singleTodo) => (
            <List dispatch={dispatch} key={singleTodo.id} {...singleTodo} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
};

const List = React.forwardRef<
  HTMLLIElement,
  {
    id: number;
    todo: string;
    dispatch: React.Dispatch<Action>;
  }
>(({ id, todo, dispatch }, ref) => {
  return (
    <motion.li
      className="m-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      layout
      ref={ref}
    >
      <p>{todo}</p>
      <button
        onClick={() => {
          dispatch({
            payload: id,
            type: "DELETE",
          });
        }}
        className="m-2 rounded bg-red-400 p-4"
      >
        Delete
      </button>
    </motion.li>
  );
});

export default Todo;
