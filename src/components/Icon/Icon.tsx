import IconView from './Icon.view';
import { useTheme } from '../../shared/ThemeContext';
import type { ComponentProps } from 'react';
import type Ionicons from '@expo/vector-icons/Ionicons';

export type IconProps = {
    id: string;
    size?: number;
    color?: string;
    name: ComponentProps<typeof Ionicons>[`name`];
};

export default function Icon({ id, name, size = 20, color }: IconProps) {
    const { palette } = useTheme();

    return (
        <IconView
            id={id}
            name={name}
            size={size}
            color={color ?? palette.ink}
        />
    );
}
