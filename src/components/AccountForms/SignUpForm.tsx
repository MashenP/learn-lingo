import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useSession } from '../../context/useSession';
import { errorMessage } from '../../utils/errorMessage';
import PasswordInput from './PasswordInput';
import css from './AccountForms.module.css';

const schema = yup.object({
    name: yup
        .string()
        .trim()
        .min(2, 'Enter at least 2 characters.')
        .max(100)
        .required('Name is required.'),
    email: yup
        .string()
        .trim()
        .email('Enter a valid email address.')
        .max(254)
        .required('Email is required.'),
    password: yup
        .string()
        .min(6, 'Use at least 6 characters.')
        .max(128)
        .required('Password is required.'),
});
type SignUpValues = yup.InferType<typeof schema>;

function SignUpForm() {
    const { signUp, openAccount } = useSession();
    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignUpValues>({ resolver: yupResolver(schema) });

    async function submit(values: SignUpValues) {
        try {
            await signUp(values.name, values.email, values.password);
            openAccount(null);
            toast.success('Your account is ready!');
        } catch (error) {
            setError('root', { message: errorMessage(error) });
        }
    }

    return (
        <>
            <h2 className={css.title} id="account-title">
                Registration
            </h2>
            <p className={css.description}>
                Thank you for your interest in our platform! In order to
                register, we need some information. Please provide us with the
                following information
            </p>
            <form
                className={css.form}
                onSubmit={handleSubmit(submit)}
                noValidate
            >
                <div className={css.field}>
                    <label className="visuallyHidden" htmlFor="signup-name">
                        Name
                    </label>
                    <input
                        className={css.input}
                        id="signup-name"
                        autoComplete="name"
                        placeholder="Name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                            errors.name ? 'name-error' : undefined
                        }
                        {...register('name')}
                    />
                    {errors.name && (
                        <p className={css.error} id="name-error">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div className={css.field}>
                    <label className="visuallyHidden" htmlFor="signup-email">
                        Email
                    </label>
                    <input
                        className={css.input}
                        id="signup-email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                            errors.email ? 'email-error' : undefined
                        }
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className={css.error} id="email-error">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <PasswordInput
                    control={control}
                    name="password"
                    error={errors.password?.message}
                    creating
                />
                {errors.root && (
                    <p className={css.error} role="alert">
                        {errors.root.message}
                    </p>
                )}
                <button
                    className={`btn ${css.submit}`}
                    disabled={isSubmitting}
                    type="submit"
                >
                    {isSubmitting ? 'Creating account…' : 'Sign up'}
                </button>
            </form>
            <p className={css.switch}>
                Already registered?{' '}
                <button type="button" onClick={() => openAccount('signin')}>
                    Log in
                </button>
            </p>
        </>
    );
}

export default SignUpForm;
