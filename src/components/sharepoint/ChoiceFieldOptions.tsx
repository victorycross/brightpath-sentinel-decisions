
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
        <div key={index} className="border rounded-md p-4">
          <h4 className="font-semibold mb-2">{choice.title}:</h4>
          <ul className="list-disc pl-6 space-y-1">
            {choice.options.map((option, optIndex) => (
              <li key={optIndex}>{option}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
