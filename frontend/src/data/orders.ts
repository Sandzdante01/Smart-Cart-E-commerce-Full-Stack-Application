import type { Order } from '../types';
import { productImages } from './products';

export const orders: Order[] = [
{
  id: 'SC-2026-1024',
  customerId: 'u-1',
  customerName: 'Kasun Perera',
  date: '17 August 2026',
  items: [
  {
    productId: 'p-001',
    name: 'Apple MacBook Air M3',
    brand: 'Apple',
    image: productImages.macbook,
    price: 329990,
    quantity: 1
  },
  {
    productId: 'p-003',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    image: productImages.headphones,
    price: 89990,
    quantity: 1
  }],

  subtotal: 419980,
  discount: 30000,
  shipping: 0,
  total: 389980,
  payment: 'Cash on Delivery',
  status: 'Processing',
  address: 'No. 45, Galle Road, Colombo 03, Western Province, Sri Lanka',
  estimatedDelivery: '20–23 August 2026'
},
{
  id: 'SC-2026-0987',
  customerId: 'u-1',
  customerName: 'Kasun Perera',
  date: '10 August 2026',
  items: [
  {
    productId: 'p-003',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    image: productImages.headphones,
    price: 89990,
    quantity: 1
  }],

  subtotal: 89990,
  discount: 0,
  shipping: 0,
  total: 89990,
  payment: 'Credit / Debit Card',
  status: 'Delivered',
  address: 'No. 45, Galle Road, Colombo 03, Western Province, Sri Lanka',
  estimatedDelivery: '13 August 2026'
},
{
  id: 'SC-2026-0941',
  customerId: 'u-1',
  customerName: 'Kasun Perera',
  date: '3 August 2026',
  items: [
  {
    productId: 'p-006',
    name: 'Logitech MX Master 3S',
    brand: 'Logitech',
    image: productImages.mouse,
    price: 34990,
    quantity: 1
  }],

  subtotal: 34990,
  discount: 0,
  shipping: 0,
  total: 34990,
  payment: 'Bank Transfer',
  status: 'Delivered',
  address: 'No. 45, Galle Road, Colombo 03, Western Province, Sri Lanka',
  estimatedDelivery: '6 August 2026'
},
{
  id: 'SC-2026-1023',
  customerId: 'u-2',
  customerName: 'Nethmi Fernando',
  date: '17 August 2026',
  items: [
  {
    productId: 'p-004',
    name: 'Apple Watch Series 10',
    brand: 'Apple',
    image: productImages.watch,
    price: 124990,
    quantity: 1
  }],

  subtotal: 124990,
  discount: 0,
  shipping: 0,
  total: 124990,
  payment: 'Credit / Debit Card',
  status: 'Shipped',
  address: 'No. 22, Peradeniya Road, Kandy, Central Province, Sri Lanka',
  estimatedDelivery: '21 August 2026'
},
{
  id: 'SC-2026-1022',
  customerId: 'u-4',
  customerName: 'Ravindu Silva',
  date: '16 August 2026',
  items: [
  {
    productId: 'p-003',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    image: productImages.headphones,
    price: 89990,
    quantity: 1
  }],

  subtotal: 89990,
  discount: 0,
  shipping: 0,
  total: 89990,
  payment: 'Cash on Delivery',
  status: 'Delivered',
  address: 'No. 12, Lighthouse Street, Galle, Southern Province, Sri Lanka',
  estimatedDelivery: '19 August 2026'
},
{
  id: 'SC-2026-1021',
  customerId: 'u-5',
  customerName: 'Amaya Perera',
  date: '15 August 2026',
  items: [
  {
    productId: 'p-005',
    name: 'ASUS ROG Strix G16',
    brand: 'ASUS',
    image: productImages.gaming,
    price: 469990,
    quantity: 1
  }],

  subtotal: 469990,
  discount: 0,
  shipping: 0,
  total: 469990,
  payment: 'Bank Transfer',
  status: 'Processing',
  address: 'No. 8, Beach Road, Negombo, Western Province, Sri Lanka',
  estimatedDelivery: '20 August 2026'
},
{
  id: 'SC-2026-1020',
  customerId: 'u-6',
  customerName: 'Dilan Jayasinghe',
  date: '14 August 2026',
  items: [
  {
    productId: 'p-006',
    name: 'Logitech MX Master 3S',
    brand: 'Logitech',
    image: productImages.mouse,
    price: 34990,
    quantity: 1
  }],

  subtotal: 34990,
  discount: 0,
  shipping: 0,
  total: 34990,
  payment: 'Credit / Debit Card',
  status: 'Pending',
  address: 'No. 3, Beach Park, Matara, Southern Province, Sri Lanka',
  estimatedDelivery: '19 August 2026'
}];


export const salesSeries = {
  '12 Months': [
  { label: 'Sep', value: 1980000 },
  { label: 'Oct', value: 2140000 },
  { label: 'Nov', value: 2620000 },
  { label: 'Dec', value: 3080000 },
  { label: 'Jan', value: 2450000 },
  { label: 'Feb', value: 2780000 },
  { label: 'Mar', value: 3120000 },
  { label: 'Apr', value: 3450000 },
  { label: 'May', value: 3780000 },
  { label: 'Jun', value: 4100000 },
  { label: 'Jul', value: 4560000 },
  { label: 'Aug', value: 4892450 }],

  '3 Months': [
  { label: 'Jun', value: 4100000 },
  { label: 'Jul', value: 4560000 },
  { label: 'Aug', value: 4892450 }],

  '30 Days': [
  { label: 'W1', value: 1020000 },
  { label: 'W2', value: 1180000 },
  { label: 'W3', value: 1310000 },
  { label: 'W4', value: 1382450 }],

  '7 Days': [
  { label: 'Mon', value: 168000 },
  { label: 'Tue', value: 194000 },
  { label: 'Wed', value: 176000 },
  { label: 'Thu', value: 221000 },
  { label: 'Fri', value: 264000 },
  { label: 'Sat', value: 298000 },
  { label: 'Sun', value: 212000 }]

} as const;

export type SalesPeriod = keyof typeof salesSeries;