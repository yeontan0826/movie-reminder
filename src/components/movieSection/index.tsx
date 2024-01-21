import styled from 'styled-components/native';
import Colors from 'open-color';

interface MovieSectionProps {
  title: string;
  children?: React.ReactNode;
}
const MovieSection = ({ title, children }: MovieSectionProps): JSX.Element => {
  return (
    <Section>
      <SectionTitle>{title}</SectionTitle>
      {children}
    </Section>
  );
};

export default MovieSection;

const Section = styled.View`
  align-items: flex-start;
  margin-bottom: 24px;
`;

const SectionTitle = styled.Text`
  margin-top: 24px;
  margin-bottom: 10px;
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.white};
`;
