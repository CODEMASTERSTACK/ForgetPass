document.addEventListener('DOMContentLoaded', () => {
    const addNewBtn = document.getElementById('add-new-btn');
    const addModal = document.getElementById('add-modal');
    const addPasswordForm = document.getElementById('add-password-form');
    const passwordList = document.querySelector('.password-list');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');

    let passwords = [];
    let editingIndex = -1;

    addNewBtn.addEventListener('click', () => {
        editingIndex = -1;
        document.getElementById('add-modal-title').textContent = 'Add New Password';
        addPasswordForm.reset();
        addModal.style.display = 'block';
    });

    window.onclick = (event) => {
        if (event.target === addModal) {
            addModal.style.display = 'none';
        }
    };

    addPasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const accountName = document.getElementById('account-name').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (accountName && username && password) {
            if (editingIndex === -1) {
                // Adding new password
                passwords.push({ accountName, username, password });
            } else {
                // Editing existing password
                passwords[editingIndex] = { accountName, username, password };
                editingIndex = -1;
            }
            renderPasswords();
            addPasswordForm.reset();
            addModal.style.display = 'none';
        }
    });

    function renderPasswords(passwordsToRender = passwords) {
        const headerItem = passwordList.querySelector('.password-item.header');
        passwordList.innerHTML = '';
        passwordList.appendChild(headerItem);

        passwordsToRender.forEach((password, index) => {
            const passwordItem = document.createElement('div');
            passwordItem.classList.add('password-item');
            passwordItem.innerHTML = `
                <span>${password.accountName}</span>
                <span>${password.username}</span>
                <span>••••••••</span>
                <div class="action-buttons">
                    <button class="view-btn" onclick="viewPassword(${index})">View</button>
                    <button class="edit-btn" onclick="editPassword(${index})">Edit</button>
                    <button class="delete-btn" onclick="deletePassword(${index})">Delete</button>
                </div>
            `;
            passwordList.appendChild(passwordItem);
        });
    }

    window.viewPassword = (index) => {
        alert(`Password: ${passwords[index].password}`);
    };

    window.editPassword = (index) => {
        editingIndex = index;
        const password = passwords[index];
        document.getElementById('add-modal-title').textContent = 'Edit Password';
        document.getElementById('account-name').value = password.accountName;
        document.getElementById('username').value = password.username;
        document.getElementById('password').value = password.password;
        addModal.style.display = 'block';
    };

    window.deletePassword = (index) => {
        if (confirm('Are you sure you want to delete this password?')) {
            passwords.splice(index, 1);
            renderPasswords();
        }
    };

    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPasswords = passwords.filter(password => 
            password.accountName.toLowerCase().includes(searchTerm) ||
            password.username.toLowerCase().includes(searchTerm)
        );
        renderPasswords(filteredPasswords);
    });

    // Initial render
    renderPasswords();
});