const contacts = document.getElementsByClassName("contacts")[0];
const stickyHeader = document.getElementsByClassName("stickyHeader")[0];

function init() { // Добавление самых первых элементов блока
  const fragment = document.createDocumentFragment();
  const childCount = Math.ceil(contacts.clientHeight / 18) + 5;
  for (let i = 0; i < childCount; i++) {
    const child = document.createElement("div");
    child.textContent = i;
    child.classList.add("contact");
    fragment.appendChild(child);
  }
  contacts.appendChild(fragment);
}

function addContacts() {  // Добавление блоков 
  const count = 50000 - contacts.childElementCount > 10 ? 10 : 50000 - contacts.childElementCount;  // Добавляемое количество элемнтов (чтобы не превысить порог 50000)
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      const child = document.createElement("div");
      child.textContent = contacts.childElementCount + 1;
      child.classList.add("contact");
      contacts.appendChild(child);  
    }
  }
}

contacts.addEventListener("scroll", (e) => {
  const items = Array.from(contacts.getElementsByClassName("contact"));
  const itemOffsets = items.map((item) => item.offsetTop);
  const topItemIndex = itemOffsets.findIndex(
    (offset) => contacts.scrollTop - offset <= -18
  );
  if (topItemIndex !== -1) {
    stickyHeader.textContent = items[topItemIndex].textContent;
  }
  if (contacts.scrollHeight - contacts.scrollTop - contacts.clientHeight === 0) addContacts();
});

init();