import React, { useState } from 'react';
import { PencilIcon, PlusIcon, Trash2Icon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { categories as seed } from '../../data/categories';
import type { Category } from '../../types';
import { slugify } from '../../utils/format';

export function AdminCategories() {
  const [items, setItems] = useState<Category[]>(seed);
  const [editing, setEditing] = useState<Category | null>(null);
  const [creating, setCreating] = useState(false);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [draft, setDraft] = useState({ name: '', description: '' });

  const openCreate = () => {
    setDraft({ name: '', description: '' });
    setCreating(true);
  };

  const openEdit = (category: Category) => {
    setDraft({ name: category.name, description: category.description });
    setEditing(category);
  };

  const save = () => {
    if (!draft.name.trim()) {
      toast.error('Category name is required.');
      return;
    }
    if (editing) {
      setItems((prev) =>
      prev.map((c) =>
      c.id === editing.id ? { ...c, name: draft.name, description: draft.description } : c
      )
      );
      toast.success('Category updated', { description: draft.name });
      setEditing(null);
      return;
    }
    setItems((prev) => [
    ...prev,
    {
      id: `c-${Date.now()}`,
      name: draft.name,
      slug: slugify(draft.name),
      productCount: 0,
      image: seed[0].image,
      description: draft.description
    }]
    );
    toast.success('Category created', { description: draft.name });
    setCreating(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-ink">Categories</h1>
          <p className="mt-1.5 text-[15px] text-ink-soft">
            {items.length} categories organise the SmartCart catalogue.
          </p>
        </div>
        <Button onClick={openCreate}>
          <PlusIcon className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {items.map((category) =>
        <article
          key={category.id}
          className="flex gap-4 rounded-2xl border border-line bg-white p-4 transition-[border-color,box-shadow] duration-200 ease-smooth hover:border-primary-200 hover:shadow-card">
          
            <img
            src={category.image}
            alt=""
            className="h-20 w-20 flex-shrink-0 rounded-xl border border-line object-cover" />
          
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-ink">{category.name}</p>
              <p className="mt-0.5 text-[13px] font-semibold text-primary-600">
                {category.productCount} products
              </p>
              <p className="mt-1.5 line-clamp-2 text-[13px] text-ink-soft">{category.description}</p>
              <div className="mt-3 flex gap-1">
                <button
                type="button"
                onClick={() => openEdit(category)}
                aria-label={`Edit ${category.name}`}
                className="rounded-lg p-2 text-ink-muted transition-colors duration-150 ease-smooth hover:bg-primary-50 hover:text-primary-700">
                
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button
                type="button"
                onClick={() => setToDelete(category)}
                aria-label={`Delete ${category.name}`}
                className="rounded-lg p-2 text-ink-muted transition-colors duration-150 ease-smooth hover:bg-danger-50 hover:text-danger-600">
                
                  <Trash2Icon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        )}
      </div>

      <Modal
        open={creating || Boolean(editing)}
        onClose={() => {
          setCreating(false);
          setEditing(null);
        }}
        title={editing ? 'Edit category' : 'Add category'}
        footer={
        <>
            <Button
            variant="outline"
            onClick={() => {
              setCreating(false);
              setEditing(null);
            }}>
            
              Cancel
            </Button>
            <Button onClick={save}>{editing ? 'Save changes' : 'Create category'}</Button>
          </>
        }>
        
        <div className="space-y-4">
          <Input
            label="Category name"
            value={draft.name}
            placeholder="Laptops"
            onChange={(e) => setDraft({ ...draft, name: e.target.value })} />
          
          <Input
            label="Short description"
            value={draft.description}
            placeholder="Ultrabooks and workstations for study, work and creation."
            onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          
        </div>
      </Modal>

      <Modal
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        title="Delete Category?"
        description={
        toDelete ?
        `Are you sure you want to delete ${toDelete.name}? Products in this category will need reassigning.` :
        undefined
        }
        footer={
        <>
            <Button variant="outline" onClick={() => setToDelete(null)}>
              Cancel
            </Button>
            <Button
            variant="danger"
            onClick={() => {
              if (!toDelete) return;
              setItems((prev) => prev.filter((c) => c.id !== toDelete.id));
              toast.success('Category deleted', { description: toDelete.name });
              setToDelete(null);
            }}>
            
              Delete Category
            </Button>
          </>
        } />
      
    </div>);

}