export default class kanbanApi {
  static getItems(columnId) {
    const column = read().find((column) => column.id == columnId);
    if (!column) {
      return [];
    }
    return column.items;
  }
  static insertItem(columnId, content) {
    const data = read();
    const column = data.find((column) => column.id == columnId);
    const item = {
      id: Math.floor(Math.random() * 100000),
      content,
    };
    if (!column) {
      return; //you can throw an error
    }
    column.items.push(item);
    save(data);
    return item;
  }
  static updateItem(itemId, newProps) {
    const data = read();
    const [item, currentColumn] = (() => {
      for (const column of data) {
        const item = column.items.find((item) => item.id == itemId);
        if (item) {
          return [item, column];
        }
      }
    })();
    if (!item) {
      return; //you can throw error
    }
    item.content =
      newProps.content === undefined ? item.content : newProps.content;
    if (newProps.columnId !== undefined && newProps.position !== undefined) {
      const targerColumn = data.find(
        (column) => (column.id = newProps.columnId)
      );
      if (!targerColumn) {
        return; //you can throw error
      }
      currentColumn.items.splice(currentColumn.items.indexOf(item, 1));
      targerColumn.items.splice(newProps.position, 0, item);
    }
    save(data);
  }
  static deleteItem(itemId) {
    const data = read();
    for (const column of data) {
      const item = column.items.find((item) => item.id === itemId);
      if (item) {
        column.items.splice(column.items.indexOf(item), 1);
      }
    }
    save(data);
  }
}

function read() {
  const json = localStorage.getItem("kanban-data");
  if (!json) {
    return [
      {
        id: 1,
        items: [],
      },
      {
        id: 2,
        items: [],
      },
      {
        id: 3,
        items: [],
      },
    ];
  }
  return JSON.parse(json);
}

function save(data) {
  localStorage.setItem("kanban-data", JSON.stringify(data));
}
