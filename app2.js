const APP = {
    data: [],   // Global property data
    init() {
        APP.addListeners();
    },
    addListeners() {
        const form = document.querySelector('#collectReservation');
        form.addEventListener('submit', APP.saveData);

        document
            .querySelector('.reservationExportButton')
            .addEventListener('click', APP.exportData);

        document
            .querySelector('.reservationList')
            .addEventListener('dblclick', APP.editCell);
    },
    saveData(ev) {
        ev.preventDefault();          // We are preventing to reload each time
        const form = ev.target;         // ev is submit event and ev target is form
        const formdata = new FormData(form);    // name attributes in html file ; is passed into form data Object
        //save the data in APP.data
        APP.cacheData(formdata);
        //build a row in the table
        APP.buildRow(formdata);
        //clear the form
        form.reset();
        //focus on first name
        document.getElementById('fullName').focus();
    },
    cacheData(formdata) {
        //extract the data from the FormData object and update APP.data
        APP.data.push(Array.from(formdata.values()));
        // console.table(APP.data);
    },
    buildRow(formdata) {     //Form data Object
        const tbody = document.querySelector('.container > table > .reservationList');
        const tr = document.createElement('tr');
        const cancelButton  = document.createElement('button');
        const div = document.createElement('div');
        div.classList.add('div-block-reservation');
        tr.innerHTML = '';
        tr.setAttribute('data-row', document.querySelectorAll('tbody tr').length);
        let col = 0;
        // loop through the FormData object entries and build a row with
        for (let entry of formdata.entries()) {         // Key and value
            tr.innerHTML += `<td data-col="${col}" data-name="${entry[0]}">${entry[1]}</td>`;   // Storing K n V
            col++;
        }
        cancelButton.innerHTML = "Cancel";
        cancelButton.classList.add('cancelButton');

        cancelButton.addEventListener('click', function () {
            this.parentElement.classList.add("is-hidden")
        });

        div.append(cancelButton);
        div.append(tr);
        tbody.append(div);
        // data references for later editing
    },
    exportData() {
        //insert the header row
        APP.data.unshift(['Full Name', 'Car Selected', 'Pickup Date', 'Return Date']);  // adding header first row
        //convert array to a string with \n at the end
        let str = '';
        APP.data.forEach((row) => {
            str += row
                .map((col) => JSON.stringify(col))
                .join(',')
                .concat('\n');
        });

        //create the file
        let filename = `reservation_report.${Date.now()}.csv`;
        let file = new File([str], filename, { type: 'text/csv' });

        //create an anchor tag with "download" attribute
        let a = document.createElement('a');
        a.href = URL.createObjectURL(file);
        a.download = filename;
        a.click();
        //and click the anchor
    },
    editCell(ev) {
        let cell = ev.target.closest('td');
        if (cell) {
            let row = +cell.parentElement.getAttribute('data-row');
            let col = +cell.getAttribute('data-col');
            //a td was clicked so make it editable
            cell.contentEditable = true;
            cell.focus();
            let txt = cell.textContent;
            cell.addEventListener('keydown', function save(ev) {
                if (ev.key === 'Enter' || ev.code === 'Enter') {
                    cell.contentEditable = false;
                    cell.removeEventListener('keydown', save);
                    APP.data[row][col] = cell.textContent;
                    console.table(APP.data);
                }
            });
            //listen for the enter key to end the editing
            //update the APP.data
        }
    },
};

document.addEventListener('DOMContentLoaded', APP.init);




