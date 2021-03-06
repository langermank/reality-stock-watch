/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from '../styles/components/input.module.scss';
//import { useAsyncDebounce } from 'react-table';

function GlobalFilter({ globalFilter, setGlobalFilter }) {
    const [value, setValue] = useState(globalFilter);

    return (
        <span>
            <label htmlFor="search-all-time" className={styles.label}>
                Search
            </label>
            <input
                id="search-all-time"
                value={value || ''}
                onChange={(e) => {
                    setValue(e.target.value);
                    setGlobalFilter(e.target.value);
                }}
                className={styles.input}
                placeholder={`Search players`}
            />
        </span>
    );
}

const FilterRow = ({ table }) => (
    <tr>
        <th
            colSpan={table.visibleColumns.length}
            style={{
                textAlign: 'left',
            }}>
            <GlobalFilter
                preGlobalFilteredRows={table.preGlobalFilteredRows}
                globalFilter={table.state.globalFilter}
                setGlobalFilter={
                    (value) => table.setGlobalFilter(value || undefined)
                    /*useAsyncDebounce(
                    (value) => table.setGlobalFilter(value || undefined),
                    200
                    )
                    */
                }
            />
        </th>
    </tr>
);

export { FilterRow };
export default GlobalFilter;
