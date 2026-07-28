import React from 'react';
import SAM from './SAM';

export default function IconArray({ parameters, setAnswer }: { parameters: any; setAnswer: (answer: any) => void }) {
    const { foreground, background, gridColumns = 10, probabilityStatement, idPrefix = 'iconArray' } = parameters;

    const categories = [
        { color: 'black', count: foreground.count, label: foreground.label },
        { color: 'grey', count: background.count, label: background.label },
    ];

    const renderIcon = (color: string, key: number) => (
        <img
            key={key}
            src={`${import.meta.env.BASE_URL}my-study/assets/square-${color}.svg`}
            alt={color}
            width={36}
            height={36}
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
        <div>
            {probabilityStatement && (
                <div style={{ margin: '4px ', backgroundColor: '#FAFAFA', padding: '1px 12px', borderRadius: '8px' }}>
                    <h4 style={{ marginBottom: '2px', textAlign: 'left', lineHeight: 1.1 }}>Scenario</h4>
                    <p style={{ marginBottom: '16px', fontSize: '1rem', lineHeight: 1.2 }}>
                        {probabilityStatement}
                    </p>
                </div>
            )}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${gridColumns}, 36px)`,
                    gap: '6px',
                    justifyContent: 'center',
                    maxWidth: '480px',
                    margin: '20px auto',
                }}
            >
                {renderedIcons}
            </div>

            <div
                style={{
                    display: 'flex',
                    gap: '24px',
                    justifyContent: 'center',
                    maxWidth: '840px',
                    margin: '12px auto 0',
                    fontSize: '0.9rem',
                }}
            >
                {categories.map((cat) => (
                    <div key={cat.color} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}>
                        <img
                            src={`${import.meta.env.BASE_URL}my-study/assets/square-${cat.color}.svg`}
                            alt={cat.color}
                            width={20}
                            height={20}
                        />
                        <span>{cat.label}</span>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '40px', textAlign: 'left' }}>
                <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
                    Please rate your personal reaction to the visualization you see above.
                    For each question, select the figure that best represents how you felt.
                    <span style={{ color: 'red' }}> *</span>
                </p>
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