export default {
  type: "object",
  properties:  {
    count: { type: 'number' },
    description: { type: 'string' },
    id: { type: 'string' },
    price: { type: 'number' },
    title: { type: 'string' }
  }
} as const;
