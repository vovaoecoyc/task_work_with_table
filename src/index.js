import DataWorker from './components/table_component';

const COUNT_ELEMS_ON_PAGE = 4;
const DATA = [
  {
    0: 'Thor Walton',
    1: 'Developer',
    2: 'New York',
    3: '61',
    4: '2013/08/11',
    5: '95,540',
  },
  {
    0: 'Quinn Flynn',
    1: 'Support Lead',
    2: 'Edinburgh',
    3: '22',
    4: '2013/03/03',
    5: '342,540',
  },
  {
    0: 'Jenifer Acosta',
    1: 'Junior Javascript Developer',
    2: 'Edinburgh',
    3: '43',
    4: '2013/02/01',
    5: '75,540',
  },
  {
    0: 'Haley Kennedy',
    1: 'Senior Marketing Designer',
    2: 'London',
    3: '43',
    4: '2012/12/18',
    5: '313,540',
  },
  {
    0: 'Brielle Williamson',
    1: 'Integration Specialist',
    2: 'New York',
    3: '61',
    4: '2012/12/02',
    5: '372,540',
  },
  {
    0: 'Michael Silva',
    1: 'Marketing Designer',
    2: 'London',
    3: '66',
    4: '2012/11/27',
    5: '198,500',
  },
  {
    0: 'Bradley Greer',
    1: 'Software Engineer',
    2: 'London',
    3: '41',
    4: '2012/10/13',
    5: '132,000',
  },
  {
    0: 'Dia Rios',
    1: 'Personnel Lead',
    2: 'Edinburgh',
    3: '35',
    4: '2012/09/26',
    5: '217,500',
  },
  {
    0: 'Herrod Chandler',
    1: 'Sales Assistant',
    2: 'San Francisco',
    3: '59',
    4: '2012/08/06',
    5: '137,500',
  },
  {
    0: 'Zorita Serrano',
    1: 'Software Engineer',
    2: 'San Francisco',
    3: '56',
    4: '2012/06/01',
    5: '115,000',
  },
];

window.onload = function() {
  let worker = new DataWorker(DATA, COUNT_ELEMS_ON_PAGE, document);
  worker.init();
};
