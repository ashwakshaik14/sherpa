'use client';

import { useEffect, useState } from "react";
import { fetchIcebreaker } from "@/lib/api";
import IcebreakerList from "@/components/icebreaker/icebreaker-list";
import { Loader2Icon } from "lucide-react";

export default function IcebreakerListPage() {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadIcebreakers() {
      try {
        const data = await fetchIcebreaker();
        setRecords(data.records);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error fetching records");
      } finally {
        setLoading(false);
      }
    }

    loadIcebreakers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold">All Icebreakers</h1>

      {loading && (
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2Icon className="h-5 w-5 animate-spin" />
          Loading...
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      {!loading && records.length === 0 && (
        <p className="text-gray-500 text-sm">No icebreakers found.</p>
      )}

      {!loading && records.length > 0 && (
        <IcebreakerList data={records} />
      )}
    </div>
  );
}
