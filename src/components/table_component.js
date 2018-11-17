'use strict';
class DataWorker {
  constructor(data = [], rowsOnPage = 5, document) {
    this.data = data;
    this.pageData = [];
    this.rowsOnPage = rowsOnPage;
    this.document = document;
    this.columnsHead = this.document.querySelectorAll('table thead tr th');
    this.tableBody = this.document.querySelector('table.table tbody');
    this.button = this.document.querySelector('input[name=filter]');
  }

  fillingTable(data = this.pageData, event = 'filter') {
    for (let i = 0; i < data.length; ++i) {
      let tr = this.document.createElement('tr');
      this.tableBody.appendChild(this.fillingRow(data[i], tr));
    }
    if (event === 'filter') {
      this.button.click();
    }
  }

  fillingRow(dataRow, row) {
    for (let j in dataRow) {
      let td = this.document.createElement('td');
      td.innerHTML = dataRow[j].search(/\d+,\d+/gi) !== -1 ? `&#36;${dataRow[j]}` : dataRow[j];
      row.appendChild(td);
    }
    return row;
  }

  init() {
    this.initPagination();
    this.sortTable();
    this.filterTable();
    this.fillingTable();
    this.button.onclick = this.eventHandlerFilterClick.bind(this);
  }
  eventHandlerFilterClick() {
    if (window.event.x !== 0 && window.event.y !== 0) {
      this.document.querySelector('table').dataset.isfilter = 'filter';
      //this.document.querySelector('div.pagination input.active').click();
    }
  }
  eventHandlerSort(i, column) {
    let isfilter = this.document.querySelector('table').dataset.isfilter;
    let filter = isfilter === 'filter' ? true : false;
    if (filter) {
      this.pageData = this.data;
    }
    let sort = column.dataset.sort;
    for (let j = 0; j < this.pageData.length; ++j) {
      for (let k = j + 1; k < this.pageData.length; ++k) {
        let temp = this.pageData[j],
          leftArg = this.pageData[j][i],
          rightArg = this.pageData[k][i],
          reg = /\d+,\d+/gi;
        if (leftArg.search(reg) !== -1 && rightArg.search(reg) !== -1) {
          leftArg = Math.floor(+leftArg.replace(/,/gi, '.') * 1000);
          rightArg = Math.floor(+rightArg.replace(/,/gi, '.') * 1000);
        }
        if (sort === '' || sort === 'desc') {
          if (leftArg > rightArg) {
            this.pageData[j] = this.pageData[k];
            this.pageData[k] = temp;
          }
        } else if (sort === 'asc') {
          if (leftArg < rightArg) {
            this.pageData[j] = this.pageData[k];
            this.pageData[k] = temp;
          }
        }
      }
    }
    column.dataset.sort = sort === '' ? 'asc' : sort === 'asc' ? 'desc' : 'asc';
    let value = this.document.querySelector('input[name=request_string]').value;
    if ((value === '' || value === undefined) && filter) {
      this.document.querySelector('table').dataset.isfilter = '';
      this.document.querySelector('div.pagination input.active').click();
      return;
    }
    this.tableBody.innerHTML = '';
    this.fillingTable();
  }

  eventHandlerFilter() {
    let input = this.document.querySelector('input[name=request_string]');
    if (input.value !== '') {
      let filterRows = [];
      for (let i = 0; i < this.data.length; ++i) {
        //for (let j = 0; j < this.data[i].length; ++j) {
        for (let j in this.data[i]) {
          let b = this.data[i][j];
          if (b.toLowerCase().indexOf(input.value.toLowerCase()) !== -1) {
            filterRows.push(this.data[i]);
          }
        }
      }
      if (filterRows.length !== 0) {
        this.tableBody.innerHTML = '';
        this.fillingTable(filterRows);
      }
    } else {
      this.tableBody.innerHTML = '';
      this.fillingTable(this.pageData);
    }
  }
  dataForActivePage(data) {
    let result = [];
    let pagesActive = this.document.querySelector('.pagination input.active');
    let index = +pagesActive.name * this.rowsOnPage;
    for (let i = index; i < this.rowsOnPage; ++i) {
      result.push(data[i]);
    }
    return result;
  }
  eventHandlerPagination(i) {
    this.document.querySelector('table').dataset.isfilter = '';
    this.document.querySelector('input[name=request_string]').value = '';
    let pages = this.document.querySelectorAll('.pagination input');
    for (let k = 0; k < pages.length; ++k) {
      if (pages[k].classList.contains('active')) {
        pages[k].classList.remove('active');
      }
      if (k === i) {
        pages[k].classList.add('active');
      }
    }
    this.pageData = this.dataForActivePage(this.data);

    let pageNumber = i + 1;
    let rows = [];
    let e = i * this.rowsOnPage;
    for (let j = e; j < +(pageNumber * this.rowsOnPage); ++j) {
      rows.push(this.data[j]);
    }
    rows = rows.filter(function(elem) {
      return elem !== undefined;
    });
    this.pageData = rows;
    this.tableBody.innerHTML = '';
    this.fillingTable(rows, '');
  }

  sortTable() {
    for (let i = 0; i < this.columnsHead.length; ++i) {
      this.columnsHead[i].addEventListener(
        'click',
        this.eventHandlerSort.bind(this, i, this.columnsHead[i]),
      );
    }
  }

  filterTable() {
    this.button.addEventListener('click', this.eventHandlerFilter.bind(this));
  }
  initPagination() {
    let countPages = Math.ceil(this.data.length / this.rowsOnPage);
    for (let i = 0; i < countPages; ++i) {
      let buttonPage = this.document.createElement('input');
      buttonPage.type = 'button';
      buttonPage.name = i;
      buttonPage.value = i + 1;
      if (i === 0) {
        buttonPage.classList.add('active');
      }
      this.document.querySelector('div.pagination').appendChild(buttonPage);
    }
    this.pageData = this.dataForActivePage(this.data);
    this.tablePagination();
  }

  tablePagination() {
    let paginationButtons = this.document.querySelectorAll('.pagination input');
    for (let i = 0; i < paginationButtons.length; ++i) {
      paginationButtons[i].addEventListener(
        'click',
        this.eventHandlerPagination.bind(this, i),
      );
    }
  }
}

export default DataWorker;
