import { MessageType, showMessage } from 'react-native-flash-message';

const MESSAGE_DURATION = 3000;
const MESSAGE_STYLE = { borderRadius: 20 };

interface DisplayMessage {
  message: string;
  description?: string;
  type: MessageType;
  floating?: boolean;
}

export const DisplayMessage = ({
  message,
  description = '',
  type,
  floating = true,
}: DisplayMessage) => {
  return showMessage({
    message,
    description,
    duration: MESSAGE_DURATION,
    type,
    floating,
    style: MESSAGE_STYLE,
  });
};
