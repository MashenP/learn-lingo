import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useSession } from '../../context/useSession';
import { sendLessonRequest } from '../../firebase/lessonRequests';
import { errorMessage } from '../../utils/errorMessage';
import type { Teacher } from '../../types/teacher';
import Modal from '../Modal/Modal';
import formCss from '../AccountForms/AccountForms.module.css';
import css from './LessonBooking.module.css';

const reasons = [
    'Career and business',
    'Lesson for kids',
    'Living abroad',
    'Exams and coursework',
    'Culture, travel or hobby',
];
const schema = yup.object({
    name: yup
        .string()
        .trim()
        .max(100, 'Use no more than 100 characters.')
        .required('Full name is required.')
        .test(
            'full-name',
            'Enter your first name and surname. Hyphens and apostrophes are allowed.',
            (value) => {
                if (!value) return true;
                const parts = value.split(/\s+/);
                return (
                    parts.length >= 2 &&
                    parts.every((part) =>
                        /^[\p{L}\p{M}]+(?:['’ʼ\-‐‑][\p{L}\p{M}]+)*$/u.test(
                            part,
                        ),
                    )
                );
            },
        ),
    email: yup
        .string()
        .trim()
        .email('Enter a valid email address.')
        .max(254)
        .required('Email is required.'),
    phone: yup
        .string()
        .trim()
        .required('Phone number is required.')
        .matches(/^\+?[\d\s()-]{7,25}$/, 'Enter a valid phone number.')
        .test('digits', 'Use 7 to 15 digits.', (value) => {
            const length = value?.replace(/\D/g, '').length ?? 0;
            return length >= 7 && length <= 15;
        }),
    reason: yup
        .string()
        .oneOf(reasons, 'Choose a reason.')
        .required('Choose a reason.'),
});
type BookingValues = yup.InferType<typeof schema>;

interface LessonBookingProps {
    teacher: Teacher;
    onClose: () => void;
}

function LessonBooking({ teacher, onClose }: LessonBookingProps) {
    const { account } = useSession();
    const pending = useRef(false);
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<BookingValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: account?.name ?? '',
            email: account?.email ?? '',
            phone: '',
            reason: '',
        },
    });

    async function submit(values: BookingValues) {
        if (pending.current) return;
        pending.current = true;
        try {
            await sendLessonRequest(teacher.id, values);
            toast.success('Your trial lesson request has been saved.');
            onClose();
        } catch (error) {
            setError('root', { message: errorMessage(error) });
        } finally {
            pending.current = false;
        }
    }

    return (
        <Modal titleId="booking-title" onClose={onClose} wide>
            <h2 className={formCss.title} id="booking-title">
                Book trial lesson
            </h2>
            <p className={`${formCss.description} ${css.description}`}>
                Our experienced tutor will assess your current language level,
                discuss your learning goals, and tailor the lesson to your
                specific needs.
            </p>
            <div className={css.teacher}>
                <img src={teacher.avatar_url} alt="" width={44} height={44} />
                <div>
                    <p className={css.label}>Your teacher</p>
                    <p>
                        {teacher.name} {teacher.surname}
                    </p>
                </div>
            </div>
            <form
                className={formCss.form}
                onSubmit={(event) => {
                    void handleSubmit(submit)(event);
                }}
                noValidate
            >
                <fieldset
                    className={css.reasons}
                    aria-describedby={
                        errors.reason ? 'reason-error' : undefined
                    }
                >
                    <legend>
                        What is your main reason for learning{' '}
                        {teacher.languages.join(' or ')}?
                    </legend>
                    {reasons.map((reason) => (
                        <label key={reason}>
                            <input
                                type="radio"
                                value={reason}
                                {...register('reason')}
                            />
                            {reason}
                        </label>
                    ))}
                </fieldset>
                {errors.reason && (
                    <p className={formCss.error} id="reason-error">
                        {errors.reason.message}
                    </p>
                )}
                <div className={formCss.field}>
                    <label className="visuallyHidden" htmlFor="booking-name">
                        Full name
                    </label>
                    <input
                        className={formCss.input}
                        id="booking-name"
                        placeholder="Full Name"
                        autoComplete="name"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={
                            errors.name ? 'booking-name-error' : undefined
                        }
                        {...register('name')}
                    />
                    {errors.name && (
                        <p className={formCss.error} id="booking-name-error">
                            {errors.name.message}
                        </p>
                    )}
                </div>
                <div className={formCss.field}>
                    <label className="visuallyHidden" htmlFor="booking-email">
                        Email
                    </label>
                    <input
                        className={formCss.input}
                        id="booking-email"
                        placeholder="Email"
                        type="email"
                        autoComplete="email"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                            errors.email ? 'booking-email-error' : undefined
                        }
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className={formCss.error} id="booking-email-error">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div className={formCss.field}>
                    <label className="visuallyHidden" htmlFor="booking-phone">
                        Phone number
                    </label>
                    <input
                        className={formCss.input}
                        id="booking-phone"
                        placeholder="Phone number"
                        type="tel"
                        autoComplete="tel"
                        aria-invalid={Boolean(errors.phone)}
                        aria-describedby={
                            errors.phone ? 'booking-phone-error' : undefined
                        }
                        {...register('phone')}
                    />
                    {errors.phone && (
                        <p className={formCss.error} id="booking-phone-error">
                            {errors.phone.message}
                        </p>
                    )}
                </div>
                {errors.root && (
                    <p className={formCss.error} role="alert">
                        {errors.root.message}
                    </p>
                )}
                <button
                    className={`btn ${formCss.submit}`}
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Saving request…' : 'Book'}
                </button>
            </form>
        </Modal>
    );
}

export default LessonBooking;
