import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackageList from "./PackageList";
import Stats from "./Stats";

export default function App() {
  // Array consisting of quantity, description and so on.
  const [items, setItems] = useState([]);

  //* Crud Functions
  function handleAddItems(item) {
    // State in React in immutable, so we cannot push item in the state
    // It creates new array consisting of older and new items
    setItems((items) => [...items, item]);
  }
  function handleDeleteItems(id) {
    // Returns true when item id does not matches with the passed id.
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        // Packed will become negative of orginal value
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackageList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItems={handleToggleItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
