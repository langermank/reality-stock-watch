import React from 'react';

import StockCard from '../components/StockCard.jsx';

export default {
    title: 'Components/StockCard',
    component: StockCard,
};

const Template = (args) => <StockCard {...args} />;

export const Default = Template.bind({});
Default.args = {
    name: 'Contestant',
};
