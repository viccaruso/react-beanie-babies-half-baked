import React from 'react';

export default function Filter({ filterQuery, setFilterQuery }) {
  return (
    <div className='filter'>
      <input type="text" value={filterQuery} onChange={(e) => setFilterQuery(e.target.value)} />
    </div>
  );
}
