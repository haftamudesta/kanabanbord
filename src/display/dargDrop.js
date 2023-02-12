import kanbanApi from "../api/kanbanapi.js";

export default class dropZone {
  static creatDrop() {
    const range = document.createRange();
    range.selectNode(document.body);
    const dropedElement = range.createContextualFragment(`
        <div class="kanban__dropzone"</div>`).children[0];
    dropedElement.addEventListener("dragover", (event) => {
      event.preventDefault();
      dropedElement.classList.add("kanban__dropzone--active");
    });
    dropedElement.addEventListener("dragleave", () => {
      dropedElement.classList.remove("kanban__dropzone--active");
    });
    dropedElement.addEventListener("drop", (event) => {
      event.preventDefault();
      dropedElement.classList.remove("kanban__dropzone--active");
      const columnElement = dropedElement.closest(".kanban__column");
      const columnId = Number(columnElement.dataset.id);
      const dropInColumn = Array.from(
        columnElement.querySelectorAll(".kanban__dropzone")
      );
      const dropedIndex = dropInColumn.indexOf(dropedElement);
      const itemId = Number(event.dataTransfer.getData("text/plain"));
      const dropedItemElement = document.querySelector(`[data-id="${itemId}"]`);
      const insertElement = dropedElement.parentElement.classList.contains(
        "kanban__item"
      )
        ? dropedElement.parentElement
        : dropedElement;
      if (dropedItemElement.contains(dropedElement)) {
        return;
      }
      insertElement.after(dropedItemElement);
      kanbanApi.updateItem(itemId, {
        columnId,
        position: dropedIndex,
      });
    });
    return dropedElement;
  }
}
