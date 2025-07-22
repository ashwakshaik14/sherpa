// types/index.ts

export interface IcebreakerPayload {
    name: string;
    linkedin_bio: string;
    pitch_deck_text?: string;   
    pitch_deck_image?: string;  
  }
  

export interface IcebreakerResponse {
    message: string;
    result: string;
}

export interface TranscriptPayload {
    transcript: string;
    company: string;
    attendees: string;
    date: string;
}

export interface TranscriptResponse {
    message: string;
    result: string;
}
  
  