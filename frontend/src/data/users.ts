import type { CustomerRecord, User } from '../types';

export const demoUsers: User[] = [
{
  id: 'u-1',
  firstName: 'Kasun',
  lastName: 'Perera',
  email: 'kasun@example.com',
  phone: '+94 77 123 4567',
  role: 'customer',
  location: 'Colombo, Sri Lanka',
  avatarInitials: 'KP',
  joined: '12 January 2025',
  addresses: [
  {
    id: 'a-1',
    label: 'Home',
    line1: 'No. 45, Galle Road',
    city: 'Colombo 03',
    province: 'Western Province',
    postalCode: '00300',
    country: 'Sri Lanka',
    isDefault: true
  },
  {
    id: 'a-2',
    label: 'Office',
    line1: 'Level 8, Union Place',
    city: 'Colombo 02',
    province: 'Western Province',
    postalCode: '00200',
    country: 'Sri Lanka',
    isDefault: false
  }]

},
{
  id: 'u-2',
  firstName: 'Nethmi',
  lastName: 'Fernando',
  email: 'nethmi@example.com',
  phone: '+94 71 987 6543',
  role: 'customer',
  location: 'Kandy, Sri Lanka',
  avatarInitials: 'NF',
  joined: '3 March 2025',
  addresses: [
  {
    id: 'a-3',
    label: 'Home',
    line1: 'No. 22, Peradeniya Road',
    city: 'Kandy',
    province: 'Central Province',
    postalCode: '20000',
    country: 'Sri Lanka',
    isDefault: true
  }]

},
{
  id: 'u-3',
  firstName: 'Isuru',
  lastName: 'Senarath',
  email: 'admin@smartcart.lk',
  phone: '+94 11 234 5678',
  role: 'admin',
  location: 'Colombo, Sri Lanka',
  avatarInitials: 'IS',
  joined: '1 June 2024',
  addresses: []
}];


export const demoCredentials = [
{ email: 'kasun@example.com', password: 'smartcart', label: 'Customer — Kasun Perera' },
{ email: 'admin@smartcart.lk', password: 'smartcart', label: 'Administrator — Isuru Senarath' }];


export const customerRecords: CustomerRecord[] = [
{
  id: 'u-1',
  name: 'Kasun Perera',
  email: 'kasun@example.com',
  orders: 12,
  totalSpent: 1284900,
  joined: '12 Jan 2025',
  status: 'Active',
  location: 'Colombo'
},
{
  id: 'u-2',
  name: 'Nethmi Fernando',
  email: 'nethmi@example.com',
  orders: 8,
  totalSpent: 764500,
  joined: '3 Mar 2025',
  status: 'Active',
  location: 'Kandy'
},
{
  id: 'u-4',
  name: 'Ravindu Silva',
  email: 'ravindu@example.com',
  orders: 5,
  totalSpent: 412300,
  joined: '19 Apr 2025',
  status: 'Active',
  location: 'Galle'
},
{
  id: 'u-5',
  name: 'Amaya Perera',
  email: 'amaya@example.com',
  orders: 3,
  totalSpent: 589970,
  joined: '2 Jun 2025',
  status: 'Active',
  location: 'Negombo'
},
{
  id: 'u-6',
  name: 'Dilan Jayasinghe',
  email: 'dilan@example.com',
  orders: 1,
  totalSpent: 34990,
  joined: '28 Jul 2026',
  status: 'Inactive',
  location: 'Matara'
}];