import { useMemo } from 'react'

interface DataItem {
  id: number
  value: number
}

function computeAnalytics(data: DataItem[]) {
  console.log('Running heavy computation...')
  return data.reduce((acc, item) => acc + item.value, 0)
}

export function AnalyticsChart({ data }: { data: DataItem[] }) {
  const analytics = useMemo(() => {
    return computeAnalytics(data)
  }, [data])

  console.log('Rendering AnalyticsChart')

  return <div>Analytics Value: {analytics}</div>
}
