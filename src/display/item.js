import kanbanApi from "../api/kanbanapi.js";
import dropZone from "./dargDrop.js";

export default class Item {
  constructor(id, content) {
    const bottomDrop = dropZone.creatDrop();
    this.elements = {};
    this.elements.root = Item.creatRoot();
    this.elements.input = this.elements.root.querySelector(
      ".kanban__item-input"
    );
    this.elements.root.dataset.id = id;
    this.elements.input.textContent = content;
    this.content = content;
    this.elements.root.appendChild(bottomDrop);

    const onBlur = () => {
      const newContent = this.elements.input.textContent.trim();
      if (newContent === this.content) {
        return;
      }
      this.content = newContent;
      kanbanApi.updateItem(id, {
        content: this.content,
      });
    };
    this.elements.input.addEventListener("blur", onBlur);
    this.elements.root.addEventListener("dblclick", () => {
      const check = confirm("make sure you are deleting an item");
      if (check) {
        kanbanApi.deleteItem(id);
        this.elements.input.removeEventListener("blur", onBlur);
        this.elements.root.parentElement.removeChild(this.elements.root);
      }
    });
    this.elements.root.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", id);
    });
    this.elements.input.addEventListener("drop", (event) => {
      event.preventDefault();
    });
  }

  static creatRoot() {
    const range = document.createRange();
    range.selectNode(document.body);
    return range.createContextualFragment(`
    <div class="kanban__item" draggable="true">
    <div class="kanban__item-input" contenteditable></div>
  </div>`).children[0];
  }
}
