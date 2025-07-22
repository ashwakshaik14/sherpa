
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface IcebreakerListProps {
  data: any[];
}

export default function IcebreakerList({ data }: IcebreakerListProps) {
  return (
    <div className="space-y-6">
      {data.map((record, idx) => (
        <Card key={record.id || idx}>
          <CardHeader>
            <CardTitle>{record.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-gray-600"><strong>LinkedIn Bio:</strong> {record.linkedin_bio}</p>
            {record.pitch_deck_text && (
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                <strong>Pitch Deck:</strong> {record.pitch_deck_text}
              </p>
            )}
            {/* <div className="bg-gray-50 p-3 rounded border text-sm whitespace-pre-wrap">
              <strong>AI Insight:</strong>
              <div>{record.ai_result}</div>
            </div> */}
            <div className="bg-gray-50 p-3 rounded border text-sm whitespace-pre-wrap relative">
                <strong>AI Insight:</strong>

                <button
                    onClick={() => navigator.clipboard.writeText(record.ai_result)}
                    className="absolute top-2 right-2 text-xs border border-gray-500 hover:bg-gray-300 px-2 py-1 rounded"
                >
                    Copy
                </button>

                <div>{record.ai_result}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
