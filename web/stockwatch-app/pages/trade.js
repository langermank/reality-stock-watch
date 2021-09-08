import dynamic from 'next/dynamic';
const Trade = dynamic(() => import('components/Trade'));

function trade() {
    return <Trade></Trade>;
}

export default trade;
