import { useState } from 'react';
import css from './Avatar.module.css';

interface AvatarProps {
    src: string;
    name: string;
    small?: boolean;
}

function Avatar({ src, name, small = false }: AvatarProps) {
    const [failed, setFailed] = useState(false);
    const className = `${css.avatar} ${small ? css.small : ''}`;
    if (failed) {
        return (
            <span className={className} role="img" aria-label={name}>
                {name
                    .split(' ')
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join('')}
            </span>
        );
    }
    return (
        <img
            className={className}
            src={src}
            alt={name}
            width={small ? 44 : 96}
            height={small ? 44 : 96}
            loading="lazy"
            onError={() => setFailed(true)}
        />
    );
}

export default Avatar;
