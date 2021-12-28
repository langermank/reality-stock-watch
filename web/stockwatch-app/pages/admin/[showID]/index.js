import { useRouter } from 'next/router';
import Link from 'next/link';
import { useShow } from 'backend/Shows';
import { useBackendContext } from 'backend/context';
import { useState } from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function toISODate(date) {
    const year = date.getFullYear();
    const month = ('0' + date.getMonth()).slice(-2);
    const day = date.getDate();
    return `${year}-${month}-${day}`;
}

const Show = () => {
    const router = useRouter();
    const { showID } = router.query;
    const { isAdmin } = useBackendContext();
    const { show, createSeason, deleteSeason } = useShow(showID);

    function validate(values) {
        const errors = {};
        if (values.name.length == 0) {
            errors.name = 'Please provide a season name.';
        }
        if (values.shortName.length == 0) {
            errors.shortName = 'Please provide a short name.';
        }
        if (/\s/g.test(values.displayName)) {
            errors.shortName = 'Please provide a short name.';
        } else if (
            !/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(values.startDate)
        ) {
            errors.startDate = 'Start date should be YYYY-MM-DD';
        }
        return errors;
    }

    const seasons = show.seasons.map((season) => {
        let del = <></>;
        if (isAdmin && season.status && season.status == 'not started') {
            del = <Button onClick={() => deleteSeason(season.id)}>X</Button>;
        }

        return (
            <li key={season.id}>
                <Link
                    href={{
                        pathname: '/admin/[showID]/season/[seasonId]',
                        query: { showID, seasonId: season.id },
                    }}>
                    <a>{season.name}</a>
                </Link>
                {del}
            </li>
        );
    });

    function onSubmit(values, { setSubmitting }) {
        createSeason(values);
        setSubmitting(false);
    }
    if (isAdmin) {
        seasons.push(
            <li key="create">
                <div key="add-season">
                    <h2>Add Season</h2>
                    <Formik
                        initialValues={{
                            name: '',
                            shortName: '',
                            startDate: new Date().toISOString().split('T')[0],
                        }}
                        validate={validate}
                        onSubmit={onSubmit}>
                        {({ isSubmitting }) => (
                            <Form>
                                <Field placeholder="Name" type="text" name="name" />
                                <ErrorMessage name="name" component="div" />
                                <Field placeholder="Short Name" type="text" name="shortName" />
                                <ErrorMessage name="shortName" component="div" />
                                <Field placeholder="Start Date" type="text" name="startDate" />
                                <ErrorMessage name="startDate" component="div" />
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </li>
        );
    }

    return (
        <>
            <h2>{show.name}</h2>
            <ul>{seasons}</ul>
        </>
    );
};
export default Show;
