// Event listeners for tab switching and form submissions
function initializeEventListeners() {
    document.querySelector('.tabs').addEventListener('click', function (e) {
        if (e.target.classList.contains('tab')) {
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

            e.target.classList.add('active');
            const tabContentId = e.target.getAttribute('data-tab');
            document.getElementById(tabContentId).classList.add('active');
        }
    });

    document.getElementById('animal-form').addEventListener('submit', handleFormSubmission);
    document.getElementById('financial-form').addEventListener('submit', handleFormSubmission);
    document.getElementById('vaccine-form').addEventListener('submit', handleFormSubmission);
}

// Handle form submissions
function handleFormSubmission(event) {
    event.preventDefault();
    const form = event.target;

    if (form.id === 'animal-form') {
        const name = form.name.value.trim();
        const species = form.species.value.trim();
        const birthdate = form.birthdate.value || null;
        const breed = form.breed.value || null;

        if (name && species) {
            addAnimalRecord(name, species, birthdate, breed);
            form.reset();
        }
    } else if (form.id === 'financial-form') {
        const transaction = form.transaction.value.trim();
        const amount = parseFloat(form.amount.value);

        if (transaction && !isNaN(amount)) {
            addTransactionRecord(transaction, amount);
            form.reset();
        }
    } else if (form.id === 'vaccine-form') {
        const vaccine = form.vaccine.value.trim();
        const date = form.date.value;

        if (vaccine && date) {
            addVaccineRecord(vaccine, date);
            form.reset();
        }
    }
}

// Toggle animal details display
function toggleAnimalDetails(data) {
    const detailsSection = document.getElementById('animal-details');
    const isVisible = detailsSection.style.display === 'block';

    if (!isVisible || detailsSection.dataset.currentName !== data.name) {
        detailsSection.style.display = 'block';
        detailsSection.dataset.currentName = data.name;
        detailsSection.innerHTML = `
            <h3>Animal Details</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Species:</strong> ${data.species}</p>
            <p><strong>Birthdate:</strong> ${data.birthdate || 'Unknown'}</p>
            <p><strong>Breed:</strong> ${data.breed || 'Unknown'}</p>
        `;
    } else {
        detailsSection.style.display = 'none';
        detailsSection.dataset.currentName = '';
    }
}

// Remove animal record from DOM
function removeAnimalRecord(animalName) {
    const animalList = document.getElementById('animal-list');
    const animalItems = animalList.querySelectorAll('.record-item');

    animalItems.forEach(item => {
        if (item.dataset.name === animalName.toLowerCase()) {
            animalList.removeChild(item);
        }
    });
}

// Add animal record - API connected version
function addAnimalRecord(name, species, birthdate = null, breed = null) {
    fetch('/api/animals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ name, species, birthdate, breed })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const recordItem = document.createElement('div');
        recordItem.classList.add('record-item');
        recordItem.dataset.name = name.toLowerCase();
        recordItem.dataset.species = species;
        recordItem.dataset.birthdate = birthdate || 'Unknown';
        recordItem.dataset.breed = breed || 'Unknown';
        recordItem.dataset.status = 'Healthy';
        recordItem.textContent = `${name} - ${species}`;

        recordItem.addEventListener('click', function () {
            toggleAnimalDetails(recordItem.dataset);
        });

        document.getElementById('animal-list').appendChild(recordItem);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add animal: ' + error.message);
    });
}

// Add transaction record - API connected version
function addTransactionRecord(transaction, amount) {
    fetch('/api/transactions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ transaction, amount })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const recordItem = document.createElement('div');
        recordItem.classList.add('record-item');
        recordItem.textContent = `${transaction} - $${amount.toFixed(2)}`;
        document.getElementById('financial-list').appendChild(recordItem);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add transaction: ' + error.message);
    });
}

// Add vaccine record - API connected version
function addVaccineRecord(vaccine, date) {
    fetch('/api/vaccines', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({ vaccine, date })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        const recordItem = document.createElement('div');
        recordItem.classList.add('record-item');
        recordItem.textContent = `${vaccine} - ${date}`;
        document.getElementById('vaccine-list').appendChild(recordItem);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add vaccine: ' + error.message);
    });
}

// Load existing records from the database
function loadRecords() {
    // Clear existing records
    document.getElementById('animal-list').innerHTML = '';
    document.getElementById('financial-list').innerHTML = '';
    document.getElementById('vaccine-list').innerHTML = '';
    
    // Fetch animals
    fetch('/api/animals')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch animals');
            }
            return response.json();
        })
        .then(animals => {
            if (animals && animals.length > 0) {
                animals.forEach(animal => {
                    const recordItem = document.createElement('div');
                    recordItem.classList.add('record-item');
                    recordItem.dataset.name = animal.name.toLowerCase();
                    recordItem.dataset.species = animal.species;
                    recordItem.dataset.birthdate = animal.birthdate || 'Unknown';
                    recordItem.dataset.breed = animal.breed || 'Unknown';
                    recordItem.dataset.status = animal.status || 'Healthy';
                    recordItem.textContent = `${animal.name} - ${animal.species}`;
            
                    recordItem.addEventListener('click', function () {
                        toggleAnimalDetails(recordItem.dataset);
                    });
            
                    document.getElementById('animal-list').appendChild(recordItem);
                });
            }
        })
        .catch(error => console.error('Error loading animals:', error));

    // Fetch transactions
    fetch('/api/transactions')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch transactions');
            }
            return response.json();
        })
        .then(transactions => {
            if (transactions && transactions.length > 0) {
                transactions.forEach(transaction => {
                    const recordItem = document.createElement('div');
                    recordItem.classList.add('record-item');
                    recordItem.textContent = `${transaction.transaction} - $${parseFloat(transaction.amount).toFixed(2)}`;
                    document.getElementById('financial-list').appendChild(recordItem);
                });
            }
        })
        .catch(error => console.error('Error loading transactions:', error));

    // Fetch vaccines
    fetch('/api/vaccines')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch vaccines');
            }
            return response.json();
        })
        .then(vaccines => {
            if (vaccines && vaccines.length > 0) {
                vaccines.forEach(vaccine => {
                    const recordItem = document.createElement('div');
                    recordItem.classList.add('record-item');
                    recordItem.textContent = `${vaccine.vaccine} - ${vaccine.date}`;
                    document.getElementById('vaccine-list').appendChild(recordItem);
                });
            }
        })
        .catch(error => console.error('Error loading vaccines:', error));
}

// Initialize event listeners and load records
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    loadRecords();
});