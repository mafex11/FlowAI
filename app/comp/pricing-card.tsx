// app/comp/pricing-card.tsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function PricingCard({
  className,
  title,
  price,
  duration,
  features,
  recommended = false,
}: {
  className?: string;
  title: string;
  price: string;
  duration: string;
  features: string[];
  recommended?: boolean;
}) {
  return (
    <Card className={cn(
      "w-full max-w-md mx-auto transition-all hover:scale-[1.02] relative min-h-[400px] flex flex-col",
      recommended ? "border-2 border-primary/20" : "",
      className
    )}>
      {recommended && (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
          Most Popular
        </Badge>
      )}
      
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-bold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col flex-1 space-y-6">
        <div className="text-center">
          <span className="text-3xl md:text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">/{duration}</span>
          {duration === "year" && (
            <p className="text-sm mt-2 text-green-500">
              Save 30% vs monthly plan
            </p>
          )}
        </div>

        <div className="flex-grow">
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto">
          <Button className="w-full" size="lg">
            Get Started
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}