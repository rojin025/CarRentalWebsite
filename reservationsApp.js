const APP = {
    data: [],
    init() {
        APP.addListeners();
    },
    addListeners() {
        const form = document.querySelector('#collect');
        form.addEventListener('submit', APP.saveData);
    },
    saveData(ev) {
        ev.preventDefault();
        const form = ev.target;
        const formData = new FormData(form);
        APP.cacheData(formData);
        form.reset();
        document.getElementById('fullName').focus();
    },
    cacheData(formData) {
        APP.data.push(Array.from(formData.values()));
        console.table(APP.data);

        // Convert data to CSV format
        const csvContent = APP.convertToCSV(APP.data);

        // Create a Blob from the CSV content
        const blob = new Blob([csvContent], { type: 'text/csv' });

        // Create a download link
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'reservationsData.csv';
        a.style.display = 'none';

        // Append the link to the document and trigger the download
        document.body.appendChild(a);
        a.click();

        // Clean up by revoking the URL
        URL.revokeObjectURL(a.href);
    },
    convertToCSV(dataArray) {
        const headerRow = ['Full Name', 'Car Selected', 'Pick Up Date', 'Return Date'];
        const csvRows = [headerRow, ...dataArray];
        return csvRows.map(row => row.join(',')).join('\n');
    },
};

document.addEventListener('DOMContentLoaded', APP.init);