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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1rem' }}>
      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
          How pleasant or unpleasant was your reaction to this visualization?
        </p>
        <ImageRadioPicker
          name="valence"
          options={buildOptions('valence', imageBasePath)}
          value={values.valence}
          onChange={(v) => handleChange('valence', v)}
        />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
          How calm or activated was your reaction to this visualization?
        </p>
        <ImageRadioPicker
          name="arousal"
          options={buildOptions('arousal', imageBasePath)}
          value={values.arousal}
          onChange={(v) => handleChange('arousal', v)}
        />
      </div>

      <div>
        <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
          How much control did you feel in response to this visualization?
        </p>
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