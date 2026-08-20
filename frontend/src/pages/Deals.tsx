import { PageHeader } from '../components/ui/PageHeader';
import { ProductGrid } from '../components/product/ProductGrid';
import { FlashSale } from '../components/home/FlashSale';
import { Newsletter } from '../components/home/Newsletter';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { useStore } from '../contexts/StoreContext';
import { discountPercent } from '../utils/format';

export function Deals() {
  const { products, productsLoading } = useStore();
  const discounted = [...products].
  filter((p) => discountPercent(p.price, p.originalPrice) > 0).
  sort(
    (a, b) =>
    discountPercent(b.price, b.originalPrice) - discountPercent(a.price, a.originalPrice)
  );

  return (
    <>
      <PageHeader
        title="Deals & Offers"
        subtitle="Up to 30% off selected electronics. Prices shown already include the discount."
        crumbs={[{ label: 'Deals' }]}
        action={<Badge tone="danger">Limited time offer</Badge>} />
      

      <FlashSale />

      <div className="mx-auto max-w-shell px-6 py-14">
        <SectionHeading
          title="All current offers"
          subtitle={`${discounted.length} products are discounted right now.`} />
        
        <div className="mt-8">
          <ProductGrid products={discounted} loading={productsLoading} />
        </div>
      </div>

      <Newsletter />
    </>);

}