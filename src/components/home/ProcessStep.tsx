import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProcessStepProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const ProcessStep = ({ icon: Icon, title, description }: ProcessStepProps) => (
  <Card className="flex-1">
    <CardContent className="pt-6">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 bg-primary/10 rounded-full">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </CardContent>
  </Card>
);