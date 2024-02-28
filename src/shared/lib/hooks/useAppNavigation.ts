import { useNavigation, type NavigationProp } from '@react-navigation/native';
import { NavigationStackLists } from 'app/navigation';

export const useAppNavigation = (): NavigationProp<NavigationStackLists> => {
  return useNavigation<NavigationProp<NavigationStackLists>>();
};
