'use client';

import { useEffect, useState } from 'react';
import { fetchTranscript } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function TranscriptList() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchTranscript();
        setRecords(res.records);
      } catch (err) {
        console.error("Failed to fetch transcripts", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);
  console.log(records);

  if (loading) {
    return (
      <div className="text-gray-500 flex gap-2 items-center">
        <Loader2 className="w-4 h-4 animate-spin" />
        Loading transcripts...
      </div>
    );
  }

  if (!records.length) {
    return <div className="text-gray-600">No transcripts found.</div>;
  }

  return (
    <div className="space-y-4">
      {records.map((record: any, idx: number) => (
        <Card key={idx}>
          <CardContent className="p-4 space-y-2">
            <div><strong>Company:</strong> {record.company}</div>
            <div><strong>Attendees:</strong> {record.attendees.join(', ')}</div>
            <div><strong>Date:</strong> {record.date}</div>
            <div className="bg-muted p-2 rounded whitespace-pre-wrap">
              <strong>Provided Transcript:</strong>
              <div>{record.transcript}</div>
            </div>
            <div className="bg-muted p-2 rounded whitespace-pre-wrap">
              <strong>AI Feedback:</strong>
              <div>{record.ai_feedback}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
