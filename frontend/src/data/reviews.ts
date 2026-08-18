import type { AppNotification, Review } from '../types';

export const reviews: Review[] = [
{
  id: 'r-1',
  productId: 'p-001',
  productName: 'Apple MacBook Air M3',
  customerName: 'Kasun Perera',
  customerInitials: 'KP',
  rating: 5,
  title: 'Perfect for university work',
  body: 'Excellent shopping experience. The laptop arrived quickly and was perfectly packaged. Battery easily lasts a full day of lectures and Xcode builds.',
  date: '14 August 2026',
  status: 'Published',
  verified: true
},
{
  id: 'r-2',
  productId: 'p-001',
  productName: 'Apple MacBook Air M3',
  customerName: 'Nethmi Fernando',
  customerInitials: 'NF',
  rating: 5,
  title: 'Genuine product, great price',
  body: 'SmartCart has a great selection of genuine products and very competitive prices. Warranty registration worked without any issues.',
  date: '9 August 2026',
  status: 'Published',
  verified: true
},
{
  id: 'r-3',
  productId: 'p-001',
  productName: 'Apple MacBook Air M3',
  customerName: 'Ravindu Silva',
  customerInitials: 'RS',
  rating: 4,
  title: 'Smooth checkout',
  body: 'Very easy to find products and the checkout process was smooth. Would have liked a same-day delivery option for Galle.',
  date: '5 August 2026',
  status: 'Published',
  verified: true
},
{
  id: 'r-4',
  productId: 'p-003',
  productName: 'Sony WH-1000XM5',
  customerName: 'Amaya Perera',
  customerInitials: 'AP',
  rating: 5,
  title: 'Noise cancelling is unreal',
  body: 'Used these on the Colombo–Dubai flight and barely heard the engines. Comfortable even after six hours.',
  date: '2 August 2026',
  status: 'Published',
  verified: true
},
{
  id: 'r-5',
  productId: 'p-005',
  productName: 'ASUS ROG Strix G16',
  customerName: 'Dilan Jayasinghe',
  customerInitials: 'DJ',
  rating: 5,
  title: 'Runs everything maxed out',
  body: 'Frame rates are excellent and the cooling keeps it quiet enough for late night sessions.',
  date: '30 July 2026',
  status: 'Pending',
  verified: false
},
{
  id: 'r-6',
  productId: 'p-002',
  productName: 'Samsung Galaxy S25',
  customerName: 'Nethmi Fernando',
  customerInitials: 'NF',
  rating: 4,
  title: 'Great camera, average battery',
  body: 'Photos in low light are impressive. Battery gets me through a normal day but not much more.',
  date: '27 July 2026',
  status: 'Published',
  verified: true
}];


export const testimonials = [
{
  id: 't-1',
  name: 'Kasun Perera',
  role: 'Software Engineering Student, Colombo',
  initials: 'KP',
  rating: 5,
  quote:
  'Excellent shopping experience. The laptop arrived quickly and was perfectly packaged.'
},
{
  id: 't-2',
  name: 'Nethmi Fernando',
  role: 'Product Designer, Kandy',
  initials: 'NF',
  rating: 5,
  quote:
  'SmartCart has a great selection of genuine products and very competitive prices.'
},
{
  id: 't-3',
  name: 'Ravindu Silva',
  role: 'Content Creator, Galle',
  initials: 'RS',
  rating: 4,
  quote: 'Very easy to find products and the checkout process was smooth.'
}];


export const initialNotifications: AppNotification[] = [
{
  id: 'n-1',
  type: 'order',
  message: 'New order #SC-2026-1024 received.',
  time: '4 minutes ago',
  read: false
},
{
  id: 'n-2',
  type: 'stock',
  message: 'Apple Watch Series 10 is running low on stock.',
  time: '1 hour ago',
  read: false
},
{
  id: 'n-3',
  type: 'delivery',
  message: 'Order #SC-2026-0987 has been delivered.',
  time: 'Yesterday',
  read: true
},
{
  id: 'n-4',
  type: 'customer',
  message: 'New customer registration: Nethmi Fernando.',
  time: '2 days ago',
  read: true
}];