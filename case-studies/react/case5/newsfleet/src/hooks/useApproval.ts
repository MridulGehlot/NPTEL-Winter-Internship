import { useState } from 'react';

export function useApproval() {
  const [approved, setApproved] = useState(false);
  const approve = () => setApproved(true);
  return { approved, approve };
}
