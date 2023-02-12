import Column from "./column.js";
export default class renderKanban {
  constructor(root) {
    this.root = root;
    renderKanban.columns().forEach((element) => {
      const columnView = new Column(element.id, element.title);
      this.root.appendChild(columnView.elements.root);
    });
  }

  static columns() {
    return [
      {
        id: 1,
        title: "not started",
      },
      {
        id: 2,
        title: "In Progress",
      },
      {
        id: 3,
        title: "Completed",
      },
    ];
  }
}
