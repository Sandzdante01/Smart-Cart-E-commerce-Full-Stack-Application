import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon, ImagePlusIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Button } from '../../components/ui/Button';
import { useStore } from '../../contexts/StoreContext';
import { productImages } from '../../data/products';

const statusOptions = [
{ label: 'Active', value: 'Active' },
{ label: 'Draft', value: 'Draft' },
{ label: 'Out of Stock', value: 'Out of Stock' }];


const galleryChoices = [
productImages.macbook,
productImages.galaxy,
productImages.headphones,
productImages.watch,
productImages.gaming,
productImages.mouse,
productImages.earbuds,
productImages.xps,
productImages.accessories];


export function AdminProductForm() {
  const { productId } = useParams<{productId: string;}>();
  const { products, categories, createProduct, updateProduct } = useStore();
  const navigate = useNavigate();
  const editing = products.find((p) => p.id === productId);

  const [values, setValues] = useState({
    name: editing?.name ?? '',
    brand: editing?.brand ?? '',
    category: editing?.category ?? 'Laptops',
    description: editing?.description ?? '',
    price: editing ? String(editing.price) : '',
    originalPrice: editing ? String(editing.originalPrice) : '',
    stock: editing ? String(editing.stock) : '',
    sku: editing?.sku ?? '',
    status: editing?.status ?? 'Active'
  });
  const [specs, setSpecs] = useState(
    editing?.specs ?? [
    { label: 'Processor', value: '' },
    { label: 'RAM', value: '' },
    { label: 'Storage', value: '' }]

  );
  const [images, setImages] = useState<string[]>(editing?.images.slice(0, 4) ?? []);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const set = (key: keyof typeof values) => (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
  setValues((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = 'Product name is required.';
    if (!values.brand.trim()) next.brand = 'Brand is required.';
    if (!values.price || Number(values.price) <= 0) next.price = 'Enter a price in LKR.';
    if (values.stock === '' || Number(values.stock) < 0) next.stock = 'Enter available stock.';
    if (!values.sku.trim()) next.sku = 'SKU is required.';
    if (values.description.trim().length < 20) next.description = 'Add at least 20 characters.';
    if (images.length === 0) next.images = 'Select at least one product image.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSaving(true);
    try {
      const payload = {
        name: values.name,
        brand: values.brand,
        category: values.category,
        description: values.description,
        price: Number(values.price),
        originalPrice: Number(values.originalPrice || values.price),
        stock: Number(values.stock),
        sku: values.sku,
        status: values.status,
        images
      };

      if (editing) {
        await updateProduct(editing.id, payload);
        toast.success('Product updated', { description: values.name });
      } else {
        await createProduct(payload);
        toast.success('Product created', { description: values.name });
      }
      navigate('/admin/products');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save product.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <Link
        to="/admin/products"
        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary-600 hover:text-primary-700">
        
        <ArrowLeftIcon className="h-3.5 w-3.5" />
        Back to products
      </Link>

      <div>
        <h1 className="text-[28px] font-bold text-ink">
          {editing ? 'Edit Product' : 'Add Product'}
        </h1>
        <p className="mt-1.5 text-[15px] text-ink-soft">
          {editing ?
          `Editing ${editing.name} — changes apply to the storefront immediately.` :
          'Create a new catalogue entry. All prices are in Sri Lankan Rupees.'}
        </p>
      </div>

      <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]" noValidate>
        <div className="space-y-5">
          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-bold text-ink">Basic details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Input
                  label="Product Name"
                  value={values.name}
                  error={errors.name}
                  placeholder="Apple MacBook Air M3"
                  onChange={set('name')} />
                
              </div>
              <Input
                label="Brand"
                value={values.brand}
                error={errors.brand}
                placeholder="Apple"
                onChange={set('brand')} />
              
              <Select
                label="Category"
                value={values.category}
                onChange={set('category')}
                options={categories.map((c) => ({ label: c.name, value: c.name }))} />
              
              <div className="sm:col-span-2">
                <label
                  htmlFor="product-description"
                  className="mb-1.5 block text-[13px] font-semibold text-ink-soft">
                  
                  Description
                </label>
                <textarea
                  id="product-description"
                  rows={4}
                  value={values.description}
                  onChange={(e) => setValues({ ...values, description: e.target.value })}
                  placeholder="What makes this product worth buying?"
                  className={`w-full rounded-xl border bg-white p-3.5 text-sm text-ink placeholder:text-ink-muted/80 focus:outline-none focus:ring-4 ${
                  errors.description ?
                  'border-danger-500 focus:border-danger-500 focus:ring-danger-100' :
                  'border-line focus:border-primary-500 focus:ring-primary-100'}`
                  } />
                
                {errors.description &&
                <p className="mt-1.5 text-[12px] font-medium text-danger-600">
                    {errors.description}
                  </p>
                }
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-lg font-bold text-ink">Pricing & inventory</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input
                label="Price (Rs.)"
                type="number"
                value={values.price}
                error={errors.price}
                placeholder="329990"
                onChange={set('price')} />
              
              <Input
                label="Original Price (Rs.)"
                type="number"
                value={values.originalPrice}
                placeholder="349990"
                onChange={set('originalPrice')} />
              
              <Input
                label="Stock"
                type="number"
                value={values.stock}
                error={errors.stock}
                placeholder="12"
                onChange={set('stock')} />
              
              <Input
                label="SKU"
                value={values.sku}
                error={errors.sku}
                placeholder="SC-LAP-0001"
                onChange={set('sku')} />
              
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-ink">Specifications</h2>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setSpecs((prev) => [...prev, { label: '', value: '' }])}>
                
                Add row
              </Button>
            </div>
            <div className="mt-4 space-y-3">
              {specs.map((spec, index) =>
              <div key={index} className="flex gap-3">
                  <Input
                  aria-label={`Specification ${index + 1} label`}
                  value={spec.label}
                  placeholder="Processor"
                  onChange={(e) =>
                  setSpecs((prev) =>
                  prev.map((s, i) => i === index ? { ...s, label: e.target.value } : s)
                  )
                  } />
                
                  <Input
                  aria-label={`Specification ${index + 1} value`}
                  value={spec.value}
                  placeholder="Apple M3"
                  onChange={(e) =>
                  setSpecs((prev) =>
                  prev.map((s, i) => i === index ? { ...s, value: e.target.value } : s)
                  )
                  } />
                
                  <button
                  type="button"
                  onClick={() => setSpecs((prev) => prev.filter((_, i) => i !== index))}
                  aria-label={`Remove specification ${index + 1}`}
                  className="mt-0.5 h-11 w-11 flex-shrink-0 rounded-xl border border-line text-ink-muted transition-colors duration-150 ease-smooth hover:border-danger-100 hover:bg-danger-50 hover:text-danger-600">
                  
                    <XIcon className="mx-auto h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-base font-bold text-ink">Product images</h2>
            <p className="mt-1 text-[12px] text-ink-muted">
              Select from the SmartCart media library. First image becomes the thumbnail.
            </p>

            {images.length > 0 &&
            <div className="mt-4 grid grid-cols-4 gap-2">
                {images.map((image) =>
              <div key={image} className="relative">
                    <img
                  src={image}
                  alt=""
                  className="aspect-square w-full rounded-lg border border-line object-cover" />
                
                    <button
                  type="button"
                  onClick={() => setImages((prev) => prev.filter((i) => i !== image))}
                  aria-label="Remove image"
                  className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white">
                  
                      <XIcon className="h-3 w-3" />
                    </button>
                  </div>
              )}
              </div>
            }

            <div className="mt-4 grid grid-cols-4 gap-2">
              {galleryChoices.
              filter((image) => !images.includes(image)).
              map((image) =>
              <button
                key={image}
                type="button"
                onClick={() => setImages((prev) => [...prev, image].slice(0, 4))}
                aria-label="Add this image"
                className="group relative aspect-square overflow-hidden rounded-lg border border-line">
                
                    <img src={image} alt="" className="h-full w-full object-cover opacity-70 transition-opacity duration-150 ease-smooth group-hover:opacity-100" />
                    <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-white transition-colors duration-150 ease-smooth group-hover:bg-ink/40">
                      <ImagePlusIcon className="h-4 w-4 opacity-0 transition-opacity duration-150 ease-smooth group-hover:opacity-100" />
                    </span>
                  </button>
              )}
            </div>
            {errors.images &&
            <p className="mt-2 text-[12px] font-medium text-danger-600">{errors.images}</p>
            }
          </section>

          <section className="rounded-2xl border border-line bg-white p-6">
            <h2 className="text-base font-bold text-ink">Visibility</h2>
            <div className="mt-4">
              <Select
                label="Status"
                value={values.status}
                onChange={set('status')}
                options={statusOptions} />
              
            </div>
          </section>

          <div className="flex flex-col gap-2">
            <Button type="submit" size="lg" fullWidth loading={saving}>
              {editing ? 'Save Product' : 'Create Product'}
            </Button>
            <Button type="button" variant="outline" size="lg" fullWidth to="/admin/products">
              Cancel
            </Button>
          </div>
        </aside>
      </form>
    </div>);

}