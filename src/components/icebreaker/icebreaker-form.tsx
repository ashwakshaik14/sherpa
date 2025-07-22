'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { IcebreakerInsight, fetchIcebreaker } from '@/lib/api';
import { Loader2Icon } from "lucide-react";
import Tesseract from "tesseract.js";

interface FormData {
  name: string;
  linkedin_bio: string;
  pitch_deck_text: string;
}

export function IcebreakerForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    linkedin_bio: '',
    pitch_deck_text: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [pollInterval, setPollInterval] = useState<NodeJS.Timeout | null>(null);
  const [submissionTime, setSubmissionTime] = useState<Date | null>(null);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, [pollInterval]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset states
    setOcrLoading(true);
    setOcrProgress(0);
    setError(null);

    try {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("Image size should be less than 5MB");
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        throw new Error("Please upload an image file");
      }

      const { data } = await Tesseract.recognize(file, 'eng', {
        logger: m => {
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        }
      });

      const extracted = data.text.trim();
      
      if (extracted.length === 0) {
        throw new Error("No readable text found in the image");
      }

      // Update pitch deck text
      setFormData(prev => ({
        ...prev,
        pitch_deck_text: prev.pitch_deck_text 
          ? `${prev.pitch_deck_text}\n\n${extracted}` 
          : extracted
      }));

    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to extract text from image");
      console.error("[OCR Error]:", err);
    } finally {
      setOcrLoading(false);
      setOcrProgress(0);
      // Reset file input
      e.target.value = '';
    }
  };

  const startPolling = () => {
    // Clear any existing polling
    if (pollInterval) {
      clearInterval(pollInterval);
    }

    const currentSubmission = new Date();
    setSubmissionTime(currentSubmission);

    const interval = setInterval(async () => {
      try {
        const response = await fetchIcebreaker();
        const records = response.records;

        // Find the most recent matching record
        const matchingRecord = records.find((r: any) => {
          const recordDate = new Date(r.created_at);
          return r.name === formData.name && 
                 r.linkedin_bio === formData.linkedin_bio &&
                 recordDate > currentSubmission;
        });

        if (matchingRecord) {
          setResult(matchingRecord.ai_result);
          clearInterval(interval);
          setIsLoading(false);
          setPollInterval(null);
        }

        // Stop polling after 30 seconds
        if (new Date().getTime() - currentSubmission.getTime() > 30000) {
          clearInterval(interval);
          setIsLoading(false);
          setPollInterval(null);
          if (!result) {
            setError('Timed out waiting for result. Please try again.');
          }
        }
      } catch (err) {
        console.error('Error polling for results:', err);
      }
    }, 2000); // Poll every 2 seconds

    setPollInterval(interval);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      // Queue the job
      await IcebreakerInsight(formData);
      // Start polling for results
      startPolling();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate icebreaker');
      console.error('Error generating icebreaker:', err);
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Generate Icebreaker</CardTitle>
            <CardDescription>
              Enter the person's details to generate a personalized icebreaker.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter the person's name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin_bio">LinkedIn Bio</Label>
              <Textarea
                id="linkedin_bio"
                name="linkedin_bio"
                placeholder="Paste their LinkedIn bio here..."
                value={formData.linkedin_bio}
                onChange={handleChange}
                className="min-h-[100px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pitch_deck_text">Pitch Deck Content</Label>
              <Textarea
                id="pitch_deck_text"
                name="pitch_deck_text"
                placeholder="Paste relevant pitch deck content here..."
                value={formData.pitch_deck_text}
                onChange={handleChange}
                className="min-h-[150px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_upload">Upload Pitch Deck Image</Label>
              <Input
                id="image_upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={ocrLoading}
                className="cursor-pointer"
              />
              {ocrLoading && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  <span>Processing image... {ocrProgress}%</span>
                </div>
              )}
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <Button 
              type="submit" 
              disabled={isLoading || ocrLoading || !formData.name || !formData.linkedin_bio}
              className="w-full"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                  {result ? 'Generating...' : 'Please wait...'}
                </span>
              ) : (
                'Generate Icebreaker'
              )}
            </Button>
          </CardContent>
        </Card>
      </form>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Icebreaker</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{result}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 