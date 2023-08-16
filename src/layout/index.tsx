import React from 'react';
import Filter from '../components/filter';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <section className="min-h-screen">
      <section className="flex flex-col h-full">
        <div className="px-8 pt-8">
          <Filter />
        </div>
        <div className="flex-auto">
          <>
            <div>
              <Outlet />
            </div>
          </>
        </div>
      </section>
    </section>
  );
};

export default Layout;
