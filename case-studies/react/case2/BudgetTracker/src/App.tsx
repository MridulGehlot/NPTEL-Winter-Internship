import BudgetTracker from './component/BudgetTracker';

function App() {
  const conversionRates = {
    USD: 1.0,
    EUR: 0.92,
    INR: 83.5
  } as const;

  return <BudgetTracker conversionRates={conversionRates}  />;
}

export default App;
