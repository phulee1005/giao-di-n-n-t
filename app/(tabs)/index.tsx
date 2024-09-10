
import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Dimensions, Image, TextInput, KeyboardAvoidingView, Platform, StatusBar, ImageBackground } from 'react-native';

const DynamicLayoutWithStatusBar: React.FC = () => {
    const [isPortrait, setIsPortrait] = useState(true);
    const [inputValue, setInputValue] = useState(''); // Trạng thái để lưu nội dung nhập vào

    const isPortraitMode = () => {
        const dim = Dimensions.get('window');
        return dim.height >= dim.width;
    };

    const handleOrientationChange = () => {
        setIsPortrait(isPortraitMode());
    };

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', handleOrientationChange);
        handleOrientationChange();

        return () => {
            subscription.remove();
        };
    }, []);

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const imageWidth = screenWidth * 0.8;
    const imageHeight = isPortrait ? imageWidth / (4 / 3) : screenHeight * 0.4;

    // Tùy chỉnh màu nền và kiểu chữ của thanh trạng thái
    const statusBarStyle = isPortrait
        ? { backgroundColor: '#6200ee', barStyle: 'light-content' }  // Chế độ dọc: Nền tím, chữ sáng
        : { backgroundColor: '#ffffff', barStyle: 'dark-content' };  // Chế độ ngang: Nền trắng, chữ tối

    const handleButton1Press = () => {
        alert(`chào mấy ní nha ${inputValue}`); // Hiển thị nội dung khi bấm nút 1
    };

   

    const handleButton2Press = () => {
        alert(`Chào${inputValue} em ,a đứng đây từ chiều`); // Hiển thị nội dung khi bấm nút 2
    };
;

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/736x/7e/ee/bd/7eeebd9cff4c8dc78b7601e2c069a4c3.jpg' }}
            style={styles.background}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={80}
            >
                <StatusBar
                    backgroundColor={statusBarStyle.backgroundColor}
                    barStyle={statusBarStyle.barStyle as 'default' | 'light-content' | 'dark-content'}
                />

                <Image
                    source={{ uri: 'https://i.pinimg.com/564x/c0/79/b1/c079b14f42046c1c6d3abbc703fb1ffb.jpg' }}
                    style={{ width: imageWidth, height: imageHeight }}
                    resizeMode="contain"
                />

                <TextInput
                    style={[styles.input, { width: imageWidth }]} // Đặt chiều rộng bằng với hình ảnh
                    placeholder="Nhập nội dung gì đi ní kk..."
                    placeholderTextColor="#000000" // Màu chữ của placeholder
                    textAlign="center" // Căn giữa chữ trong ô textbox
                    value={inputValue} // Gán giá trị cho ô input
                    onChangeText={setInputValue} // Cập nhật trạng thái khi nhập
                />

                <View
                    style={[
                        styles.buttonContainer,
                        {
                            flexDirection: isPortrait ? 'column' : 'row',
                            alignItems: isPortrait ? 'center' : 'flex-start',
                        }
                    ]}
                >
                    <View
                        style={[
                            styles.buttonWrapper,
                            {
                                width: isPortrait ? screenWidth / 2 : screenWidth * 0.3,
                                marginHorizontal: isPortrait ? 0 : 10,
                            }
                        ]}
                    >
                        <Button
                            title="Button 1"
                            onPress={handleButton1Press} // Sử dụng hàm xử lý nút 1
                            color="#000000" // Màu chữ nút
                        />
                    </View>
                    <View
                        style={[
                            styles.buttonWrapper,
                            {
                                width: isPortrait ? screenWidth / 2 : screenWidth * 0.3,
                                marginHorizontal: isPortrait ? 0 : 10,
                            }
                        ]}
                    >
                        <Button
                            title="Button 2"
                            onPress={handleButton2Press} // Sử dụng hàm xử lý nút 2
                            color="#000000" // Màu chữ nút
                        />
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,  // Để chiếm toàn bộ không gian
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonWrapper: {
        marginVertical: 10,
        ...Platform.select({
            ios: {
                padding: 20, // Padding lớn hơn cho iOS
            },
            android: {
                padding: 10, // Padding nhỏ hơn cho Android
            },
        }),
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',  // Màu khung textbox là màu đen
        padding: Platform.select({
            ios: 15, // Đệm lớn hơn cho iOS
            android: 10, // Đệm nhỏ hơn cho Android
        }),
        marginVertical: 20,
        borderRadius: 5,
    },
});

export default DynamicLayoutWithStatusBar;