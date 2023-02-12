import kanbanApi from "../api/kanbanapi.js";
import dropZone from "./dargDrop.js";
import Item from "./item.js";

export default class Column {
  constructor(id, title) {
    const dropTop = dropZone.creatDrop();
    this.elements = {};
    this.elements.root = Column.creatRoot();
    this.elements.title = this.elements.root.querySelector(
      ".kanban__column-title"
    );
    this.elements.items = this.elements.root.querySelector(
      ".kanban__column-items"
    );
    this.elements.addItem =
      this.elements.root.querySelector(".kanban__add-item");
    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;
    this.elements.items.appendChild(dropTop);
    this.elements.addItem.addEventListener("click", () => {
      const newItem = kanbanApi.insertItem(id, "");
      this.renderItem(newItem);
    });
    kanbanApi.getItems(id).forEach((element) => {
      this.renderItem(element);
    });
  }
  static creatRoot() {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(`
            <div class="kanban__column">
            <div class="kanban__column-title">
            </div>
            <div class="kanban__column-items">
            </div>
            <button class="kanban__add-item" type="button">+ add</button>
          </div>`).children[0];
  }
  renderItem(data) {
    const item = new Item(data.id, data.content);
    this.elements.items.appendChild(item.elements.root);
  }
}
