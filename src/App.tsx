import MachineTypesComponent from './features/manage-machine/machineTypesComponent';

function App() {
  return (
    <section className="min-h-screen">
      <section className="flex flex-col h-full">
        <div className="px-8 pt-8">
          <div>
            <h3 className="font-bold text-lg">Objector</h3>
          </div>
        </div>
        <div className="flex-auto">
          <>
            <div>
              <MachineTypesComponent />
            </div>
          </>
        </div>
      </section>
    </section>
  );
}

export default App;
