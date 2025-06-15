
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const intensityInfo = [
  { key: "mild", label: "Leve (1–3)", dot: "bg-emerald-500 border-emerald-300" },
  { key: "moderate", label: "Moderado (4–6)", dot: "bg-orange-500 border-orange-300" },
  { key: "severe", label: "Severo (7–8)", dot: "bg-red-500 border-red-300" },
  { key: "extreme", label: "Extremo (9–10)", dot: "bg-red-700 border-red-400" },
];

export default function IntensityLegend() {
  return (
    <Card className="glass-card-dark mb-2">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold text-slate-800">Leyenda de Intensidad</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row flex-wrap md:flex-col gap-3 md:gap-0">
        {intensityInfo.map(({ key, label, dot }) => (
          <div
            key={key}
            className="flex items-center space-x-3 bg-white/90 px-3 py-2 rounded-lg shadow border w-max md:w-full"
          >
            <span className={`w-4 h-4 rounded-full border-2 ${dot} mr-2 shadow-md`} />
            <span className="text-slate-700 font-medium text-sm">{label}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
