import GridEg from "./../components/gridEg/index";
import HorizontalEg from "./../components/horizontalEg/index";
import "./../styles/App.css";
import GridSwap from "./gridSwapEg";
import React, { useReducer } from "react";
const initialState = [
  {
    id: 1,
    sortOrder: 1,
    title: "Content collection",
    items: [
      { id: "1", text: "Pregnancy" },
      { id: "2", text: "Common questions" },
      { id: "3", text: "Dietary advice" },
      { id: "4", text: "Give birth" },
      { id: "5", text: "Breast feeding" },
    ],
  },
  {
    id: 2,
    sortOrder: 2,
    title: "Pregnancy and child",
    items: [
      { id: "1", text: "Weekly info pregnancy" },
      { id: "2", text: "Monthly info pregnancy" },
    ],
  },
  {
    id: 3,
    sortOrder: 3,
    title: "Blog posts",
    items: [
      { id: "1", text: "Weekly" },
      { id: "2", text: "Monthly" },
    ],
  },
  {
    id: 3,
    sortOrder: 4,
    title: "Tools",
    items: [
      { id: "1", text: "Mood tracker" },
      { id: "2", text: "Weight cal" },
    ],
  },
  {
    id: 5,
    sortOrder: 5,
    title: "Check lists",
    items: [
      { id: "1", text: "Pregnancy" },
      { id: "2", text: "Child" },
    ],
  },
];

const reducer = (state, action) => {
  debugger;
  switch (action.type) {
    case "sortSection":
      return state;
    case "sortItem":
      const filtered = state.filter(x => x.id !== action.payload.id);
      const changedItem = state.find(x => x.id === action.payload.id);
      const newState = [
        ...filtered,
        { ...changedItem, items: action.payload.items },
      ];
      return newState;
    case "editItem":
    case "deleteItem":
      return state;
    default:
      throw new Error();
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className={["App"].join(" ")}>
      <div className="appContainer">
        <div>
          <p>Nested array of object</p>
          <HorizontalEg />
        </div>

        <div className="grid-egs">
          {/* <div>
            <p className='label-text'>Basic Grid with Drag Handle</p>
            <GridEg />
          </div> */}
          <div style={{ marginTop: "48px" }}>
            <p className="label-text">Grid Swap with Activation Constraint</p>
            <GridSwap state={state} dispatch={dispatch} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
