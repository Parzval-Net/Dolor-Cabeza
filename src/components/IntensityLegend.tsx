
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const intensityLevels = [
  { 
    range: "1-3", 
    label: "Leve", 
    color: "bg-emerald-500",
    description: "Molestia leve, actividades normales"
  },
  { 
    range: "4-6", 
    label: "Moderado", 
    color: "bg-orange-500",
    description: "Dificulta algunas actividades"
  },
  { 
    range: "7-8", 
    label: "Severo", 
    color: "bg-red-500",
    description: "Limita significativamente las actividades"
  },
  { 
    range: "9-10", 
    label: "Extremo", 
    color: "bg-red-700",
    description: "Incapacitante, requiere descanso completo"
  },
];

export default function IntensityLegend() {
  return (
    <Card className="glass-card-dark border border-slate-300/30 shadow-lg">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-sm sm:text-base font-semibold text-slate-800">
          Escala de Intensidad
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4">
        <div className="space-y-2 sm:space-y-3">
          {intensityLevels.map(({ range, label, color, description }) => (
            <div
              key={range}
              className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 bg-white/90 rounded-lg border border-slate-200"
            >
              <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full ${color} mt-0.5 flex-shrink-0 shadow-sm`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <span className="font-semibold text-slate-800 text-xs sm:text-sm">{label}</span>
                  <span className="text-xs text-slate-600 bg-slate-100 px-1.5 sm:px-2 py-0.5 rounded">
                    {range}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-tight">{description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-xs text-blue-700 leading-tight">
            💡 <strong>Tip:</strong> Los puntos de colores en el calendario indican la intensidad máxima del día
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
