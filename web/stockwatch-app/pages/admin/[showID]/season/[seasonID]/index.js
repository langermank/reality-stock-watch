import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSeason } from 'backend/Shows';
import { useBackendContext } from 'backend/context';
import Button from 'components/Button';
import Input from 'components/Input';

const Season = () => {
    const router = useRouter();
    const { showID, seasonID } = router.query;
    const { season, nextWeekNumber, createWeek, deleteWeek, updateSeason } = useSeason(seasonID);
    const { isAdmin } = useBackendContext();

    const [formDirty, setFormDirty] = useState(false);
    const [name, setName] = useState('');
    const [shortName, setShortName] = useState('');
    const [nextMarketClose, setNextMarketClose] = useState('');
    const [nextMarketOpen, setNextMarketOpen] = useState('');
    const [contestantExtraTags, setContestantExtraTags] = useState('');
    const [startingBankBalance, setStartingBankBalance] = useState(0);
    const [weeklyBankIncrease, setWeeklyBankIncrease] = useState(0);
    const [status, setStatus] = useState('not started');
    const [marketStatus, setMarketStatus] = useState('closed');

    useEffect(() => {
        setFormDirty(false);
        setName(season.name);
        setShortName(season.shortName);
        setNextMarketClose(season.nextMarketClose || null);
        setNextMarketOpen(season.nextMarketOpen || null);
        setContestantExtraTags(season.contestantExtraTags || '');
        setStartingBankBalance(season.startingBankBalance || 0);
        setWeeklyBankIncrease(season.weeklyBankIncrease || 0);
        setStatus(season.status || 'not started');
        setMarketStatus(season.marketStatus || 'closed');
    }, [season]);

    useEffect(() => {
        setFormDirty(
            name != season.name ||
                shortName != season.shortName ||
                nextMarketClose != season.nextMarketClose ||
                nextMarketOpen != season.nextMarketOpen ||
                contestantExtraTags != season.contestantExtraTags ||
                startingBankBalance != season.startingBankBalance ||
                weeklyBankIncrease != season.weeklyBankIncrease ||
                status != season.status ||
                marketStatus != season.marketStatus
        );
    }, [
        name,
        shortName,
        nextMarketClose,
        nextMarketOpen,
        contestantExtraTags,
        startingBankBalance,
        weeklyBankIncrease,
        status,
        marketStatus,
    ]);

    function save() {
        updateSeason({
            name,
            shortName,
            nextMarketClose,
            nextMarketOpen,
            contestantExtraTags,
            startingBankBalance,
            weeklyBankIncrease,
            status,
            marketStatus,
        });
    }

    if (!season) return <h2>Loading...</h2>;
    let maxWeekNumber = 0;
    let weeks = [];
    for (const week of season.weeks) {
        const current = week.week == season.currentWeek ? '&nbsp;&nbsp;(Current)' : '';
        maxWeekNumber = Math.max(maxWeekNumber, week.week);
        weeks.push(
            <li key={week.week}>
                Week {week.week}:
                <Link
                    href={{
                        pathname: '/admin/[showID]/season/[seasonID]/week/[week]/ratings',
                        query: { showID, seasonID, week: week.week },
                    }}>
                    <a>Ratings</a>
                </Link>
                &nbsp;|&nbsp;
                <Link
                    href={{
                        pathname: '/admin/[showID]/season/[seasonID]/week/[week]/projections',
                        query: { showID, seasonID, week: week.week },
                    }}>
                    <a>Projections</a>
                </Link>
                {current}
            </li>
        );
    }

    // Logic in the "week closing" backend function should add the next week as soon as the
    // previous week is closed, so this button should only appear for the first week.  We
    // should consider whether or not the first week should be handled automatically as well.
    //
    let addWeekButton = <></>;
    let marketStatusSelector = <>{season.marketStatus}</>;
    let statusSelector = <>{season.status}</>;
    if (isAdmin && nextWeekNumber > maxWeekNumber) {
        addWeekButton = <Button onClick={createWeek}>Create week #{nextWeekNumber}</Button>;
    }
    if (isAdmin) {
        marketStatusSelector = (
            <select onChange={(e) => setMarketStatus(e.target.value)} value={marketStatus}>
                <option value="closed" default>
                    Closed
                </option>
                <option value="open">Open</option>
            </select>
        );
        statusSelector = (
            <select onChange={(e) => setStatus(e.target.value)} value={status}>
                <option value="not started" default>
                    Not Started
                </option>
                <option value="active">Active</option>
                <option value="ended">Ended</option>
            </select>
        );
    }

    return (
        <>
            <h2>
                Season Name: <Input value={name || ''} onChange={(e) => setName(e.target.value)} />
            </h2>
            <p>
                Short name:{' '}
                <Input value={shortName || ''} onChange={(e) => setShortName(e.target.value)} />
            </p>
            <p>
                Next market open:{' '}
                <Input
                    value={nextMarketOpen || ''}
                    onChange={(e) => setNextMarketOpen(e.target.value)}
                />
            </p>
            <p>
                Next market close:{' '}
                <Input
                    value={nextMarketClose || ''}
                    onChange={(e) => setNextMarketClose(e.target.value)}
                />
            </p>
            <p>
                Vanity tags:{' '}
                <Input
                    value={JSON.stringify(contestantExtraTags) || ''}
                    onChange={(e) => setContestantExtraTags(JSON.parse(e.target.value))}
                />
            </p>
            <p>
                Starting bank balance:{' '}
                <Input
                    value={startingBankBalance || 0}
                    onChange={(e) => setStartingBankBalance(e.target.value)}
                />
            </p>
            <p>
                Weekly bank increase:{' '}
                <Input
                    value={weeklyBankIncrease || 0}
                    onChange={(e) => setWeeklyBankIncrease(e.target.value)}
                />
            </p>
            <p>Season Status: {statusSelector}</p>
            <p>Market Status: {marketStatusSelector}</p>
            <Button disabled={!formDirty} onClick={save}>
                Save
            </Button>
            <p>Current week: {season.currentWeek}</p>
            <p>Last price calculation: {season.lastBatchUpdate}</p>
            <ul>{weeks}</ul>
            {addWeekButton}
            <p>
                <Link
                    href={{
                        pathname: '/admin/[showID]/season/[seasonID]/contestants',
                        query: { showID, seasonID },
                    }}>
                    Contestants
                </Link>{' '}
            </p>
        </>
    );
};

export default Season;
