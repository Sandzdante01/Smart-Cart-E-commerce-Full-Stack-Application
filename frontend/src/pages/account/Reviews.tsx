import { MessageSquareIcon } from 'lucide-react';
import { ReviewCard } from '../../components/review/ReviewCard';
import { EmptyState } from '../../components/ui/EmptyState';
import { useStore } from '../../contexts/StoreContext';

export function AccountReviews() {
  const { reviews, user } = useStore();
  const mine = reviews.filter((r) => r.customerName === `${user?.firstName} ${user?.lastName}` && r.status === 'Published');

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-[26px] font-bold text-ink">My Reviews</h1>
        <p className="mt-1.5 text-[15px] text-ink-soft">
          {mine.length} review{mine.length === 1 ? '' : 's'} published on SmartCart.
        </p>
      </div>

      {mine.length === 0 ?
      <EmptyState
        icon={<MessageSquareIcon className="h-6 w-6" />}
        title="No reviews yet"
        message="Once you've received an order, share your experience to help other shoppers decide."
        actionLabel="View my orders"
        actionTo="/account/orders" /> :


      <div className="space-y-4">
          {mine.map((review) =>
        <ReviewCard key={review.id} review={review} showProduct />
        )}
        </div>
      }
    </div>);

}