import { IcebreakerPayload, IcebreakerResponse, TranscriptPayload, TranscriptResponse } from "../../types/index";

export const TranscriptInsight = async (data: TranscriptPayload): Promise<TranscriptResponse> => {
  const formattedData = {
    ...data,
    attendees: data.attendees.split(',').map(a => a.trim()).filter(a => a !== '')
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transcript`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formattedData),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to fetch transcript insight: ${error}`);
  }

  return res.json();
};



export const IcebreakerInsight = async (data: IcebreakerPayload): Promise<IcebreakerResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/icebreaker`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to generate icebreaker: ${error}`);
  }

  return res.json();
};
  
  

// Icebreaker GET
export const fetchIcebreaker = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/icebreaker`);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to fetch icebreaker records: ${error}`);
  }

  return res.json(); // returns: { message: "...", records: [...] }
};

// Transcript GET
export const fetchTranscript = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/transcript`);

  if (!res.ok) {
    const error = await res.text();
    throw new Error(`Failed to fetch transcript records: ${error}`);
  }

  return res.json(); // returns: { message: "...", records: [...] }
};
