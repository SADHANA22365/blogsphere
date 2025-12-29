import { Card } from "./ui/card";

export default function StatCard({ title, value }) {
  return (
    <Card className="p-5 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-indigo-600">
      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {title}
        </h3>

        <p className="text-3xl font-bold text-gray-900">
          {value}
        </p>
      </div>
    </Card>
  );
}
