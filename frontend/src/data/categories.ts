import type { Category } from '../types';
import { productImages } from './products';

export const categories: Category[] = [
{
  id: 'c-1',
  name: 'Laptops',
  slug: 'laptops',
  productCount: 24,
  image: productImages.macbook,
  description: 'Ultrabooks and workstations for study, work and creation.'
},
{
  id: 'c-2',
  name: 'Smartphones',
  slug: 'smartphones',
  productCount: 31,
  image: productImages.galaxy,
  description: 'Flagship and mid-range phones from trusted global brands.'
},
{
  id: 'c-3',
  name: 'Headphones',
  slug: 'headphones',
  productCount: 18,
  image: productImages.headphones,
  description: 'Noise cancelling over-ear and true wireless audio.'
},
{
  id: 'c-4',
  name: 'Gaming',
  slug: 'gaming',
  productCount: 16,
  image: productImages.gaming,
  description: 'High refresh laptops, consoles and competitive peripherals.'
},
{
  id: 'c-5',
  name: 'Smartwatches',
  slug: 'smartwatches',
  productCount: 12,
  image: productImages.watch,
  description: 'Health, fitness and notifications on your wrist.'
},
{
  id: 'c-6',
  name: 'Accessories',
  slug: 'accessories',
  productCount: 23,
  image: productImages.accessories,
  description: 'Keyboards, storage, power and everyday essentials.'
}];