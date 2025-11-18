"use client";

import { ToggleGroup, ToggleGroupItem } from "@/shared/ui/toggle-group";

interface PresetToggleProps {
  activePresetNo?: number | null;
  presets?: number[];
  selectedPreset?: number | null;
  onSelectPreset: (preset: number) => void;
  ariaLabel: string;
  label?: string;
  className?: string;
}

export const PresetToggle = ({
  activePresetNo,
  presets = [1, 2, 3],
  selectedPreset,
  onSelectPreset,
  ariaLabel,
  label,
  className,
}: PresetToggleProps) => {
  if (presets.length === 0) return null;

  return (
    <div className={className}>
      {label && (
        <p className="text-muted-foreground mb-1 text-xs font-medium">
          {label}
        </p>
      )}
      <ToggleGroup
        type="single"
        size="sm"
        value={selectedPreset != null ? String(selectedPreset) : undefined}
        onValueChange={(value) => {
          if (!value) return;
          onSelectPreset(Number(value));
        }}
        variant="outline"
        aria-label={ariaLabel}
      >
        {presets.map((preset) => {
          const isActiveInGame = activePresetNo === preset;

          return (
            <ToggleGroupItem
              key={preset}
              value={String(preset)}
              aria-label={`${ariaLabel} ${preset}`}
              className="text-muted-foreground relative min-w-9 px-3 text-xs font-semibold md:text-sm"
            >
              <span>{preset}</span>
              {isActiveInGame && (
                <span
                  className="absolute top-1 right-1 size-1 rounded-full bg-orange-400"
                  aria-hidden="true"
                />
              )}
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>
    </div>
  );
};
