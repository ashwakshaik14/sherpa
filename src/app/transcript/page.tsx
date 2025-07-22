import TranscriptList from '@/components/transcript/transcript-list';

export default function TranscriptFeedPage() {
  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">🗂️ Transcript Feed</h1>
      <TranscriptList />
    </div>
  );
}
