import ElevatorPanel from './components/elevator-panel';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Elevator System</h1>
        <ElevatorPanel />
      </div>
    </div>
  );
};

export default App;
