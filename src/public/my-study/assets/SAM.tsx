import React, { useState } from 'react';
import ImageRadioPicker, { ImageOption } from './ImageRadioPicker';

export interface SAMValues {
  valence: number | null;
  arousal: number | null;
  dominance: number | null;
}

interface SAMProps {
  onChange: (values: SAMValues) => void;
  imageBasePath: string;
}

function buildOptions(dimension: string, basePath: string): ImageOption[] {
  return Array.from({ length: 9 }, (_, i) => {
    const level = i + 1;
    return {
      value: level,
      imageSrc: `${basePath}/${dimension}-${level}.png`,
    };
  });
}

export default function SAM({ onChange, imageBasePath = '/my-study/assets/sam' }: SAMProps) {
  const [values, setValues] = useState<SAMValues>({
    valence: null,
    arousal: null,
    dominance: null,
  });

  const handleChange = (dimension: keyof SAMValues, value: string | number) => {
    const updated = { ...values, [dimension]: value as number };
    setValues(updated);
    onChange(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Shared label style */}
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
          1. How unpleasant or pleasant do you feel after seeing this visualization?
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#555', fontWeight: 500, marginBottom: '2px', padding: '0 8px' }}>
          <span>unpleasant</span>
          <span>pleasant</span>
        </div>
        <ImageRadioPicker
          name="valence"
          options={buildOptions('valence', imageBasePath)}
          value={values.valence}
          onChange={(v) => handleChange('valence', v)}
        />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
          2. How calm or alert do you feel after seeing this visualization?
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#555', fontWeight: 500, marginBottom: '2px', padding: '0 8px' }}>
          <span>calm</span>
          <span>alert</span>
        </div>
        <ImageRadioPicker
          name="arousal"
          options={buildOptions('arousal', imageBasePath)}
          value={values.arousal}
          onChange={(v) => handleChange('arousal', v)}
        />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
          3. How much in control do you feel after seeing this visualization?
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#555', fontWeight: 500, marginBottom: '2px', padding: '0 8px' }}>
          <span>little control</span>
          <span>very much in control</span>
        </div>
        <ImageRadioPicker
          name="dominance"
          options={buildOptions('dominance', imageBasePath)}
          value={values.dominance}
          onChange={(v) => handleChange('dominance', v)}
        />
      </div>
    </div>
  );
}