import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    Image,
    TextInput,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { Link, useNavigation } from "@react-navigation/native";
  
  const BookCard = ({ item, onPress }) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.authorName}>by {item.author}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          <View style={styles.stockBadge}>
            <Text style={styles.stockText}>{item.stock_quantity} in stock</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
  
  const BookList = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [keyword, setKeyword] = useState("");
  
    useEffect(() => {
      fetchBooks();
    }, []);
  
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://172.18.4.53:4444/book/all");
        setData(response.data.data);
        setError(null);
      } catch (error) {
        setError("Failed to fetch books");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    const searchByTitle = async (searchTerm) => {
      if (!searchTerm.trim()) {
        return fetchBooks();
      }
  
      setLoading(true);
      try {
        const response = await axios.get(`http://172.18.4.53:4444/book/title`, {
          params: {
            title: searchTerm,
          },
        });
        if (response.data.data) {
          setData(response.data.data);
          setError(null);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setData([]);
          setError("No books found matching your search");
        } else {
          setError("Failed to search books");
        }
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        searchByTitle(keyword);
      }, 500);
  
      return () => clearTimeout(timeoutId);
    }, [keyword]);
  
    const getDetails = (item) => {
      navigation.navigate("bookDetails", item);
    };
  
    if (loading) {
      return (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      );
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Book Store</Text>
          <Link
            onPress={() => navigation.navigate("myOrders")}
            style={{ marginTop: 10 }}
          >
            My Orders
          </Link>
        </View>
  
        <TextInput
          placeholder="Search by Title"
          value={keyword}
          onChangeText={setKeyword}
          style={styles.searchInput}
        />
  
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
  
        <FlatList
          data={data}
          keyExtractor={(item) => item.book_id.toString()}
          renderItem={({ item }) => (
            <BookCard item={item} onPress={() => getDetails(item)} />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            !loading && !error ? (
              <Text style={styles.noResultsText}>No books found</Text>
            ) : null
          }
        />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    
    searchInput: {
      backgroundColor: "white",
      padding: 10,
      marginTop: 10,
      marginHorizontal: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    noResultsText: {
      textAlign: "center",
      color: "#666",
      fontSize: 16,
      marginTop: 20,
    },
    errorText: {
      color: "#dc2626",
      textAlign: "center",
      marginTop: 10,
      marginHorizontal: 16,
    },
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    centerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5f5f5",
      padding: 20,
    },
    header: {
      padding: 20,
      paddingBottom: 10,
      backgroundColor: "white",
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 4,
    },
    subtitle: {
      fontSize: 14,
      color: "#666",
    },
    listContainer: {
      padding: 16,
    },
    bookCard: {
      backgroundColor: "white",
      borderRadius: 12,
      marginBottom: 16,
      flexDirection: "row",
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    bookImageContainer: {
      width: 100,
      height: 140,
      backgroundColor: "#f0f0f0",
    },
    bookImage: {
      width: "100%",
      height: "100%",
      resizeMode: "cover",
    },
    bookInfo: {
      flex: 1,
      padding: 12,
      justifyContent: "space-between",
    },
    bookTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#333",
      marginBottom: 4,
    },
    authorName: {
      fontSize: 14,
      color: "#666",
      marginBottom: 8,
    },
    priceContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    price: {
      fontSize: 10,
      fontWeight: "600",
      color: "red",
    },
    stockBadge: {
      backgroundColor: "#e5e7eb",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },
    stockText: {
      fontSize: 12,
      color: "#4b5563",
    },
    errorText: {
      fontSize: 16,
      color: "#dc2626",
      marginBottom: 16,
    },
    retryButton: {
      backgroundColor: "#007AFF",
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    retryButtonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "600",
    },
  });
  
  export default BookList;
  