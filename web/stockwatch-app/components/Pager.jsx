/* eslint-disable react/prop-types */
import { ArrowLeft, ArrowRight } from 'phosphor-react';
import Button from 'components/Button.jsx';

const Pager = ({ table, styles }) => (
    <div className={styles.pagination}>
        <Button
            icon={<ArrowLeft weight="fill" />}
            iconOnly
            onClick={() => table.gotoPage(0)}
            disabled={!table.canPreviousPage}>
            First page
        </Button>
        <Button
            icon={<ArrowLeft weight="regular" />}
            iconOnly
            onClick={() => table.previousPage()}
            disabled={!table.canPreviousPage}>
            Previous page
        </Button>
        <p>
            Page{' '}
            <strong>
                {table.state.pageIndex + 1} of {table.pageCount}
            </strong>
        </p>
        <Button
            icon={<ArrowRight weight="regular" />}
            iconOnly
            onClick={() => table.nextPage()}
            disabled={!table.canNextPage}>
            Next page
        </Button>
        <Button
            icon={<ArrowRight weight="fill" />}
            iconOnly
            onClick={() => table.gotoPage(table.pageCount - 1)}
            disabled={!table.canNextPage}>
            Last page
        </Button>
    </div>
);

export default Pager;
