const contactForm = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');
const searchInput = document.getElementById('search');

let contacts = [];

//  Fetch all contacts
const apiURL = "https://jsonplaceholder.typicode.com/users";
async function fetchContacts() {
  try {
    const res = await fetch(apiURL);
    if (!res.ok) throw new Error("Network response was not ok");
    contacts = await res.json();
    displayContacts(contacts);
  } catch (err) {
    alert("Failed to fetch contacts: " + err.message);
  }
}

//Display all contacts
    function displayContacts(data) {
      contactList.innerHTML = '';
      data.forEach((contact, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${contact.name} - ${contact.phone}
          <button onclick="editContact(${index})">Edit</button>
          <button onclick="deleteContact(${index})">Delete</button>
        `;
        contactList.appendChild(li);
      });
    }

//Add new contact
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();

      if (!name || !phone) {
        alert("Please fill all fields");
        return;
      }

      contacts.push({ name, phone });
      displayContacts(contacts);
      contactForm.reset();
    });

//Edit contact
    function editContact(index) {
      const contact = contacts[index];
      document.getElementById('name').value = contact.name;
      document.getElementById('phone').value = contact.phone;
      deleteContact(index);
    }

//Delete contact
    function deleteContact(index) {
      contacts.splice(index, 1);
      displayContacts(contacts);
    }

//Search contacts
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(query) || c.phone.includes(query)
      );
      displayContacts(filtered);
    });
    
//Load initial data
    fetchContacts();
