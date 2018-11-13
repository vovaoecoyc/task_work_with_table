import DataWorker from './components/table_component';

const COUNT_ELEMS_ON_PAGE = 3;
const DATA = [
  {
    name: 'Thor Walton',
    position: 'Developer',
    office: 'New York',
    age: '61',
    start_date: '2013/08/11',
    salary: '$95,540',
  },
  {
    name: 'Quinn Flynn',
    position: 'Support Lead',
    office: 'Edinburgh',
    age: '22',
    start_date: '2013/03/03',
    salary: '$342,540',
  },
  {
    name: 'Jenifer Acosta',
    position: 'Junior Javascript Developer',
    office: 'Edinburgh',
    age: '43',
    start_date: '2013/02/01',
    salary: '$75,540',
  },
  {
    name: 'Haley Kennedy',
    position: 'Senior Marketing Designer',
    office: 'London',
    age: '43',
    start_date: '2012/12/18',
    salary: '$313,540',
  },
  {
    name: 'Brielle Williamson',
    position: 'Integration Specialist',
    office: 'New York',
    age: '61',
    start_date: '2012/12/02',
    salary: '$372,540',
  },
  {
    name: 'Michael Silva',
    position: 'Marketing Designer',
    office: 'London',
    age: '66',
    start_date: '2012/11/27',
    salary: '$198,500',
  },
  {
    name: 'Bradley Greer',
    position: 'Software Engineer',
    office: 'London',
    age: '41',
    start_date: '2012/10/13',
    salary: '$132,000',
  },
  {
    name: 'Dia Rios',
    position: 'Personnel Lead',
    office: 'Edinburgh',
    age: '35',
    start_date: '2012/09/26',
    salary: '$217,500',
  },
  {
    name: 'Herrod Chandler',
    position: 'Sales Assistant',
    office: 'San Francisco',
    age: '59',
    start_date: '2012/08/06',
    salary: '$137,500',
  },
  {
    name: 'Zorita Serrano',
    position: 'Software Engineer',
    office: 'San Francisco',
    age: '56',
    start_date: '2012/06/01',
    salary: '$115,000',
  },
];

window.onload = function() {
  let worker = new DataWorker(DATA, COUNT_ELEMS_ON_PAGE, document);
  worker.init();
};
