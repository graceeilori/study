import React from 'react';

export interface ImageOption {
  value: string | number;
  imageSrc: string;
  label?: string;
}

interface ImageRadioPickerProps {
  name: string;
  options: ImageOption[];
  value: string | number | null;
  onChange: (value: string | number) => void;
}

export default function ImageRadioPicker({ name, options, value, onChange }: ImageRadioPickerProps) {
  return (
    <div style={{ display: 'flex', gap: '4px' }} role="radiogroup" aria-label={name}>
      {options.map((opt) => {
        const isSelected = value === opt.value;
        return (
          <label
            key={opt.value}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '4px',
              border: isSelected ? '2px solid #1c7ed6' : '2px solid transparent',
              borderRadius: '6px',
              background: isSelected ? '#FFFFFB' : 'transparent',
              cursor: 'pointer',
            }}
          >
            <img
              src={opt.imageSrc}
              alt={opt.label ?? String(opt.value)}
              width={67}
              height={87}
              style={{ display: 'block' }}
            />
            <input
              type="radio"
              name={name}
              value={String(opt.value)}
              checked={isSelected}
              onChange={() => onChange(opt.value)}
              style={{ display: 'none' }}
            />
          </label>
        );
      })}
    </div>
  );
}