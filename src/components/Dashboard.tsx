const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload) return null;
  return (
    <div className="bg-black p-3 border border-gray-700 rounded-lg shadow-lg">
      <p className="font-medium mb-2 text-white">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} className="text-sm text-white">
          {entry.name === 'fuelFilled' ? 'Fuel Filled (L)' : 'Distance (km)'}: {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};