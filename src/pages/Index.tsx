import { useState } from 'react';
import { StripeProvider } from '@/components/StripeProvider';
import { ProductCard } from '@/components/ProductCard';
import { CheckoutForm } from '@/components/CheckoutForm';
import { PaymentSuccess } from '@/components/PaymentSuccess';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
}

const products: Product[] = [
  {
    id: 'basic',
    name: 'Basic Plan',
    description: 'Perfect for getting started',
    price: 999, // $9.99 in cents
    currency: 'usd',
    features: [
      'Up to 5 projects',
      'Basic support',
      '1GB storage',
      'Email notifications'
    ]
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    description: 'Best for growing businesses',
    price: 2999, // $29.99 in cents
    currency: 'usd',
    popular: true,
    features: [
      'Unlimited projects',
      'Priority support',
      '10GB storage',
      'Advanced analytics',
      'Team collaboration',
      'API access'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For large organizations',
    price: 9999, // $99.99 in cents
    currency: 'usd',
    features: [
      'Everything in Pro',
      'Dedicated support',
      'Unlimited storage',
      'Custom integrations',
      'SLA guarantee',
      'Advanced security'
    ]
  }
];

type ViewState = 'products' | 'checkout' | 'success';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>('products');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('checkout');
  };

  const handlePaymentSuccess = () => {
    setCurrentView('success');
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
    setSelectedProduct(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'products':
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Choose Your Plan
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select the perfect plan for your needs. All plans include our core features with different limits and support levels.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={handleSelectProduct}
                  loading={loading}
                />
              ))}
            </div>
          </div>
        );
      
      case 'checkout':
        return selectedProduct ? (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Complete Your Purchase
              </h1>
              <p className="text-gray-600">
                You're purchasing: {selectedProduct.name}
              </p>
            </div>
            
            <StripeProvider>
              <CheckoutForm
                amount={selectedProduct.price}
                currency={selectedProduct.currency}
                productName={selectedProduct.name}
                onSuccess={handlePaymentSuccess}
                onCancel={handleBackToProducts}
              />
            </StripeProvider>
          </div>
        ) : null;
      
      case 'success':
        return selectedProduct ? (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-green-600 mb-4">
                Welcome Aboard!
              </h1>
            </div>
            
            <PaymentSuccess
              productName={selectedProduct.name}
              onContinue={handleBackToProducts}
            />
          </div>
        ) : null;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;