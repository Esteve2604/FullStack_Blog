const reverse = require('../utils/for_testing').reverse

xtest('reverse of a', () => {
  const result = reverse('a')

  expect(result).toBe('a')
})

xtest('reverse of react', () => {
  const result = reverse('react')

  expect(result).toBe('tcaer')
})

xtest('reverse of releveler', () => {
  const result = reverse('releveler')

  expect(result).toBe('releveler')
})