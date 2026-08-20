import { useState } from 'react';
import { MessageSquareIcon, Trash2Icon } from 'lucide-react';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, statusTone } from '../../components/ui/Badge';
import { Rating } from '../../components/ui/Rating';
import { EmptyState } from '../../components/ui/EmptyState';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Select } from '../../components/ui/Select';
import { useStore } from '../../contexts/StoreContext';
import type { Review } from '../../types';

export function AdminReviews() {
  const { reviews, deleteReview } = useStore();
  const [rating, setRating] = useState('All');
  const [toDelete, setToDelete] = useState<Review | null>(null);

  const rows = reviews.filter((r) => rating === 'All' || String(r.rating) === rating);

  const columns: Array<Column<Review>> = [
  {
    key: 'product',
    header: 'Product',
    render: (review) => <span className="font-semibold text-ink">{review.productName}</span>
  },
  { key: 'customer', header: 'Customer', render: (r) => r.customerName, hideBelow: 'sm' },
  {
    key: 'rating',
    header: 'Rating',
    render: (r) => <Rating value={r.rating} showValue={false} />
  },
  {
    key: 'review',
    header: 'Review',
    render: (r) =>
    <span className="block max-w-sm truncate text-ink-soft" title={r.body}>
          {r.body}
        </span>,

    hideBelow: 'lg'
  },
  { key: 'date', header: 'Date', render: (r) => r.date, hideBelow: 'md' },
  {
    key: 'status',
    header: 'Status',
    render: (r) => <Badge tone={statusTone[r.status] ?? 'neutral'}>{r.status}</Badge>
  },
  {
    key: 'actions',
    header: 'Actions',
    align: 'right',
    render: (review) =>
    <button
      type="button"
      onClick={() => setToDelete(review)}
      aria-label={`Delete review by ${review.customerName}`}
      className="rounded-lg p-2 text-ink-muted transition-colors duration-150 ease-smooth hover:bg-danger-50 hover:text-danger-600">
      
          <Trash2Icon className="h-4 w-4" />
        </button>

  }];


  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-ink">Reviews</h1>
          <p className="mt-1.5 text-[15px] text-ink-soft">
            {rows.length} customer reviews across the catalogue.
          </p>
        </div>
        <div className="w-44">
          <Select
            aria-label="Filter by rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            options={[
            { label: 'All ratings', value: 'All' },
            { label: '5 stars', value: '5' },
            { label: '4 stars', value: '4' },
            { label: '3 stars', value: '3' },
            { label: '2 stars', value: '2' },
            { label: '1 star', value: '1' }]
            } />
          
        </div>
      </div>

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(review) => review.id}
        caption="Customer reviews"
        empty={
        <EmptyState
          icon={<MessageSquareIcon className="h-6 w-6" />}
          title="No reviews yet"
          message="Customer reviews will appear here once shoppers start rating products." />

        } />
      

      <Modal
        open={Boolean(toDelete)}
        onClose={() => setToDelete(null)}
        title="Delete Review?"
        description={
        toDelete ?
        `Are you sure you want to delete the review by ${toDelete.customerName} on ${toDelete.productName}? This action cannot be undone.` :
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
              deleteReview(toDelete.id);
              setToDelete(null);
            }}>
            
              Delete Review
            </Button>
          </>
        } />
      
    </div>);

}