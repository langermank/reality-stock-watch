import { useBackendContext } from 'backend/context';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import inputStyles from '../styles/components/input.module.scss';
import styles from '../styles/settings.module.scss';
import Button from './Button.jsx';
import clsx from 'clsx';

const EditProfile = ({ display }) => {
    const { profile, updateDisplayName, profileDisplayNameSet } = useBackendContext();
    function validate(values) {
        const errors = {};
        if (values.displayName.length == 0) {
            errors.displayName = 'Cannot be blank';
        } else if (/\s/g.test(values.displayName)) {
            errors.displayName = 'Remove spaces';
        }
        return errors;
    }
    function onSubmit(values, { setSubmitting }) {
        updateDisplayName(values.displayName);
        setSubmitting(false);
    }

    if (!display) return <></>;
    return (
        <div key="edit-profile">
            <Formik
                initialValues={{ displayName: profileDisplayNameSet ? profile.displayName : '' }}
                validate={validate}
                onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className={styles.displayNameForm}>
                        <label htmlFor="edit-displayname" className={inputStyles.label}>
                            Choose a display name for the leaderboard
                            <p className={inputStyles.hint}>
                                Cannot contain spaces. Offensive language will be removed.
                            </p>
                        </label>

                        <span className={styles.fieldWrap}>
                            <Field name="displayName">
                                {({
                                    field, // { name, value, onChange, onBlur }
                                    meta,
                                }) => (
                                    <div>
                                        <input
                                            type="text"
                                            id="edit-displayname"
                                            className={clsx(
                                                inputStyles.input,
                                                inputStyles.inlineWidth,
                                                meta.error && inputStyles.invalid
                                            )}
                                            {...field}
                                        />

                                        {meta.error && (
                                            <p className={inputStyles.invalidMessage}>
                                                {meta.error}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </Field>
                            <Button type="submit" disabled={isSubmitting} variant="secondary">
                                Save
                            </Button>
                        </span>

                        {/* <ErrorMessage
                            name="displayName"
                            component="div"
                            className={inputStyles.invalid}
                        /> */}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditProfile;
