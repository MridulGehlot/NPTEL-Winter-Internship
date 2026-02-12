import { renderHook, act } from '@testing-library/react';
import { useApproval } from '../hooks/useApproval';

test('approves correctly', () => {
  const { result } = renderHook(() => useApproval());
  
  expect(result.current.approved).toBe(false);
  
  act(() => {
    result.current.approve();
  });
  
  expect(result.current.approved).toBe(true);
});
