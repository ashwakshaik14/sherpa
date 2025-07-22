import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to Sherpa</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transcript Analysis</h2>
            <p className="text-gray-600">
              Upload your meeting transcripts and get AI-powered insights instantly.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/transcript/create" passHref>
              <Button
                variant="outline"
                className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 focus:ring-2 focus:ring-indigo-400 transition-colors duration-200 px-4 py-2 rounded-md w-full"
              >
                Go to transcript
              </Button>
              </Link>
              <Link href="/transcript" passHref>
              <Button
                variant="outline"
                className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 focus:ring-2 focus:ring-indigo-400 transition-colors duration-200 px-4 py-2 rounded-md w-full"
              >
                View all transcript
              </Button>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Icebreaker Generator</h2>
            <p className="text-gray-600">
              Generate personalized icebreakers for better business connections.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="/icebreaker/create" passHref>
              <Button
                variant="outline"
                className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 focus:ring-2 focus:ring-indigo-400 transition-colors duration-200 px-4 py-2 rounded-md w-full"
              >
                Go to icebreaker
              </Button>
              </Link>
              <Link href="/icebreaker" passHref>
              <Button
                variant="outline"
                className="border border-indigo-500 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 focus:ring-2 focus:ring-indigo-400 transition-colors duration-200 px-4 py-2 rounded-md w-full"
              >
                view all icebreaker
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// import Link from "next/link";
// export default function Home() {
//   return (
//     <div>
//       <h1>Home</h1>
//       <Link href="/icebreaker/create">Create Icebreaker</Link>
//       <Link href="/transcript/create">Create Transcript</Link>
//     </div>
//   );
// }

