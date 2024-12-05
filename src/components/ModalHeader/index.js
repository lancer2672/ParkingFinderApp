import { goBack } from '@src/navigation/NavigationController';
import { generalColor } from '@src/theme/color';
import { TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styled from 'styled-components/native';

const Header = ({title, onBack}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 2,
        borderBottomColor: generalColor.primary,
      }}>
      <TouchableOpacity
        onPress={onBack || goBack}
        style={{
          paddingHorizontal: 8,
          paddingVertical: 4,
        }}>
        <AntDesign name="arrowleft" size={24} color={generalColor.primary} />
      </TouchableOpacity>
      <Heading style={{color: generalColor.primary}}>{title}</Heading>
    </View>
  );
};

const Heading = styled.Text`
  font-weight: bold;
  font-size: 24px;
  color: black;
`;

export default Header;
