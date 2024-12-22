import useUserStore from '@src/store/userStore';
import { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Card } from 'react-native-paper';
const Stats = () => {
  const user = useUserStore(store => store.user);
  // Sample data - you would replace this with actual data from your backend
  const [revenueData, setRevenueData] = useState([
    {date: '2024-01-01', amount: 1200},
    {date: '2024-01-02', amount: 1500},
    {date: '2024-01-03', amount: 1800},
    {date: '2024-01-04', amount: 1400},
    {date: '2024-01-05', amount: 2000},
    {date: '2024-01-06', amount: 1700},
    {date: '2024-01-07', amount: 1900},
  ]);

  const renderRevenueItem = ({item}) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.date}</Text>
      <Text style={styles.tableCell}>{item.amount.toLocaleString()} VND</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Xin chào, {user.name}</Text>
      <Card style={styles.card} mode="elevated" elevation={4}>
        {/* <Card.Title title="Xin chào"></Card.Title> */}
        <Card.Content>
          <Text style={styles.title}>Doanh Thu Hằng Ngày Của Bạn</Text>

          <View style={styles.chartContainer}>
            <LineChart
              data={{
                labels: revenueData.map(item => item.date.split('-')[2]), // Chỉ lấy ngày
                datasets: [
                  {
                    data: revenueData.map(item => item.amount),
                  },
                ],
              }}
              width={Dimensions.get('window').width - 40} // Điều chỉnh chiều rộng
              height={220}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 0, // Không hiển thị số thập phân
                color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Màu xanh iOS
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: '6',
                  strokeWidth: '2',
                  stroke: '#ffa726',
                },
              }}
              bezier // Đường cong mượt mà
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>

          <View style={styles.tableContainer}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableHeaderCell}>Ngày</Text>
              <Text style={styles.tableHeaderCell}>Số Tiền</Text>
            </View>
            <FlatList
              data={revenueData}
              renderItem={renderRevenueItem}
              keyExtractor={item => item.date}
              style={styles.flatList}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  card: {
    margin: 16,
    borderRadius: 10,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 16,
    paddingTop: 8,
    color: '#091E3D',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#666',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    color: '#333',
  },
  flatList: {
    maxHeight: 200,
  },
});

export default Stats;
