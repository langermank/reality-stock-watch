import clsx from 'clsx';
import { Star } from 'phosphor-react';
import styles from '../styles/leaderboard.module.scss';

const Leaderboard = () => {
    return (
        <div className={styles.leaderGrid}>
            {/* <label className={styles.labelHidden}>Filter by Name:</label>
        <form method="GET">
            <input
                class="input inline-width input-light mg-btm-md"
                placeholder="Search user..."
                name="search"
                :value="search"
            />
            <input type="hidden" name="page" value="1" />
            <button type="submit" class="button-base primary mg-btm-lg">
                Search
            </button>
        </form> */}
            <div className={styles.leaderOverflow}>
                <div className={styles.tableWrap}>
                    <table className={styles.leaderboardTable}>
                        <thead>
                            <tr>
                                <th className={styles.rankSort}>Rank</th>
                                <th className={styles.userRowHead}>Player</th>
                                <th>Networth</th>
                                <th>
                                    <img
                                        src="/"
                                        alt=""
                                        className={styles.hgImgTable}
                                        height="30"
                                        width="30"
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className={styles.rankNum}>rank</div>
                                </td>
                                <td className="user-row-wrap">
                                    <a href="/" className={styles.userRow}>
                                        {/* <avatar
                                        :user="leaderboard.user"
                                        height="25"
                                        width="25"
                                        class="leaderboard-avatar"
                                    ></avatar> */}
                                        <span>username</span>
                                        {/* <badge
                                        v-for="badge in leaderboard.user.badges"
                                        :badge="badge"
                                        :key="badge.name"
                                        v-tooltip="badge.name"
                                        width="35"
                                        height="35"
                                        customClass="leaderboard-badge"
                                    ></badge> */}
                                    </a>
                                </td>
                                <td className={styles.networth}>$$</td>
                                <td>houseguest</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* <smart-pagination
            :currentPage.sync="currentPage"
            :totalPages="totalPages"
            :maxPageLinks="8"
        /> */}
        </div>
    );
};

export default Leaderboard;
