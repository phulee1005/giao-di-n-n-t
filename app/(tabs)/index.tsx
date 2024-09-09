import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet, Dimensions, Image, TextInput, KeyboardAvoidingView, Platform, ScrollView, StatusBar } from 'react-native';

// Lấy chiều rộng và chiều cao của màn hình
const { width, height } = Dimensions.get('window');

const App = () => {
    const [isPortrait, setIsPortrait] = useState(height > width); // Xác định chế độ dọc hay ngang
    const [inputValue, setInputValue] = useState(''); // Trạng thái lưu giá trị nhập liệu

    // Hàm kiểm tra hướng màn hình
    const handleOrientationChange = ({ window }) => {
        setIsPortrait(window.height > window.width); // Cập nhật trạng thái hướng màn hình
    };

    // Thêm listener để phát hiện sự thay đổi hướng màn hình
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', handleOrientationChange);

        // Xóa listener khi component unmount
        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, []);

    return (
        <>
            {/* Tùy chỉnh thanh trạng thái */}
            <StatusBar
                barStyle={Platform.select({
                    ios: isPortrait ? 'dark-content' : 'light-content', // iOS: dark content khi portrait, light content khi landscape
                    android: isPortrait ? 'light-content' : 'dark-content', // Android: ngược lại so với iOS
                })}
                backgroundColor={Platform.select({
                    ios: isPortrait ? '#f8f8f8' : '#000', // iOS: nền sáng khi portrait, tối khi landscape
                    android: isPortrait ? '#000' : '#f8f8f8', // Android: nền tối khi portrait, sáng khi landscape
                })}
            />

            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Điều chỉnh theo hệ điều hành
                keyboardVerticalOffset={100} // Offset để tránh che các thành phần
            >
                <ScrollView contentContainerStyle={styles.scrollView}>
                    {/* Hình ảnh với chiều rộng bằng 80% chiều rộng màn hình và điều chỉnh chiều cao phù hợp */}
                    <Image
                        source={{ uri: 'https://example.com/your-image-url.jpg' }}
                        style={[
                            styles.image,
                            isPortrait ? styles.imagePortrait : styles.imageLandscape // Điều chỉnh chiều cao theo hướng màn hình
                        ]}
                        resizeMode="contain"
                    />

                    {/* Trường nhập liệu */}
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập vào gì đó kk"
                        value={inputValue}
                        onChangeText={setInputValue}
                    />

                    <View
                        style={[
                            styles.buttonWrapper,
                            isPortrait ? styles.portrait : styles.landscape, // Thay đổi bố cục dựa trên hướng màn hình
                        ]}
                    >
                        <View style={styles.buttonContainer}>
                            <Button title="Button 1" onPress={() => alert('Button 1 Pressed')} />
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title="Button 2" onPress={() => alert('Button 2 Pressed')} />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: Platform.select({
            ios: 20, // Padding cho iOS
            android: 10, // Padding cho Android
        }),
        alignItems: 'center',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width * 0.8, // Chiều rộng bằng 80% chiều rộng màn hình
        marginBottom: 20, // Khoảng cách giữa ảnh và các nút bấm
    },
    imagePortrait: {
        height: (width * 0.8) * 0.6, // Chiều cao theo tỷ lệ 0.6 trong chế độ dọc
    },
    imageLandscape: {
        height: (width * 0.5) * 0.4, // Giảm chiều cao hình ảnh trong chế độ ngang
    },
    input: {
        width: width * 0.8, // Chiều rộng bằng 80% chiều rộng màn hình
        padding: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20, // Khoảng cách giữa trường nhập liệu và các nút
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        margin: 10,
        paddingHorizontal: Platform.select({
            ios: 20, // Tăng padding ngang cho iOS
            android: 10, // Giữ nguyên padding cho Android
        }),
    },
    portrait: {
        flexDirection: 'column', // Chế độ dọc: Nút xếp theo chiều dọc
    },
    landscape: {
        flexDirection: 'row', // Chế độ ngang: Nút nằm cạnh nhau theo chiều ngang
        justifyContent: 'space-between', // Khoảng cách đều giữa các nút
    },
});

export default App;
