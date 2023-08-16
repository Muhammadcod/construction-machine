import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectMachineType } from '../features/template/templateSlice';

const Filter = () => {
  const machineTypes = useAppSelector(selectMachineType);
  const machineOptions = machineTypes.map(({ id, title }) => ({ id, name: title || '[New Link]', path: `type/${id}` }));

  const filters = [
    { id: 'gghsbdjhb', name: 'All', path: '/' },
    ...machineOptions,
    { id: 'ftwgyuguew', name: 'Manage types', path: 'types' },
  ];

  return (
    <div className="flex items-center">
      <h3 className="font-bold text-lg  mr-8">Objector</h3>
      <nav>
        {filters.length ? (
          <ul className="flex space-x-10 items-center">
            {filters.map((filter) => (
              <li key={filter.id}>
                <NavLink
                  to={filter.path}
                  className={({ isActive, isPending }) => (isActive ? 'active' : isPending ? 'pending' : '')}
                >
                  {filter?.name}
                </NavLink>
              </li>
            ))}
          </ul>
        ) : null}
      </nav>
    </div>
  );
};

export default Filter;
