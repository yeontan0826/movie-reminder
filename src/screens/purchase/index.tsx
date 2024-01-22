import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import Purchases, { PurchasesPackage } from 'react-native-purchases';
import styled from 'styled-components/native';
import Colors from 'open-color';

import Screen from '../../components/screen';

const PurchaseScreen = (): JSX.Element => {
  const [proudcts, setProducts] = useState<PurchasesPackage[]>([]);

  useEffect(() => {
    (async () => {
      const offerings = await Purchases.getOfferings();

      if (
        offerings.current !== null &&
        offerings.current?.availablePackages.length !== 0
      ) {
        setProducts(offerings.current.availablePackages);
      }
    })();
  }, []);

  return (
    <Screen>
      <Container>
        <Header>
          <Title>프리미엄 이용권</Title>
          <Subtitle>
            {'무제한 개봉일 알림 추가와 광고 없이 앱을\n사용할 수 있습니다!'}
          </Subtitle>
        </Header>
        <Products>
          {proudcts.map(p => {
            const periodText =
              p.packageType === 'MONTHLY'
                ? '월'
                : p.packageType === 'WEEKLY'
                ? '주'
                : p.packageType;

            return (
              <Product
                key={p.identifier}
                onPress={async () => {
                  try {
                    const result = await Purchases.purchasePackage(p);
                    console.log(result);
                    Alert.alert('구매 성공');
                  } catch (error: any) {
                    if (!error.userCancelled) {
                      Alert.alert('구매 실패', error.message);
                    }
                  }
                }}>
                <Price>{`${p.product.priceString}/${periodText}`}</Price>
              </Product>
            );
          })}
        </Products>
      </Container>
    </Screen>
  );
};

export default PurchaseScreen;

const Container = styled.View`
  flex: 1;
`;

const Header = styled.View`
  justify-content: center;
  align-items: center;
  padding: 80px 40px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${Colors.white};
`;

const Subtitle = styled.Text`
  margin-top: 30px;
  line-height: 26px;
  text-align: center;
  font-size: 16px;
  color: ${Colors.white};
`;

const Products = styled.View`
  justify-content: center;
  align-items: center;
  padding-left: 80px;
  padding-right: 80px;
`;

const Product = styled.TouchableOpacity`
  width: 100%;
  align-items: center;
  margin: 12px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-radius: 12px;
  background-color: ${Colors.white};
`;

const Price = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.black};
`;
