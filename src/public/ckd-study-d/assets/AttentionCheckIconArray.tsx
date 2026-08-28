import React from 'react';
import AttentionCheckSAM from './AttentionCheckSAM';

export default function AttentionCheckIconArray({ parameters, setAnswer }: { parameters: any; setAnswer: (answer: any) => void }) {
    const {
        foreground,
        background,
        gridColumns = 10,
        probabilityStatement,
        idPrefix = 'attention-check',
        valenceTarget,
        arousalTarget,
        dominanceTarget,
    } = parameters;

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
            {/* Column 1: Scenario (attention check instruction) */}
            <div style={{ flex: '0 0 280px', paddingTop: '16px', height: '420px', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ marginBottom: '16px', textAlign: 'left', lineHeight: 1.5, marginTop: 0, paddingLeft: '16px' }}>Scenario</h3>
                <div style={{ backgroundColor: '#FAFAFA', padding: '16px', borderRadius: '8px', flexGrow: 1 }}>
                    <p
                        style={{ margin: 0, fontSize: '1.2rem', lineHeight: 1.5 }}
                        dangerouslySetInnerHTML={{ __html: probabilityStatement }}
                    />
                </div>
            </div>

            {/* Column 2: Visualization */}
            <div style={{ width: `${gridColumns * 32 + (gridColumns - 1) * 4}px`, paddingTop: '16px' }}>
                <h3 style={{ marginBottom: '16px', textAlign: 'left', lineHeight: 1.5, marginTop: 0 }}>Chart</h3>
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
            </div>

            {/* Column 3: Attention Check SAM */}
            <div style={{ flex: '0 1 auto', textAlign: 'left', paddingTop: '16px' }}>
                <h3 style={{ marginBottom: '8px', textAlign: 'left', lineHeight: 1.5, marginTop: 0 }}>Questions</h3>
                <p style={{ fontSize: '1rem', fontWeight: 400, marginTop: 0, marginBottom: '8px' }}>For each question, please rate the chart with the number specified for the attention check.</p>
                <AttentionCheckSAM
                    onChange={handleSAMChange}
                    imageBasePath={`${import.meta.env.BASE_URL}my-study/assets/sam`}
                    valenceTarget={valenceTarget}
                    arousalTarget={arousalTarget}
                    dominanceTarget={dominanceTarget}
                />
                {hasStarted && !allAnswered && (
                    <p style={{ color: 'red', marginTop: '0.6rem', fontWeight: 400 }}>
                        Please answer all questions to continue.
                    </p>
                )}
            </div>
        </div>
    );
}
