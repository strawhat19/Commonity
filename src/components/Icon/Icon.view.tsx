import styles from './Icon.styles';
import type { IconProps } from './Icon';
import Ionicons from '@expo/vector-icons/Ionicons';
import { elementProps } from '../../shared/elementProps';

export default function IconView({ id, name, size, color }: IconProps) {
    return (
        <Ionicons
            size={size}
            name={name}
            color={color}
            accessible={false}
            style={styles.icon}
            {...elementProps(`commonity-icon`, id)}
        />
    );
}
