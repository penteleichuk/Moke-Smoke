import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { NavigationStackLists } from 'shared/config/navigation';

export const useAppNavigation = (): NavigationProp<NavigationStackLists> => {
  return useNavigation<NavigationProp<NavigationStackLists>>();
};
