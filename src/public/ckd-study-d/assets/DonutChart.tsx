import React from 'react';
import SAM from './SAM';

export default function DonutChart({ parameters, setAnswer }: { parameters: any; setAnswer: (answer: any) => void }) {
    const { foreground, background, gridColumns = 10, probabilityStatement, idPrefix = 'donutChart' } = parameters;

    const donutImageName = `donut-${foreground.count}.png`;

    const [hasStarted, setHasStarted] = React.useState(false);
    const [allAnswered, setAllAnswered] = React.useState(false);

    const handleSAMChange = (values: any) => {
        const { valence, arousal, dominance } = values;
        const anyAnswered = valence !== null || arousal !== null || dominance !== null;
        const complete = valence !== null && arousal !== null && dominance !== null;

        setHasStarted(anyAnswered);
        setAllAnswered(complete);

        setAnswer({
            status: complete,
            answers: {
                [`${idPrefix}-valence`]: valence,
                [`${idPrefix}-arousal`]: arousal,
                [`${idPrefix}-dominance`]: dominance,
            },
        });
    };

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
            {/* Column 1: Scenario */}
            {probabilityStatement && (
                <div style={{ flex: '0 0 280px', paddingTop: '16px', height: '420px', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ marginBottom: '16px', textAlign: 'left', lineHeight: 1.5, marginTop: 0, paddingLeft: '16px' }}>Scenario</h3>
                    <div style={{ backgroundColor: '#FAFAFA', padding: '16px', borderRadius: '8px', flexGrow: 1 }}>
                        <p
                            style={{ margin: 0, fontSize: '1.2rem', lineHeight: 1.5 }}
                            dangerouslySetInnerHTML={{ __html: probabilityStatement }}
                        />
                    </div>
                </div>
            )}

            {/* Column 2: Visualization */}
            <div style={{ width: `${gridColumns * 32 + (gridColumns - 1) * 4}px`, paddingTop: '16px' }}>
                <h3 style={{ marginBottom: '16px', textAlign: 'left', lineHeight: 1.5, marginTop: 0 }}>Chart</h3>
                <div
                    style={{
                        width: `${gridColumns * 32 + (gridColumns - 1) * 4}px`,
                        height: `${gridColumns * 32 + (gridColumns - 1) * 4}px`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src={`${import.meta.env.BASE_URL}ckd-study-d/assets/${donutImageName}`}
                        alt={`Donut chart ${donutImageName}`}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                        }}
                    />
                </div>
                {/* Chart Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                        <img
                            src={`${import.meta.env.BASE_URL}ckd-study-d/assets/square-blue.svg`}
                            alt="foreground"
                            width={20}
                            height={20}
                        />
                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#306AC5' }}>{foreground?.count}</span>
                        <span style={{ fontSize: '1.2rem' }}>out of 100 {foreground?.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                        <img
                            src={`${import.meta.env.BASE_URL}ckd-study-d/assets/square-grey.svg`}
                            alt="background"
                            width={20}
                            height={20}
                        />
                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#8C8C8C' }}>{background?.count}</span>
                        <span style={{ fontSize: '1.2rem' }}>out of 100 {background?.label}</span>
                    </div>
                </div>
            </div>

            {/* Column 3: SAM */}
            <div style={{ flex: '0 1 auto', textAlign: 'left', paddingTop: '16px' }}>
                <h3 style={{ marginBottom: '8px', textAlign: 'left', lineHeight: 1.5, marginTop: 0 }}>Questions</h3>
                <p style={{ fontSize: '1rem', fontWeight: 400, marginTop: 0, marginBottom: '8px' }}>For each question, please select the figure or circle between two figures that best represents how you feel.</p>
                <SAM onChange={handleSAMChange} imageBasePath={`${import.meta.env.BASE_URL}ckd-study-d/assets/sam`} />
                {hasStarted && !allAnswered && (
                    <p style={{ color: 'red', marginTop: '0.6rem', fontWeight: 400 }}>
                        Please answer all questions to continue.
                    </p>
                )}
            </div>
        </div>
    );
}
