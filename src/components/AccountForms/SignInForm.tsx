import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useSession } from '../../context/useSession';
import { errorMessage } from '../../utils/errorMessage';
import PasswordInput from './PasswordInput';
import css from './AccountForms.module.css';

const schema = yup.object({
    email: yup
        .string()
        .trim()
        .email('Enter a valid email address.')
        .max(254)
        .required('Email is required.'),
    password: yup.string().required('Password is required.'),
});
type SignInValues = yup.InferType<typeof schema>;

function SignInForm() {
    const { signIn, openAccount } = useSession();
    const {
        register,
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<SignInValues>({ resolver: yupResolver(schema) });

    async function submit(values: SignInValues) {
        try {
            await signIn(values.email, values.password);
            openAccount(null);
            toast.success('Welcome back!');
        } catch (error) {
            setError('root', { message: errorMessage(error) });
        }
    }

    return (
        <>
            <h2 className={css.title} id="account-title">
                Log in
            </h2>
            <p className={css.description}>
                Welcome back! Please enter your credentials to access your
                account and continue your search for a teacher.
            </p>
            <form
                className={css.form}
                onSubmit={handleSubmit(submit)}
                noValidate
            >
                <div className={css.field}>
                    <label className="visuallyHidden" htmlFor="signin-email">
                        Email
                    </label>
                    <input
                        className={css.input}
                        id="signin-email"
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
                    {isSubmitting ? 'Logging in…' : 'Log in'}
                </button>
            </form>
            <p className={css.switch}>
                New to LearnLingo?{' '}
                <button type="button" onClick={() => openAccount('signup')}>
                    Create an account
                </button>
            </p>
        </>
    );
}

export default SignInForm;
