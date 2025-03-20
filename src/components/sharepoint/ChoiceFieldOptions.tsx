
import { Badge } from "@/components/ui/badge";
import { ListCheck } from "lucide-react";

interface ChoiceOption {
  title: string;
  options: string[];
}

interface ChoiceFieldOptionsProps {
  choices: ChoiceOption[];
}

export function ChoiceFieldOptions({ choices }: ChoiceFieldOptionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {choices.map((choice, index) => (
        <div key={index} className="border rounded-md p-4 bg-card hover:shadow-md transition-shadow">
          <h4 className="font-semibold mb-2 flex items-center text-primary">
            <ListCheck className="mr-2 h-5 w-5" />
            {choice.title}:
          </h4>
          <ul className="space-y-2 mt-3">
            {choice.options.map((option, optIndex) => (
              <li key={optIndex} className="flex items-center">
                <Badge 
                  variant="outline" 
                  className="mr-2 bg-muted/30 hover:bg-accent hover:text-accent-foreground cursor-default"
                >
                  {optIndex + 1}
                </Badge>
                {option}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
