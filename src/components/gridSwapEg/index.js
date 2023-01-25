import { SortableItem } from "../sortableItem";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSwappingStrategy,
  arraySwap,
} from "@dnd-kit/sortable";
import "./../../styles/App.css";
import { ColorArrayMapping } from "../../shared/constants";

function GridSwap({ state, dispatch }) {

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleGridClick = values => {
    console.log(values.text);
    window.alert(values.text);
  };

  return (
    <div className="App">
      <div className={"gridcontainer"}>
        <DndContext
          id={"grid-dnd"}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          collisionDetection={closestCenter}
        >
          <SortableContext
            strategy={rectSwappingStrategy}
            id={"grid-sort-context"}
            items={state?.items.map(i => i?.id)}
            reorderItems={arraySwap}
          >
            {state?.items
              .sort((a, b) => a.sortOrder - b.sortOrder)
              .map(value => {
                const bgColor = ColorArrayMapping[value?.id];
                return (
                  <SortableItem key={value?.id} id={value?.id}>
                    <div
                      className={[`bg${bgColor}`, `gridItem`].join(" ")}
                      onClick={() => handleGridClick(value)}
                    >
                      <p>{value?.text}</p>
                      <p className="clickme">click me</p>
                    </div>
                  </SortableItem>
                );
              })}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );

  function handleDragEnd(event) {
    debugger;
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldItem = state?.items.find(x => x.id === active.id);
      const newItem = state?.items.find(x => x.id === over.id);
      const newOrder = state?.items.map(x => {
        if (x.id === oldItem.id) {
          return { ...x, sortOrder: newItem?.sortOrder };
        } else if (x.id === newItem.id) {
          return { ...x, sortOrder: oldItem?.sortOrder };
        } else return x;
      });

      dispatch({
        type: "sortItem",
        payload: {
          id: state.id,
          items: newOrder,
        },
      });
    }
  }
}

export default GridSwap;
