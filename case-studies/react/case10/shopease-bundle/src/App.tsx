import { useEffect } from 'react'
import _ from 'lodash'
import moment from 'moment'
import Chart from 'chart.js/auto'

function App() {
  useEffect(() => {
    const fn = _.debounce(() => {
      console.log('Debounced')
    }, 300)

    fn()

    console.log(moment().format())

    new Chart(document.createElement('canvas'), {
      type: 'bar',
      data: {
        labels: ['A', 'B'],
        datasets: [
          {
            label: 'Demo',
            data: [10, 20],
          },
        ],
      },
    })
  }, [])

  return <h1>🛒 ShopEase E-Commerce</h1>
}

export default App
