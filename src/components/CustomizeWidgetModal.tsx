import React from 'react';
import { X, GripVertical, Eye, EyeOff } from 'lucide-react';

interface Widget {
  id: string;
  name: string;
  visible: boolean;
}

interface CustomizeWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CustomizeWidgetModal({ isOpen, onClose }: CustomizeWidgetModalProps) {
  const [widgets, setWidgets] = React.useState<Widget[]>([
    { id: '1', name: 'Last 12 Month Fuel Report', visible: true },
    { id: '2', name: 'Total Fuel Filled Comparison', visible: true },
    { id: '3', name: 'Fuel Efficiency Comparison', visible: true },
    { id: '4', name: 'Distance vs Fuel Consumption', visible: true },
    { id: '5', name: 'Vehicle Efficiency Comparison', visible: true },
  ]);

  if (!isOpen) return null;

  const toggleWidget = (id: string) => {
    setWidgets(widgets.map(widget => 
      widget.id === id ? { ...widget, visible: !widget.visible } : widget
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold">Customize Widgets</h2>
            <p className="text-sm text-gray-500">Drag and drop to reorder, toggle visibility</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-3">
            {widgets.map((widget) => (
              <div 
                key={widget.id}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-move hover:bg-gray-100 transition-colors"
              >
                <GripVertical className="w-5 h-5 text-gray-400" />
                <span className="flex-1 font-medium">{widget.name}</span>
                <button
                  onClick={() => toggleWidget(widget.id)}
                  className="p-2 hover:bg-white rounded-lg transition-colors"
                >
                  {widget.visible ? (
                    <Eye className="w-5 h-5 text-gray-600" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}