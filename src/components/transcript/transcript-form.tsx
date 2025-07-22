"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { TranscriptInsight } from "@/lib/api";

export default function TranscriptPage() {
  const [form, setForm] = useState({
    transcript: "",
    company: "",
    attendees: "",
    date: "",
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await TranscriptInsight(form);
      console.log(res);
      setResult(res.result); // result returned from FastAPI
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 space-y-6 px-4">
      <h1 className="text-3xl font-bold mb-4">📄 Transcript Insight</h1>

      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="company">Company</Label>
          <Input name="company" id="company" placeholder="Business Sherpa" onChange={handleChange} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="attendees">Attendees</Label>
          <Input name="attendees" id="attendees" placeholder="Ashwak, Vinayaka" onChange={handleChange} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="date">Date</Label>
          <Input name="date" id="date" type="date" onChange={handleChange} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="transcript">Transcript</Label>
          <Textarea
            name="transcript"
            id="transcript"
            placeholder="Paste the transcript here..."
            rows={8}
            onChange={handleChange}
          />
        </div>

        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? "Generating..." : "Generate Insight"}
        </Button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <Card className="mt-6">
          <CardContent className="p-4 whitespace-pre-wrap">{result}</CardContent>
        </Card>
      )}
    </div>
  );
}
  