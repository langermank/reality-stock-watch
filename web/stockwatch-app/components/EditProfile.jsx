import { useBackendContext } from 'backend/context';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const EditProfile = ({ display }) => {
    const { profile, updateDisplayName, profileDisplayNameSet } = useBackendContext();
    function validate(values) {
        const errors = {};
        if (values.displayName.length == 0) {
            errors.displayName = 'Please provide an alias';
        } else if (/\s/g.test(values.displayName)) {
            errors.displayName = 'No spaces please';
        }
        return errors;
    }
    function onSubmit(values, { setSubmitting }) {
        updateDisplayName(values.displayName);
        setSubmitting(false);
    }

    if (!display) return '';
    return (
        <div key="edit-profile">
            <h2>Profile</h2>
            <p>Please choose an alias that doesn&apos;t have spaces.</p>
            <Formik
                initialValues={{ displayName: profileDisplayNameSet ? profile.displayName : '' }}
                validate={validate}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="displayName" />
                        <ErrorMessage name="displayName" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditProfile;
