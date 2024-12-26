import reservationAPI from '@src/api/reservation.api';
import LoadingModal from '@src/components/LoadingModal/LoadingModal';
import useUserStore from '@src/store/userStore';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const PAYMENT_STAT = {
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    FAILED: "FAILED",
    CANCELLED: "CANCELLED"
};

const PAY_METHOD = {
    CASH: "CASH",
    BANK_TRANSFER: "BANK_TRANSFER"
};
const mockPayments = [
    {
      id: 1,
      amount: 150000,
      paymentDate: new Date(), // 20-12-2023 14:30
      paymentStatus: PAYMENT_STAT.COMPLETED,
      paymentMethod: PAY_METHOD.CASH,
    },
    {
      id: 2,
      amount: 50000,
      paymentDate: new Date(), // 21-12-2023 10:15
      paymentStatus: PAYMENT_STAT.PENDING,
      paymentMethod: PAY_METHOD.BANK_TRANSFER,
    },
    {
      id: 3,
      amount: 200000,
      paymentDate: new Date(), // 18-12-2023 09:00
      paymentStatus: PAYMENT_STAT.FAILED,
      paymentMethod: PAY_METHOD.CASH,
    },
    {
      id: 4,
      amount: 120000,
      paymentDate: new Date(), // 19-12-2023 18:45
      paymentStatus: PAYMENT_STAT.CANCELLED,
      paymentMethod: PAY_METHOD.BANK_TRANSFER,
    },
  ];
  

  const formatDateTime = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy HH:mm');
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
    }).format(price);
};

const getStatusColor = (status) => {
    switch (status) {
        case PAYMENT_STAT.PENDING: return '#FFA500';
        case PAYMENT_STAT.COMPLETED: return '#4CAF50';
        case PAYMENT_STAT.FAILED: return '#F44336';
        case PAYMENT_STAT.CANCELLED: return '#757575';
        default: return '#757575';
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case PAYMENT_STAT.PENDING: return 'clock-outline';
        case PAYMENT_STAT.COMPLETED: return 'check-circle-outline';
        case PAYMENT_STAT.FAILED: return 'alert-circle-outline';
        case PAYMENT_STAT.CANCELLED: return 'close-circle-outline';
        default: return 'help-circle-outline';
    }
};

const getPaymentMethodIcon = (method) => {
    switch (method) {
        case PAY_METHOD.CASH: return 'cash';
        case PAY_METHOD.BANK_TRANSFER: return 'bank-transfer';
        default: return 'help-circle-outline';
    }
};

const getPaymentMethodLabel = (method) => {
    switch (method) {
        case PAY_METHOD.CASH: return 'Tiền mặt';
        case PAY_METHOD.BANK_TRANSFER: return 'Chuyển khoản';
        default: return method;
    }
};
const getStatusText = (status) => {
    switch (status) {
        case PAYMENT_STAT.PENDING: return 'Đang chờ xử lý';
        case PAYMENT_STAT.COMPLETED: return 'Đã thanh toán';
        case PAYMENT_STAT.FAILED: return 'Thất bại';
        case PAYMENT_STAT.CANCELLED: return 'Đã hủy';
        default: return 'Trạng thái không xác định';
    }
};
const PaymentHistoryScreen = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = useUserStore((state) => state.user);
    const fetchPayments = async () => {
        setLoading(true);
        try {
            const reservations = await reservationAPI.getReservationsByUserId(user.id);
            const payments = reservations.filter(t => t.payment != null).map(t => t.payment);
            setPayments(payments);
        } catch (error) {
            console.error("Failed to fetch payments", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchPayments();
    }, []);

    const renderPaymentCard = (payment) => (
        <PaymentItem key={payment.id} payment={payment}></PaymentItem>
    );

    return (
        <ScrollView style={styles.container}>
            <LoadingModal visible={loading} onClose={()=>{}}></LoadingModal>
            <View style={styles.header}>
                <Text style={styles.title}>Lịch sử thanh toán</Text>
            </View>
            <View style={styles.content}>
                {payments.map(renderPaymentCard)}
            </View>
        </ScrollView>
    );
};


export const PaymentItem = ({payment}) => (
    <Card key={payment.id} style={styles.card}>
        <Card.Content>
            <View style={styles.headerRow}>
                <View style={styles.row}>
                    <Icon 
                        name={getPaymentMethodIcon(payment.paymentMethod)} 
                        size={24} 
                        color="#091E3D" 
                    />
                    <Text style={styles.methodText}>
                        {getPaymentMethodLabel(payment.paymentMethod)}
                    </Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(payment.paymentStatus) }]}>
                    <Icon name={getStatusIcon(payment.paymentStatus)} size={16} color="white" />
                    <Text style={styles.statusText}>{getStatusText(payment.paymentStatus)}</Text>
                </View>
            </View>

            <Divider style={styles.divider} />

            <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Mã giao dịch:</Text>
                    <Text style={styles.value}>#{payment.id}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Số tiền:</Text>
                    <Text style={styles.amount}>{formatPrice(payment.amount)}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Thời gian:</Text>
                    <Text style={styles.value}>{formatDateTime(payment.paymentDate)}</Text>
                </View>

                {payment.reservationId && (
                    <View style={styles.detailRow}>
                        <Text style={styles.label}>Mã đặt chỗ:</Text>
                        <Text style={styles.value}>#{payment.reservationId}</Text>
                    </View>
                )}
            </View>
        </Card.Content>
    </Card>
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        padding: 16,
        backgroundColor: '#091E3D',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    content: {
        padding: 16,
    },
    card: {
        marginBottom: 12,
        borderRadius: 8,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    methodText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '500',
        color: '#091E3D',
    },
    divider: {
        marginVertical: 12,
    },
    detailsContainer: {
        gap: 8,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        color: '#666',
        fontSize: 14,
    },
    value: {
        color: '#091E3D',
        fontSize: 14,
    },
    amount: {
        color: '#091E3D',
        fontSize: 16,
        fontWeight: 'bold',
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        borderRadius: 16,
    },
    statusText: {
        color: 'white',
        marginLeft: 4,
        fontSize: 12,
    },
});

export default PaymentHistoryScreen;