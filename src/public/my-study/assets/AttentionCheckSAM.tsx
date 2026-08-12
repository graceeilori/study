import React, { useState } from 'react';
import ImageRadioPicker, { ImageOption } from './ImageRadioPicker';

interface AttentionCheckSAMValues {
  valence: number | null;
  arousal: number | null;
  dominance: number | null;
}

interface AttentionCheckSAMProps {
  onChange: (values: AttentionCheckSAMValues) => void;
  imageBasePath: string;
  valenceTarget: number;
  arousalTarget: number;
  dominanceTarget: number;
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

export default function AttentionCheckSAM({
  onChange,
  imageBasePath = '/my-study/assets/sam',
  valenceTarget,
  arousalTarget,
  dominanceTarget,
}: AttentionCheckSAMProps) {
  const [values, setValues] = useState<AttentionCheckSAMValues>({
    valence: null,
    arousal: null,
    dominance: null,
  });

  const handleChange = (dimension: keyof AttentionCheckSAMValues, value: string | number) => {
    const updated = { ...values, [dimension]: value as number };
    setValues(updated);
    onChange(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
          1. Based on the scenario given, how unpleasant or pleasant do you feel after seeing this chart?
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#555', fontWeight: 500, marginBottom: '2px', padding: '0 8px' }}>
          <span>unpleasant</span>
          <span>pleasant</span>
        </div>
        <ImageRadioPicker
          name="attn-valence"
          options={buildOptions('valence', imageBasePath)}
          value={values.valence}
          onChange={(v) => handleChange('valence', v)}
        />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
          2. Based on the scenario given, how calm or alert do you feel after seeing this chart?
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#555', fontWeight: 500, marginBottom: '2px', padding: '0 8px' }}>
          <span>calm</span>
          <span>alert</span>
        </div>
        <ImageRadioPicker
          name="attn-arousal"
          options={buildOptions('arousal', imageBasePath)}
          value={values.arousal}
          onChange={(v) => handleChange('arousal', v)}
        />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
          3. Based on the scenario given, how much in control do you feel after seeing this chart?
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#555', fontWeight: 500, marginBottom: '2px', padding: '0 8px' }}>
          <span>no control</span>
          <span>in control</span>
        </div>
        <ImageRadioPicker
          name="attn-dominance"
          options={buildOptions('dominance', imageBasePath)}
          value={values.dominance}
          onChange={(v) => handleChange('dominance', v)}
        />
      </div>
    </div>
  );
}
