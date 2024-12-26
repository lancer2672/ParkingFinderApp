import reviewAPI from '@src/api/review.api';
import LoadingModal from '@src/components/LoadingModal/LoadingModal';
import { goBack } from '@src/navigation/NavigationController';
import useParkingLotStore from '@src/store/useParkinglotStore';
import { generalColor } from '@src/theme/color';
import { row, rowCenter } from '@src/theme/style';
import textStyle from '@src/theme/text';
import { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FilterButton from './components/FilterButton';
import ListReview from './components/ListReview';
import SortModal, { ESort } from './components/SortModal';
import StarModal from './components/StarModal';
const Review = () => {
  const hotel = {
    name: 'Hilton',
    avatar: 'https://picsum.photos/200',
  };
  const parkingLot = useParkingLotStore(state => state.parkingLot);
  const [sortModalVisible, setSortModalVisible] = useState(false);
  const [startModalVisible, setStarModalVisible] = useState(false);
  const [sltStarIdx, setSltStarIdx] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [sltxSort, setSltSort] = useState();
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await reviewAPI.getByParkingLotId(parkingLot.id);

      console.log('response', response);
      setReviews(response);
      setFilteredReviews(response); // Initialize filteredReviews with all reviews
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (v) =>{
    setSltSort(v);
    console.log('sort', v);
     switch (v) {
        case ESort.MOST_VOTE:
          // const sorted = [...filteredReviews].sort((a, b) => b.rating - a.rating);
          // setFilteredReviews(sorted);
          break;
        case ESort.NEWEST:
          console.log("1")
          const sorted2 = [...filteredReviews].sort((a, b) =>{
            return new Date(b.created) - new Date(a.created)
          } );
          setFilteredReviews(sorted2);
          break;
        case ESort.OLDEST:
          console.log("2")
          const sorted3 = [...filteredReviews].sort((a, b) => new Date(a.created) - new Date(b.created));
          setFilteredReviews(sorted3);
          break;
        default:
          break;
     }
  }
  const handleFilterStar = (star,idx) => {
    setSltStarIdx(idx);

    console.log('star', star);
    // Filter reviews based on the selected star rating
    const filtered = reviews.filter(review => review.rating == star);
    setFilteredReviews(filtered);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Calculate the average rating
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 12}}>
      <LoadingModal visible={loading} onClose={() => {}}></LoadingModal>
      <View style={{padding: 12, marginTop: 12, ...rowCenter}}>
        <Pressable onPress={goBack}>
          <AntDesign
            name="left"
            size={24}
            color={generalColor.other.gray}></AntDesign>
        </Pressable>
        <Text style={styles.title}>Đánh giá</Text>
      </View>
      <View style={rowCenter}>
        <Image
          source={{ uri: parkingLot.imageUrls   || 'https://picsum.photos/200' }}

          style={{width: 80, height: 80, margin: 12, borderRadius: 12}}></Image>

        <View
          style={{
            ...row,
            padding: 12,
            paddingLeft: 4,
            paddingRight: 4,
            alignItems: 'flex-end',
          }}>
          <View>
            <Text style={styles.txt}>{parkingLot.name}</Text>
            <View style={rowCenter}>
              <Text style={styles.rating}>{calculateAverageRating().toFixed(1)}</Text>
              <Text>{reviews.length} lượt đánh giá</Text>
            </View>
          </View>
        </View>
      </View>

      <View
        style={{
          ...rowCenter,
          padding: 8,
          justifyContent: 'flex-end',
        }}>
        <FilterButton
          onPress={() => {
            setStarModalVisible(true);
          }}
          title={() => {
            return (
              <View style={rowCenter}>
                <Text style={styles.filter}>Sao</Text>
                <AntDesign
                  style={{marginRight: 4}}
                  name="star"
                  color={generalColor.other.star}
                  size={18}></AntDesign>
                <AntDesign
                  name="down"
                  size={18}
                  color={generalColor.other.gray}></AntDesign>
              </View>
            );
          }}
          subtitle={() => {
            return <Text>Tất cả</Text>;
          }}></FilterButton>
        <FilterButton
          onPress={() => {
            setSortModalVisible(true);
          }}
          style={{marginLeft: 12}}
          title={() => {
            return (
              <View style={rowCenter}>
                <Text style={styles.filter}>Sắp xếp</Text>
                <AntDesign
                  name="down"
                  size={18}
                  color={generalColor.other.gray}></AntDesign>
              </View>
            );
          }}
          subtitle={() => {
            return <Text>Tất cả</Text>;
          }}></FilterButton>
      </View>

      <View style={{flex: 1, paddingHorizontal: 8}}>
        <ListReview reviews={filteredReviews}></ListReview>
      </View>
      <SortModal
        sltxSort={sltxSort}
        onPress={handleSort}
        isVisible={sortModalVisible}
        onClose={() => {
          setSortModalVisible(false);
        }}></SortModal>
      <StarModal
        isSelectedIdx={sltStarIdx}
        onPress={handleFilterStar}
        isVisible={startModalVisible}
        onClose={() => {
          setStarModalVisible(false);
        }}></StarModal>
      {/* <CreateReviewModal
        isVisible={true}
        onClose={() => {}}></CreateReviewModal> */}
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    color: generalColor.primary,
    ...textStyle.h[2],
    flex: 1,
    textAlign: 'center',
    marginRight: 24,
    fontFamily: 'serif',
  },
  filter: {color: generalColor.primary, fontSize: 16, marginRight: 4},
  rating: {
    color: generalColor.primary,
    ...textStyle.h[4],
    marginRight: 8,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  txt: {
    color: generalColor.primary,
    ...textStyle.h[3],
    marginRight: 8,
    textAlign: 'left',
    fontFamily: 'serif',
  },
});
