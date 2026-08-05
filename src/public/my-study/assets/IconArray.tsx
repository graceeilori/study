import React from 'react';
import SAM from './SAM';

export default function IconArray({ parameters, setAnswer }: { parameters: any; setAnswer: (answer: any) => void }) {
    const { foreground, background, gridColumns = 10, probabilityStatement, idPrefix = 'iconArray' } = parameters;

    const categories = [
        { color: 'blue', count: foreground.count, label: foreground.label },
        { color: 'grey', count: background.count, label: background.label },
    ];

    const renderIcon = (color: string, key: number) => (
        <img
            key={key}
            src={`${import.meta.env.BASE_URL}my-study/assets/square-${color}.svg`}
            alt={color}
            width={32}
            height={32}
        />
    );

    const renderedIcons: React.ReactNode[] = [];

    categories.forEach((category) => {
        for (let i = 0; i < category.count; i++) {
            const uniqueKey = renderedIcons.length;
            renderedIcons.push(renderIcon(category.color, uniqueKey));
        }
    });

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
                <div style={{ flex: '0 0 280px', height: '380px', backgroundColor: '#FAFAFA', padding: '1px 16px', borderRadius: '8px', marginTop: '16px' }}>
                    <h3 style={{ marginBottom: '0px', textAlign: 'left', lineHeight: 1.5 }}>Scenario</h3>
                    <p
                        style={{ marginTop: '4px', marginBottom: '16px', fontSize: '1.2rem', lineHeight: 1.5 }}
                        dangerouslySetInnerHTML={{ __html: probabilityStatement }}
                    />
                </div>
            )}

            {/* Column 2: Visualization */}
            <div style={{ width: `${gridColumns * 32 + (gridColumns - 1) * 4}px`, paddingTop: '16px' }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: `repeat(${gridColumns}, 32px)`,
                        gap: '4px',
                        justifyContent: 'center',
                    }}
                >
                    {renderedIcons}
                </div>
                {/* Icon Array Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                        <img
                            src={`${import.meta.env.BASE_URL}my-study/assets/square-blue.svg`}
                            alt="foreground"
                            width={20}
                            height={20}
                        />
                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0073AA' }}>{foreground.count}</span>
                        <span style={{ fontSize: '1.2rem' }}>out of 100 {foreground.label}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                        <img
                            src={`${import.meta.env.BASE_URL}my-study/assets/square-grey.svg`}
                            alt="background"
                            width={20}
                            height={20}
                        />
                        <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#8C8C8C' }}>{background.count}</span>
                        <span style={{ fontSize: '1.2rem' }}>out of 100 {background.label}</span>
                    </div>
                </div>
            </div>

            {/* Column 3: SAM */}
            <div style={{ flex: '0 1 auto', textAlign: 'left', marginTop: '-5px' }}>
                <p style={{ fontSize: '1rem', fontWeight: 500 }}>For each question, please select the figure or circle between two figures that best represents how you feel.</p>
                <SAM onChange={handleSAMChange} imageBasePath={`${import.meta.env.BASE_URL}my-study/assets/sam`} />
                {hasStarted && !allAnswered && (
                    <p style={{ color: 'red', marginTop: '0.75rem', fontWeight: 400 }}>
                        Please answer all questions to continue.
                    </p>
                )}
            </div>
        </div>
    );
}