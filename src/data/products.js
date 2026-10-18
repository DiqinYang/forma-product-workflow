export const groups = {
  Home: ['Kitchen', 'Storage', 'Textiles'],
  Wellness: ['Body Care', 'Personal Care'],
  Pantry: ['Beverages', 'Breakfast'],
}
export const statuses = ['All', 'Draft', 'In review', 'Changes requested', 'Approved']
const seed = [
  ['Botanical hand wash', 'Wellness', 'Body Care', 14.5, 'In review'],
  ['Stoneware breakfast bowl', 'Home', 'Kitchen', 22, 'Approved'],
  ['Roasted morning coffee', 'Pantry', 'Beverages', 18, 'Draft'],
  ['Linen storage basket', 'Home', 'Storage', 32, 'In review'],
  ['Daily body lotion', 'Wellness', 'Body Care', 24, 'Changes requested'],
  ['Woven cotton throw', 'Home', 'Textiles', 46, 'Approved'],
  ['Herbal tea selection', 'Pantry', 'Beverages', 16, 'In review'],
  ['Gentle face cleanser', 'Wellness', 'Personal Care', 21, 'Draft'],
  ['Bamboo pantry organizer', 'Home', 'Storage', 28, 'Approved'],
  ['Oat breakfast mix', 'Pantry', 'Breakfast', 12.5, 'Draft'],
  ['Mineral daily sunscreen', 'Wellness', 'Personal Care', 26, 'Approved'],
  ['Ceramic serving plate', 'Home', 'Kitchen', 34, 'Changes requested'],
  ['Linen table runner', 'Home', 'Textiles', 38, 'Draft'],
  ['Citrus sparkling water', 'Pantry', 'Beverages', 9, 'Approved'],
  ['Coconut breakfast granola', 'Pantry', 'Breakfast', 15, 'Approved'],
  ['Botanical shower gel', 'Wellness', 'Body Care', 19, 'Draft'],
]
export function initial() {
  return seed.map((p, i) => ({
    id: i + 1,
    name: p[0],
    department: p[1],
    category: p[2],
    price: p[3],
    status: p[4],
    sku: 'DEMO-' + String(i + 1).padStart(3, '0'),
    updated: '18 Oct 2026',
    description: `A fictional ${p[2].toLowerCase()} product created to demonstrate catalogue management, structured product information and review interactions.`,
  }))
}
