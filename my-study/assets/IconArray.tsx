import React from 'react';

const IconGrey = () =>
    <img src="/my-study/assets/design-a-grey.svg" alt="S Icon Unaffected" width="48" height="48" />

const IconBlack = () =>
    <img src="/my-study/assets/design-a-black.svg" alt="S Icon Affected" width="48" height="48" />

const color: { [key: string]: React.FC } = {
    grey: IconGrey,
    black: IconBlack,
};

const renderIcon = (colorName: string, key: number) => {
    const SelectedIcon = color[colorName] || color.grey;
    return <SelectedIcon key={key} />;
};

export default function IconArray({ parameters }: { parameters: any }) {
    const { categories = [], gridColumns = 10 } = parameters;

    const renderedIcons: React.ReactNode[] = [];

    categories.forEach((category: any) => {
        for (let i = 0; i < category.count; i++) {
            const uniqueKey = renderedIcons.length;
            renderedIcons.push(renderIcon(category.color, uniqueKey));
        }
    });

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${gridColumns}, 1fr)`,
                gap: '8px',
                margin: '16px auto'
            }}
        >
            {renderedIcons}
        </div>
    );
}