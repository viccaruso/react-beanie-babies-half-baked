import { useEffect, useState } from 'react';
import './App.css';
import { getBeanieBabies } from './services/fetch-utils';
import BeaniesList from './BeaniesList';
import Filter from './Filter';

function App() {
  const [beanieBabies, setBeanieBabies] = useState([]);
  const [page, setPage] = useState(1);
  const [filterQuery, setFilterQuery] = useState('');
  const [filteredBeanies, setFilteredBeanies] = useState([]);
  const perPage = 40;

  useEffect(() => {
    async function fetch() {
      const from = page * perPage - perPage;
      const to = page * perPage;
      const beanies = await getBeanieBabies(from, to);
      setBeanieBabies(beanies);
    }
    fetch();

  }, [page]); // what can you do with this array to trigger a fetch every time the page changes?

  useEffect(() => {
    const filteredBeanieBabies = beanieBabies.filter(baby => baby.title.includes(filterQuery));
    filterQuery.length && setFilteredBeanies(filteredBeanieBabies); // Only set filtered array if filter has length
  }, [filterQuery, beanieBabies]);

  return (
    <>
      <h2>Current Page {page}</h2>
      <label className='filter-label'>Search:
        <Filter filterQuery={filterQuery} setFilterQuery={setFilterQuery} />
      </label>
      <div className='buttons'>
        {/* on click, this button should decrement the page in state  */}
        {/* also, disable this button when you are on the first page */}
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous Page</button>
        {/* on click, this button should increment the page in state  */}
        <button onClick={() => setPage(page + 1)}>Next Page</button>
      </div>
      {/* pass the beanie babies into the BeaniesList component */}
      <BeaniesList beanieBabies={filterQuery.length ? filteredBeanies : beanieBabies} />
    </>
  );
}

export default App;
