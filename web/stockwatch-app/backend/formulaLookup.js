import { sortedIndexBy } from 'lodash';

const lookup_table = [
    {
        from: 1,
        penalty: 2.5,
        bonus: 0.0,
        multiplier: 0.6,
        to: 1,
    },
    {
        from: 1,
        penalty: 1.5,
        bonus: 0.0,
        multiplier: 1.16,
        to: 2,
    },
    {
        from: 1,
        penalty: 1.5,
        bonus: 0.0,
        multiplier: 1.26,
        to: 3,
    },
    {
        from: 1,
        penalty: 1.5,
        bonus: 0.0,
        multiplier: 1.41,
        to: 4,
    },
    {
        from: 1,
        penalty: 0.1,
        bonus: 0.0,
        multiplier: 1.66,
        to: 5,
    },
    {
        from: 1,
        penalty: 0.1,
        bonus: 0.0,
        multiplier: 2.05,
        to: 6,
    },
    {
        from: 1,
        penalty: 0.1,
        bonus: 0.0,
        multiplier: 2.68,
        to: 7,
    },
    {
        from: 1,
        penalty: 0.1,
        bonus: 0.0,
        multiplier: 3.68,
        to: 8,
    },
    {
        from: 1,
        penalty: 0.1,
        bonus: 0.0,
        multiplier: 5.29,
        to: 9,
    },
    {
        from: 1,
        penalty: 0.1,
        bonus: 0.0,
        multiplier: 7.87,
        to: 10,
    },
    {
        from: 2,
        penalty: 1.75,
        bonus: 0.0,
        multiplier: 0.68,
        to: 1,
    },
    {
        from: 2,
        penalty: 1.75,
        bonus: 0.0,
        multiplier: 0.8,
        to: 2,
    },
    {
        from: 2,
        penalty: 1.0,
        bonus: 0.0,
        multiplier: 1.16,
        to: 3,
    },
    {
        from: 2,
        penalty: 1.0,
        bonus: 0.0,
        multiplier: 1.26,
        to: 4,
    },
    {
        from: 2,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 1.41,
        to: 5,
    },
    {
        from: 2,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 1.66,
        to: 6,
    },
    {
        from: 2,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 2.05,
        to: 7,
    },
    {
        from: 2,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 2.68,
        to: 8,
    },
    {
        from: 2,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 3.68,
        to: 9,
    },
    {
        from: 2,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 5.29,
        to: 10,
    },
    {
        from: 3,
        penalty: 0.75,
        bonus: 0.0,
        multiplier: 0.63,
        to: 1,
    },
    {
        from: 3,
        penalty: 0.75,
        bonus: 0.0,
        multiplier: 0.72,
        to: 2,
    },
    {
        from: 3,
        penalty: 0.75,
        bonus: 0.0,
        multiplier: 0.9,
        to: 3,
    },
    {
        from: 3,
        penalty: 0.75,
        bonus: 0.0,
        multiplier: 1.16,
        to: 4,
    },
    {
        from: 3,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 1.21,
        to: 5,
    },
    {
        from: 3,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 1.33,
        to: 6,
    },
    {
        from: 3,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 1.53,
        to: 7,
    },
    {
        from: 3,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 1.85,
        to: 8,
    },
    {
        from: 3,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 2.36,
        to: 9,
    },
    {
        from: 3,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 3.18,
        to: 10,
    },
    {
        from: 4,
        penalty: 0.75,
        bonus: 0.0,
        multiplier: 0.56,
        to: 1,
    },
    {
        from: 4,
        penalty: 0.75,
        bonus: 0.0,
        multiplier: 0.67,
        to: 2,
    },
    {
        from: 4,
        penalty: 0.75,
        bonus: 0.0,
        multiplier: 0.8,
        to: 3,
    },
    {
        from: 4,
        penalty: 0.75,
        bonus: 0.0,
        multiplier: 1.0,
        to: 4,
    },
    {
        from: 4,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 1.16,
        to: 5,
    },
    {
        from: 4,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 1.26,
        to: 6,
    },
    {
        from: 4,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 1.41,
        to: 7,
    },
    {
        from: 4,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 1.66,
        to: 8,
    },
    {
        from: 4,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 2.05,
        to: 9,
    },
    {
        from: 4,
        penalty: 0.2,
        bonus: 0.0,
        multiplier: 2.68,
        to: 10,
    },
    {
        from: 5,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.41,
        to: 1,
    },
    {
        from: 5,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.51,
        to: 2,
    },
    {
        from: 5,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.64,
        to: 3,
    },
    {
        from: 5,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.8,
        to: 4,
    },
    {
        from: 5,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 1.0,
        to: 5,
    },
    {
        from: 5,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 1.2,
        to: 6,
    },
    {
        from: 5,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 1.32,
        to: 7,
    },
    {
        from: 5,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 1.51,
        to: 8,
    },
    {
        from: 5,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 1.82,
        to: 9,
    },
    {
        from: 5,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 2.31,
        to: 10,
    },
    {
        from: 6,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.34,
        to: 1,
    },
    {
        from: 6,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.43,
        to: 2,
    },
    {
        from: 6,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.54,
        to: 3,
    },
    {
        from: 6,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.67,
        to: 4,
    },
    {
        from: 6,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.84,
        to: 5,
    },
    {
        from: 6,
        penalty: 0.0,
        bonus: 0.3,
        multiplier: 1.0,
        to: 6,
    },
    {
        from: 6,
        penalty: 0.0,
        bonus: 0.3,
        multiplier: 1.16,
        to: 7,
    },
    {
        from: 6,
        penalty: 0.0,
        bonus: 0.3,
        multiplier: 1.27,
        to: 8,
    },
    {
        from: 6,
        penalty: 0.0,
        bonus: 0.3,
        multiplier: 1.46,
        to: 9,
    },
    {
        from: 6,
        penalty: 0.0,
        bonus: 0.3,
        multiplier: 1.79,
        to: 10,
    },
    {
        from: 7,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.29,
        to: 1,
    },
    {
        from: 7,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.36,
        to: 2,
    },
    {
        from: 7,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.45,
        to: 3,
    },
    {
        from: 7,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.56,
        to: 4,
    },
    {
        from: 7,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.7,
        to: 5,
    },
    {
        from: 7,
        penalty: 0.0,
        bonus: 0.3,
        multiplier: 0.87,
        to: 6,
    },
    {
        from: 7,
        penalty: 0.0,
        bonus: 0.6,
        multiplier: 1.0,
        to: 7,
    },
    {
        from: 7,
        penalty: 0.0,
        bonus: 0.6,
        multiplier: 1.16,
        to: 8,
    },
    {
        from: 7,
        penalty: 0.0,
        bonus: 0.6,
        multiplier: 1.27,
        to: 9,
    },
    {
        from: 7,
        penalty: 0.0,
        bonus: 0.6,
        multiplier: 1.46,
        to: 10,
    },
    {
        from: 8,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.24,
        to: 1,
    },
    {
        from: 8,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.29,
        to: 2,
    },
    {
        from: 8,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.37,
        to: 3,
    },
    {
        from: 8,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.46,
        to: 4,
    },
    {
        from: 8,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.58,
        to: 5,
    },
    {
        from: 8,
        penalty: 0.0,
        bonus: 0.3,
        multiplier: 0.72,
        to: 6,
    },
    {
        from: 8,
        penalty: 0.0,
        bonus: 0.6,
        multiplier: 0.9,
        to: 7,
    },
    {
        from: 8,
        penalty: 0.0,
        bonus: 0.9,
        multiplier: 1.0,
        to: 8,
    },
    {
        from: 8,
        penalty: 0.0,
        bonus: 0.9,
        multiplier: 1.16,
        to: 9,
    },
    {
        from: 8,
        penalty: 0.0,
        bonus: 0.9,
        multiplier: 1.27,
        to: 10,
    },
    {
        from: 9,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.19,
        to: 1,
    },
    {
        from: 9,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.24,
        to: 2,
    },
    {
        from: 9,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.3,
        to: 3,
    },
    {
        from: 9,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.38,
        to: 4,
    },
    {
        from: 9,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.47,
        to: 5,
    },
    {
        from: 9,
        penalty: 0.0,
        bonus: 0.3,
        multiplier: 0.59,
        to: 6,
    },
    {
        from: 9,
        penalty: 0.0,
        bonus: 0.6,
        multiplier: 0.74,
        to: 7,
    },
    {
        from: 9,
        penalty: 0.0,
        bonus: 0.9,
        multiplier: 0.92,
        to: 8,
    },
    {
        from: 9,
        penalty: 0.0,
        bonus: 1.5,
        multiplier: 1.0,
        to: 9,
    },
    {
        from: 9,
        penalty: 0.0,
        bonus: 1.5,
        multiplier: 1.16,
        to: 10,
    },
    {
        from: 10,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.16,
        to: 1,
    },
    {
        from: 10,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.2,
        to: 2,
    },
    {
        from: 10,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.25,
        to: 3,
    },
    {
        from: 10,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.31,
        to: 4,
    },
    {
        from: 10,
        penalty: 0.0,
        bonus: 0.0,
        multiplier: 0.39,
        to: 5,
    },
    {
        from: 10,
        penalty: 0.0,
        bonus: 0.3,
        multiplier: 0.49,
        to: 6,
    },
    {
        from: 10,
        penalty: 0.0,
        bonus: 0.6,
        multiplier: 0.61,
        to: 7,
    },
    {
        from: 10,
        penalty: 0.0,
        bonus: 0.9,
        multiplier: 0.76,
        to: 8,
    },
    {
        from: 10,
        penalty: 0.0,
        bonus: 1.5,
        multiplier: 0.95,
        to: 9,
    },
    {
        from: 10,
        penalty: 0.0,
        bonus: 2.5,
        multiplier: 1.0,
        to: 10,
    },
];

function lookup(from, to) {
    console.log('lookup', from, to);
    const index = sortedIndexBy(
        lookup_table,
        { from, to },
        ({ from, to }) => (from - 1) * 10 + to - 1
    );
    if (!index) {
        console.log('did not find');
    } else {
        console.log('found ', index);
    }
    return lookup_table[index];
}

export default lookup;
