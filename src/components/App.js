import GridEg from "./../components/gridEg/index";
import HorizontalEg from "./../components/horizontalEg/index";
import "./../styles/App.css";
import GridSwap from "./gridSwapEg";
import React, { useReducer } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableItem } from "./sortableItem";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
const initialState = [
  {
    id: 1,
    sortOrder: 1,
    title: "Content collection",
    items: [
      { id: "1", text: "Pregnancy", sortOrder: 1 },
      { id: "2", text: "Common questions", sortOrder: 2 },
      { id: "3", text: "Dietary advice", sortOrder: 3 },
      { id: "4", text: "Give birth", sortOrder: 4 },
      { id: "5", text: "Breast feeding", sortOrder: 5 },
      { id: "6", text: "another random", sortorder: 6 },
      { id: "7", text: "new item ", sortOrder: 7 },
    ],
  },
  {
    id: 2,
    sortOrder: 2,
    title: "Pregnancy and child",
    items: [
      { id: "1", text: "Weekly info pregnancy", sortOrder: 1 },
      { id: "2", text: "Monthly info pregnancy", sortOrder: 2 },
    ],
  },
  // {
  //   id: 3,
  //   sortOrder: 3,
  //   title: "Blog posts",
  //   items: [
  //     { id: "1", text: "Weekly" },
  //     { id: "2", text: "Monthly" },
  //   ],
  // },
  // {
  //   id: 3,
  //   sortOrder: 4,
  //   title: "Tools",
  //   items: [
  //     { id: "1", text: "Mood tracker" },
  //     { id: "2", text: "Weight cal" },
  //   ],
  // },
  // {
  //   id: 5,
  //   sortOrder: 5,
  //   title: "Check lists",
  //   items: [
  //     { id: "1", text: "Pregnancy" },
  //     { id: "2", text: "Child" },
  //   ],
  // },
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
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={state} strategy={verticalListSortingStrategy}>
        {state
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map(item => (
            <SortableItem key={item.id} id={item.id}>
              <div className="label-text">
                <span>{item.title}</span>
                <div
                  style={{
                    _marginLeft: "5px",
                    get marginLeft() {
                      return this._marginLeft;
                    },
                    set marginLeft(value) {
                      this._marginLeft = value;
                    },
                    display: "inline-block",
                    backgroundColor: "red",
                  }}
                  onClick={() => {
                    console.log("edit clicked...");
                  }}
                >
                  edit
                </div>
                <span
                  style={{ marginLeft: "5px" }}
                  onClick={() => {
                    console.log("delete clicked...");
                  }}
                >
                  delete
                </span>
              </div>
              <GridSwap dispatch={dispatch} state={item} />
            </SortableItem>
          ))}
      </SortableContext>
    </DndContext>
    // <div className={["App"].join(" ")}>
    //   <div className="appContainer">
    //     <div>
    //       <p>Nested array of object</p>
    //       <HorizontalEg />
    //     </div>

    //     <div className="grid-egs">
    //       {/* <div>
    //         <p className='label-text'>Basic Grid with Drag Handle</p>
    //         <GridEg />
    //       </div> */}
    //       <div style={{ marginTop: "48px" }}>
    //         <p className="label-text">Grid Swap with Activation Constraint</p>
    //         <GridSwap state={state[0]} dispatch={dispatch} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

function handleDragEnd(event) {
  const { active, over } = event;

  // if (active.id !== over.id) {
  //   const oldIndex = state.indexOf(active.id);
  //   const newIndex = state.indexOf(over.id);
  //   const newOrder = arrayMove(state, oldIndex, newIndex);
  //   dispatch({
  //     type: "sortSection",
  //     payload: {
  //       id: state.id,
  //       items: newOrder,
  //     },
  //   });
  // }
}
export default App;
