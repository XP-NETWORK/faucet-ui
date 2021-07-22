import { XPButton, XPButtonText } from './StyledComponents'

/**
 * The button that triggers liquidity transfer
 * @param {Event} onClick param
 * @returns a JSX button
 */
const SendButton = ({ onClick, inactive }) => {

    return (
        <XPButton
            onClick={onClick}
            disabled={inactive}
        >
            <XPButtonText
                disabled={inactive}
            >
                {
                    inactive
                    ? 'Sending'
                    : 'Send'
                }
            </XPButtonText>
        </XPButton>
    )
}

export default SendButton;