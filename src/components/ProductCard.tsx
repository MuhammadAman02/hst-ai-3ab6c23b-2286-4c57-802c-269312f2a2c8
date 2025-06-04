import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  features: string[];
  popular?: boolean;
}

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  loading?: boolean;
}

export const ProductCard = ({ product, onSelectProduct, loading }: ProductCardProps) => {
  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price / 100);
  };

  return (
    <Card className={`stripe-card relative ${product.popular ? 'ring-2 ring-stripe-blue' : ''}`}>
      {product.popular && (
        <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-stripe-gradient text-white">
          Most Popular
        </Badge>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
        <CardDescription className="text-gray-600">{product.description}</CardDescription>
        <div className="price-tag mt-4">
          {formatPrice(product.price, product.currency)}
        </div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button
          onClick={() => onSelectProduct(product)}
          disabled={loading}
          className="w-full stripe-button"
        >
          {loading ? 'Processing...' : 'Choose Plan'}
        </Button>
      </CardFooter>
    </Card>
  );
};