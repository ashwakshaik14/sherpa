import { IcebreakerForm } from "@/components/icebreaker/icebreaker-form";

export default function CreateIcebreakerPage() {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Generate New Icebreaker</h1>
        <IcebreakerForm />
      </div>
    );
  } 