import { v4 as uuidv4 } from "uuid";

import "./index.css";

type Item = {
  id: string;
  name: string;
  email: string;
};

const form = document.querySelector<HTMLFormElement>("#add-user-form");
const name = document.querySelector<HTMLInputElement>("#name");
const email = document.querySelector<HTMLInputElement>("#email");
const user = document.querySelector<HTMLDivElement>("#user-list");
const userList: Item[] = loadUser();

userList.forEach(addUser);

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!name?.value.trim() || !email?.value.trim()) return;

  const userItem: Item = createUser(name.value, email.value);

  userList.push(userItem);
  addUser(userItem);
  saveUser();

  resetForm();
});

function createUser(name: string, email: string): Item {
  return {
    id: uuidv4(),
    name,
    email,
  };
}

function addUser(item: Item) {
  const container = document.createElement("div");
  const nameElement = document.createElement("p");
  const emailElement = document.createElement("p");
  const deleteButton = document.createElement("button");

  nameElement.textContent = item.name;
  emailElement.textContent = item.email;
  deleteButton.textContent = "Delete";

  container.append(nameElement, emailElement, deleteButton);
  user?.append(container);

  container.classList.add(
    "p-6",
    "bg-slate-800",
    "rounded-md",
    "text-center",
    "text-slate-200"
  );

  deleteButton.classList.add(
    "mt-2",
    "bg-red-500",
    "text-white",
    "p-2",
    "rounded",
    "cursor-pointer"
  );

  deleteButton.addEventListener("click", () => {
    removeUser(item.id);
    container.remove();
  });
}

function removeUser(id: string) {
  const index = userList.findIndex((user) => user.id === id);
  if (index !== -1) {
    userList.splice(index, 1);
    saveUser();
  }
}

function saveUser() {
  localStorage.setItem("item", JSON.stringify(userList));
}

function loadUser(): Item[] {
  const data = localStorage.getItem("item");
  return data ? JSON.parse(data) : [];
}

function resetForm() {
  if (name && email) {
    name.value = "";
    email.value = "";
  }
}
