import * as React from 'react';
import { type MessageDescriptor } from 'react-intl';
import { HintProps } from '../Hint';
import { BlocksEditor } from './BlocksEditor';
interface BlocksInputProps extends React.ComponentPropsWithoutRef<typeof BlocksEditor>, Pick<HintProps, 'hint'> {
    intlLabel: MessageDescriptor;
    attribute: {
        type: string;
        [key: string]: unknown;
    };
    description?: MessageDescriptor;
    labelAction?: React.ReactNode;
    required?: boolean;
}
declare const BlocksInput: React.ForwardRefExoticComponent<BlocksInputProps & React.RefAttributes<{
    focus: () => void;
}>>;
export { BlocksInput };
